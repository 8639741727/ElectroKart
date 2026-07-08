import { getProductById, getRelatedProducts, discountedPrice } from "../data/products.js";
import { productThumbHTML } from "./thumb.js";
import { productCardHTML, mountProductCards, refreshBadge, refreshWishlistBadge } from "./productCard.js";
import { addToCart, updateQty, removeFromCart, getCart } from "./cart.js";
import { isWishlisted, toggleWishlist } from "./wishlist.js";
import { sendPageView, sendProductView } from "./target.js";

const MAX_QTY = 10;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = getProductById(id);
const root = document.getElementById("pdpRoot");

if (!product) {
  root.innerHTML = `
    <p>We couldn't find that product.</p>
    <a href="products.html" class="btn btn-outline">Back to all products</a>
  `;
} else {
  sendPageView("product-detail", { entityId: product.id });
  sendProductView(product);

  const finalPrice = discountedPrice(product);
  const discountBlock =
    product.discountPct > 0
      ? `<span class="price original-price">$${product.price.toFixed(2)}</span>
         <span class="pill pill-discount">-${product.discountPct}%</span>`
      : "";
  const specRows = Object.entries(product.specs)
    .map(([label, value]) => `<tr><td class="muted">${label}</td><td class="price">${value}</td></tr>`)
    .join("");
  const wishlisted = isWishlisted(product.id);

  root.setAttribute("data-entity-id", product.id);
  root.innerHTML = `
    <button class="link-btn back-link" id="backBtn">← Back</button>
    <div class="pdp-layout">
      <div class="pdp-media">
        ${productThumbHTML(product, 70)}
      </div>
      <div class="pdp-info">
        <div class="pdp-title-row">
          <div>
            <span class="eyebrow">${product.category.replace("-", " ")}</span>
            <h1>${product.name}</h1>
          </div>
          <button class="wishlist-toggle pdp-wishlist ${wishlisted ? "active" : ""}" id="pdpWishlistBtn" aria-label="${wishlisted ? "Remove from wishlist" : "Add to wishlist"}">${wishlisted ? "♥" : "♡"}</button>
        </div>
        <div class="product-card-rating">★ ${product.rating} <span class="muted">(${product.reviews} reviews)</span></div>
        <p class="pdp-blurb">${product.blurb}</p>
        <div class="product-card-price-row pdp-price-row">
          <span class="price-lg">$${finalPrice.toFixed(2)}</span>
          ${discountBlock}
        </div>

        <div class="pdp-cart-control" id="pdpCartControl"></div>

        <table class="spec-table"><tbody>${specRows}</tbody></table>
      </div>
    </div>

    <section class="recs-section" data-target-zone="pdp-recs-similar">
      <div class="container" style="padding:0;">
        <div class="recs-header">
          <span class="eyebrow">Recommended</span>
          <h2>You may also like</h2>
        </div>
        <div class="grid grid-4" id="relatedGrid"></div>
      </div>
    </section>
  `;

  document.getElementById("backBtn").addEventListener("click", () => history.back());

  document.getElementById("pdpWishlistBtn").addEventListener("click", () => {
    const btn = document.getElementById("pdpWishlistBtn");
    const nowActive = toggleWishlist(product.id);
    btn.classList.toggle("active", nowActive);
    btn.textContent = nowActive ? "♥" : "♡";
    btn.setAttribute("aria-label", nowActive ? "Remove from wishlist" : "Add to wishlist");
    refreshWishlistBadge();
  });

  function renderPdpCartControl() {
    const cartItem = getCart().find((i) => i.id === product.id);
    const control = document.getElementById("pdpCartControl");

    if (cartItem) {
      const options = Array.from({ length: MAX_QTY }, (_, i) => i + 1)
        .map((n) => `<option value="${n}" ${n === cartItem.qty ? "selected" : ""}>${n}</option>`)
        .join("");
      control.innerHTML = `
        <div class="qty-stepper pdp-stepper">
          <label class="muted">Quantity</label>
          <select id="pdpQtySelect">${options}</select>
          <button class="link-btn" id="pdpRemoveBtn">Remove from cart</button>
        </div>
        <a href="cart.html" class="btn btn-primary" style="margin-top:14px;">Go to cart</a>
      `;
      document.getElementById("pdpQtySelect").addEventListener("change", (e) => {
        updateQty(product.id, Number(e.target.value));
        refreshBadge();
        renderPdpCartControl();
      });
      document.getElementById("pdpRemoveBtn").addEventListener("click", () => {
        removeFromCart(product.id);
        refreshBadge();
        renderPdpCartControl();
      });
    } else {
      control.innerHTML = `<button class="btn btn-primary" id="pdpAddBtn">Add to Cart</button>`;
      document.getElementById("pdpAddBtn").addEventListener("click", () => {
        addToCart(product, 1);
        refreshBadge();
        renderPdpCartControl();
      });
    }
  }
  renderPdpCartControl();

  const related = getRelatedProducts(product, 4);
  const relatedGrid = document.getElementById("relatedGrid");
  relatedGrid.innerHTML = related.map(productCardHTML).join("");
  mountProductCards(relatedGrid);
}
