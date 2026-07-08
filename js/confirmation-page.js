import { sendPageView } from "./target.js";

const root = document.getElementById("confirmRoot");
let order = null;
try {
  order = JSON.parse(sessionStorage.getItem("ek_last_order") || "null");
} catch {
  order = null;
}

if (!order) {
  window.location.href = "index.html";
} else {
  sendPageView("order-confirmation", { orderId: order.orderId });
  root.innerHTML = `
    <span class="eyebrow">Order placed</span>
    <h1>Thanks — your order is confirmed.</h1>
    <p class="muted">
      Order <span class="price">${order.orderId}</span> for
      <span class="price">$${order.total.toFixed(2)}</span> was placed successfully.
    </p>
    <p class="muted">This is a demo confirmation — no email will be sent and no card was charged.</p>
    <a href="products.html" class="btn btn-primary">Keep shopping</a>
  `;
}
