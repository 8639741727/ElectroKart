import { sendPageView } from "./target.js";

sendPageView("orders");

const root = document.getElementById("ordersRoot");
const emptyState = document.getElementById("emptyState");

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem("ek_orders") || "[]");
  } catch {
    return [];
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const orders = loadOrders().reverse();

if (orders.length === 0) {
  root.classList.add("hidden");
  emptyState.classList.remove("hidden");
} else {
  root.innerHTML = orders
    .map((order) => {
      const itemRows = order.items
        .map(
          (item) => `
          <div class="summary-row">
            <span class="muted">${item.name} × ${item.qty}</span>
            <span class="price">$${(item.price * item.qty).toFixed(2)}</span>
          </div>
        `
        )
        .join("");
      return `
        <div class="card order-card">
          <div class="order-card-header">
            <div>
              <span class="eyebrow">Order ${order.orderId}</span>
              <p class="muted" style="margin-top:4px;">Placed ${formatDate(order.date)}</p>
            </div>
            <span class="price-lg" style="font-size:1.15rem;">$${order.total.toFixed(2)}</span>
          </div>
          <div class="order-card-items">${itemRows}</div>
        </div>
      `;
    })
    .join("");
}
