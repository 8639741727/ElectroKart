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
 */

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
