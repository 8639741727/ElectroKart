import { products } from "../data/products.js";
import { getCart, updateQty, removeFromCart, cartSubtotal } from "./cart.js";
import { productCardHTML, mountProductCards, refreshBadge } from "./productCard.js";
import { sendPageView } from "./target.js";

sendPageView("cart");

const cartRoot = document.getElementById("cartRoot");
const crossSellGrid = document.getElementById("crossSellGrid");

function render() {
  const cart = getCart();
  const subtotal = cartSubtotal();

  if (cart.length === 0) {
    cartRoot.innerHTML = `
      <div class="empty-state card">
        <p>Your cart is empty.</p>
        <a href="products.html" class="btn btn-primary">Browse products</a>
      </div>
    `;
  } else {
    const itemsHTML = cart
      .map(
        (item) => `
        <div class="cart-item card" data-id="${item.id}">
          <div class="cart-item-main">
            <a href="product.html?id=${item.id}" class="cart-item-name">${item.name}</a>
            <span class="muted price">$${item.price.toFixed(2)} each</span>
          </div>
          <div class="cart-item-controls">
            <select class="qty-select" data-id="${item.id}" aria-label="Quantity for ${item.name}">
              ${Array.from({ length: 10 }, (_, i) => i + 1)
                .map((n) => `<option value="${n}" ${n === item.qty ? "selected" : ""}>${n}</option>`)
                .join("")}
            </select>
            <span class="price cart-item-total">$${(item.price * item.qty).toFixed(2)}</span>
            <button class="link-btn remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `
      )
      .join("");

    cartRoot.innerHTML = `
      <div class="cart-layout">
        <div class="cart-items">${itemsHTML}</div>
        <div class="cart-summary card">
          <h3>Order summary</h3>
          <div class="summary-row"><span class="muted">Subtotal</span><span class="price">$${subtotal.toFixed(2)}</span></div>
          <div class="summary-row"><span class="muted">Shipping</span><span class="price">Free</span></div>
          <div class="summary-row summary-total"><span>Total</span><span class="price">$${subtotal.toFixed(2)}</span></div>
          <button class="btn btn-primary btn-block" id="checkoutBtn">Checkout</button>
        </div>
      </div>
    `;

    cartRoot.querySelectorAll(".qty-select").forEach((sel) => {
      sel.addEventListener("change", () => {
        updateQty(sel.dataset.id, Number(sel.value));
        refreshBadge();
        render();
      });
    });
    cartRoot.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.dataset.id);
        refreshBadge();
        render();
      });
    });
    document.getElementById("checkoutBtn").addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }

  const cartIds = new Set(cart.map((i) => i.id));
  const crossSell = products.filter((p) => !cartIds.has(p.id)).slice(0, 4);
  crossSellGrid.innerHTML = crossSell.map(productCardHTML).join("");
  mountProductCards(crossSellGrid, { onCartChange: render });
}

render();
