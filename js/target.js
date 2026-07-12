/**
 * targetHelpers.js
 * ------------------------------------------------------------------
 * This file is the "wiring closet" for Adobe Target / Adobe Experience
 * Platform Web SDK (Alloy). The site works fine without Alloy installed —
 * every function below checks whether `window.alloy` exists first, and
 * just logs to the console if it doesn't. That means you can plug this
 * into a real Adobe Launch property later without changing any page code.
 *
 * WHERE TO ADD YOUR ADOBE LAUNCH SCRIPT:
 * See the comment block in index.html — that's where the embed code goes.
 *
 * WHAT EACH FUNCTION IS FOR (plain language):
 * - sendPageView       -> tells Target "a page was viewed", so it can
 *                         decide whether to run an activity on it.
 * - sendProductView     -> tells Target which specific product page
 *                         someone is looking at (used for Recommendations
 *                         "entity.id" criteria — same idea as your
 *                         Apex Bank loan-sorting mbox, just for products).
 * - sendCartUpdate      -> keeps a running record of what's in the cart.
 * - getProfileParams    -> returns profile.MyCart / profile.cartValue,
 *                         the same two profile parameters you were
 *                         troubleshooting for persistence issues.
 * ------------------------------------------------------------------
 *
 * PATCH NOTE (added): pushToDataLayer used to rebuild `user`/`page`/etc.
 * from scratch on every call, using only that call's own overrides.
 * Since sendProductView/sendCartUpdate/sendPurchase never pass a `user`
 * override, any push from those functions silently reset user.loginId
 * back to null. Because EmailID Capture in Tags always read
 * MyDataLayer[0], whether login data survived depended on which
 * function happened to push first — not on timing.
 *
 * Fix: keep one persistent, cumulative object (window.MyDataLayerState)
 * that every push merges ONTO, instead of rebuilding from defaults each
 * time. window.MyDataLayer (the array) is still pushed to, unchanged,
 * for anything else on the site that reads it as a history/array.
 * ------------------------------------------------------------------
 */
import { getCurrentUser } from "./auth.js";
import { getOrCreateVisitorId, recordVisit } from "./visitors.js";

const hasAlloy = () => typeof window !== "undefined" && typeof window.alloy === "function";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("ek_cart") || "[]");
  } catch {
    return [];
  }
}

/** profile.MyCart / profile.cartValue — the two profile params from your
 *  earlier troubleshooting work. Kept here so any page can pull the
 *  current values without re-reading localStorage everywhere. */
export function getProfileParams() {
  const cart = readCart();
  const cartValue = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return {
    ecid: getOrCreateVisitorId(),
    MyCart: cart.map((item) => item.id).join(","),
    cartValue: +cartValue.toFixed(2),
  };
}

export function sendPageView(pageName, extra = {}) {
  const payload = { pageName, ...getProfileParams(), ...extra };
  recordVisit(pageName, extra);

  const currentUser = getCurrentUser(); // { name, email } or null

  pushToDataLayer({
    page: { pageName, pageType: extra.pageType || null },
    user: {
      isLoggedIn: extra.isLoggedIn ?? (currentUser ? true : false),
      loginId: currentUser ? currentUser.email : null,
      lastViewedCategory: extra.category || null,
    },
  });

  if (hasAlloy()) {
    window.alloy("sendEvent", {
      type: "web.webpagedetails.pageViews",
      data: { web: { webPageDetails: { name: pageName } }, _ferrite: payload },
    });
  } else {
    console.log("[target] page view (Alloy not loaded):", payload);
  }
}

export function sendProductView(product) {
  const payload = { entityId: product.id, category: product.category, ...getProfileParams() };

  pushToDataLayer({
    product: {
      id: product.id,
      name: product.name,
      category: product.category,
      subCategory: product.subCategory || null,
      basePrice: product.price,
      thumbnailUrl: product.thumbnailUrl || null,
      relativeUrl: product.relativeUrl || null,
    },
    category: { id: product.category, name: product.categoryName || null },
  });

  if (hasAlloy()) {
    window.alloy("sendEvent", {
      type: "commerce.productViews",
      data: {
        commerce: { productViews: { value: 1 } },
        productListItems: [{ SKU: product.id, name: product.name, priceTotal: product.price }],
        _ferrite: payload,
      },
    });
  } else {
    console.log("[target] product view (Alloy not loaded):", payload);
  }
}

export function sendCartUpdate(cart) {
  const cartValue = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const payload = { MyCart: cart.map((i) => i.id).join(","), cartValue: +cartValue.toFixed(2) };

  pushToDataLayer({
    cart: { value: +cartValue.toFixed(2), itemCount: cart.reduce((n, i) => n + i.qty, 0) },
  });

  if (hasAlloy()) {
    window.alloy("sendEvent", {
      type: "commerce.productListAdds",
      data: {
        productListItems: cart.map((i) => ({ SKU: i.id, name: i.name, quantity: i.qty, priceTotal: i.price * i.qty })),
        _ferrite: payload,
      },
    });
  } else {
    console.log("[target] cart update (Alloy not loaded):", payload);
  }
}

export function sendPurchase(cart, orderId) {
  const cartValue = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const payload = { orderId, orderTotal: +cartValue.toFixed(2) };

  pushToDataLayer({
    order: { id: orderId, total: +cartValue.toFixed(2) },
  });

  if (hasAlloy()) {
    window.alloy("sendEvent", {
      type: "commerce.purchases",
      data: {
        commerce: { purchases: { value: 1 }, order: { purchaseID: orderId, priceTotal: cartValue } },
        productListItems: cart.map((i) => ({ SKU: i.id, name: i.name, quantity: i.qty, priceTotal: i.price * i.qty })),
        _ferrite: payload,
      },
    });
  } else {
    console.log("[target] purchase (Alloy not loaded):", payload);
  }
}

// Handy in the browser console when you're testing: window.__ferriteProfile()
if (typeof window !== "undefined") {
  window.__ferriteProfile = getProfileParams;
}

/* ------------------------------------------------------------------
 * PATCHED: pushToDataLayer + the new persistent state object.
 * This whole block REPLACES the original pushToDataLayer function
 * (the one that declared `defaultData` and `finalData` inline and did
 * NOT persist state between calls). Everything else in the file above
 * this point is unchanged.
 * ------------------------------------------------------------------ */

// Single persistent object — created once, then merged onto by every
// pushToDataLayer call. This is what EmailID Capture (and any other
// data element) should read from going forward, instead of MyDataLayer[0].
window.MyDataLayerState = window.MyDataLayerState || {
  page: {
    pageName: null,
    pageType: null,
  },
  product: {
    id: null,
    name: null,
    category: null,
    subCategory: null,
    basePrice: null,
    thumbnailUrl: null,
    relativeUrl: null,
  },
  category: {
    id: null,
    name: null,
  },
  cart: {
    value: null,
    itemCount: null,
  },
  order: {
    id: null,
    total: null,
  },
  user: {
    isLoggedIn: null,
    loginId: null,
    lastViewedCategory: null,
  },
};

export function pushToDataLayer(overrides) {
  // Merge the incoming overrides ONTO the persistent state, section by
  // section — so a call that only mentions `cart` (e.g. sendCartUpdate)
  // can never wipe out `user`, `page`, etc. that were set by an earlier call.
  for (const section in window.MyDataLayerState) {
    window.MyDataLayerState[section] = Object.assign(
      {},
      window.MyDataLayerState[section],
      overrides[section] || {}
    );
  }

  // Keep MyDataLayer as an array/history for anything on the site that
  // already reads it that way — but every entry now carries the FULL
  // accumulated state, not just that call's partial overrides.
  window.MyDataLayer = window.MyDataLayer || [];
  window.MyDataLayer.push(window.MyDataLayerState);

  // Let Tags react to real data-readiness instead of guessing page-lifecycle
  // timing (DOM Ready, Library Loaded, etc.). Use this as the rule's trigger:
  // Core extension -> Custom Event -> "electrokart:dataLayerUpdated"
  window.dispatchEvent(
    new CustomEvent("electrokart:dataLayerUpdated", {
      detail: window.MyDataLayerState,
    })
  );
}
