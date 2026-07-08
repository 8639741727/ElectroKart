import { getCart, cartSubtotal, clearCart } from "./cart.js";
import { getCurrentUser } from "./auth.js";
import { sendPageView, sendPurchase } from "./target.js";

sendPageView("checkout");

const cart = getCart();
if (cart.length === 0) {
  window.location.href = "cart.html";
}

const user = getCurrentUser();
if (user) {
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
}

const summaryItems = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");
const subtotal = cartSubtotal();

summaryItems.innerHTML = cart
  .map(
    (item) => `
    <div class="summary-row">
      <span class="muted">${item.name} × ${item.qty}</span>
      <span class="price">$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `
  )
  .join("");
summaryTotal.textContent = `$${subtotal.toFixed(2)}`;
document.getElementById("placeOrderBtn").textContent = `Place order — $${subtotal.toFixed(2)}`;

document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const orderId = `EK-ORD-${Date.now().toString().slice(-8)}`;
  sendPurchase(cart, orderId);

  // Save to order history (used by orders.html)
  const orders = JSON.parse(localStorage.getItem("ek_orders") || "[]");
  orders.push({
    orderId,
    date: new Date().toISOString(),
    items: cart,
    total: subtotal,
    email: user?.email || null,
  });
  localStorage.setItem("ek_orders", JSON.stringify(orders));

  clearCart();
  sessionStorage.setItem("ek_last_order", JSON.stringify({ orderId, total: subtotal }));
  window.location.href = "confirmation.html";
});
