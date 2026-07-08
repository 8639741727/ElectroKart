import { discountedPrice, getProductById } from "../data/products.js";
import { productThumbHTML } from "./thumb.js";
import { addToCart, updateQty, removeFromCart, getCart, cartItemCount } from "./cart.js";
import { isWishlisted, toggleWishlist, wishlistCount } from "./wishlist.js";

const MAX_QTY = 10;

export function productCardHTML(product) {
  const finalPrice = discountedPrice(product);
  const discountBlock =
    product.discountPct > 0
      ? `<span class="price original-price">$${product.price.toFixed(2)}</span>
         <span class="pill pill-discount">-${product.discountPct}%</span>`
      : "";
  const wishlisted = isWishlisted(product.id);

  return `
    <div class="product-card card" data-entity-id="${product.id}">
      <div class="product-thumb-wrap">
        <a href="product.html?id=${product.id}" class="product-card-link">
          ${productThumbHTML(product)}
        </a>
        <button
          class="wishlist-toggle ${wishlisted ? "active" : ""}"
          data-product-id="${product.id}"
          aria-label="${wishlisted ? "Remove from wishlist" : "Add to wishlist"}"
        >${wishlisted ? "♥" : "♡"}</button>
      </div>
      <a href="product.html?id=${product.id}" class="product-card-link">
        <div class="product-card-body">
          <span class="eyebrow">${product.category.replace("-", " ")}</span>
          <h3 class="product-card-title">${product.name}</h3>
          <div class="product-card-rating">★ ${product.rating} <span class="muted">(${product.reviews})</span></div>
          <div class="product-card-price-row">
            <span class="price-lg">$${finalPrice.toFixed(2)}</span>
            ${discountBlock}
          </div>
        </div>
      </a>
      <div class="cart-control" data-product-id="${product.id}"></div>
    </div>
  `;
}

function cartControlHTML(qtyInCart) {
  if (qtyInCart > 0) {
    const options = Array.from({ length: MAX_QTY }, (_, i) => i + 1)
      .map((n) => `<option value="${n}" ${n === qtyInCart ? "selected" : ""}>${n}</option>`)
      .join("");
    return `
      <div class="qty-stepper">
        <label class="muted">Qty</label>
        <select class="cart-qty-select">${options}</select>
        <button class="link-btn cart-remove-btn">Remove</button>
      </div>
    `;
  }
  return `<button class="btn btn-outline btn-block add-to-cart-btn">Add to Cart</button>`;
}

/** Renders/refreshes the Add-to-Cart / quantity-stepper control for every
 *  `.cart-control` element under `root`, and wires up all the buttons,
 *  including the wishlist heart. Call this once after inserting card HTML,
 *  and it re-wires itself automatically after every cart change. */
export function mountProductCards(root, { onCartChange } = {}) {
  const cart = getCart();

  root.querySelectorAll(".cart-control").forEach((el) => {
    const id = el.dataset.productId;
    const cartItem = cart.find((i) => i.id === id);
    el.innerHTML = cartControlHTML(cartItem ? cartItem.qty : 0);

    const addBtn = el.querySelector(".add-to-cart-btn");
    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const product = getProductById(id);
        if (!product) return;
        addToCart(product, 1);
        refreshBadge();
        if (onCartChange) onCartChange();
        else mountProductCards(root, { onCartChange });
      });
    }

    const qtySelect = el.querySelector(".cart-qty-select");
    if (qtySelect) {
      qtySelect.addEventListener("click", (e) => e.preventDefault());
      qtySelect.addEventListener("change", (e) => {
        updateQty(id, Number(e.target.value));
        refreshBadge();
        if (onCartChange) onCartChange();
        else mountProductCards(root, { onCartChange });
      });
    }

    const removeBtn = el.querySelector(".cart-remove-btn");
    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        removeFromCart(id);
        refreshBadge();
        if (onCartChange) onCartChange();
        else mountProductCards(root, { onCartChange });
      });
    }
  });

  root.querySelectorAll(".wishlist-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.productId;
      const nowActive = toggleWishlist(id);
      btn.classList.toggle("active", nowActive);
      btn.textContent = nowActive ? "♥" : "♡";
      btn.setAttribute("aria-label", nowActive ? "Remove from wishlist" : "Add to wishlist");
      refreshWishlistBadge();
    });
  });
}

export function refreshBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = cartItemCount();
  badge.textContent = String(count);
  badge.classList.toggle("hidden", count === 0);
}

export function refreshWishlistBadge() {
  const badge = document.getElementById("wishlistBadge");
  if (!badge) return;
  const count = wishlistCount();
  badge.textContent = String(count);
  badge.classList.toggle("hidden", count === 0);
}
