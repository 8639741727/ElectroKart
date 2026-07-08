import { getCurrentUser, logout } from "./auth.js";
import { cartItemCount, cartSubtotal } from "./cart.js";
import { wishlistCount } from "./wishlist.js";
import { getProfileParams, sendPageView } from "./target.js";

sendPageView("account");

const user = getCurrentUser();
const root = document.getElementById("accountRoot");

if (!user) {
  window.location.href = "login.html";
} else {
  const itemCount = cartItemCount();
  const subtotal = cartSubtotal();
  const savedCount = wishlistCount();
  const orderCount = (() => {
    try {
      return JSON.parse(localStorage.getItem("ek_orders") || "[]").length;
    } catch {
      return 0;
    }
  })();
  const profileParams = getProfileParams();

  root.innerHTML = `
    <span class="eyebrow">Account</span>
    <h1>Hi, ${user.name.split(" ")[0]}</h1>
    <p class="muted">${user.email}</p>

    <div class="grid grid-3" style="margin-top:28px;">
      <div class="card account-block">
        <h3>Cart status</h3>
        <p class="muted">${itemCount} item(s) in your cart</p>
        <p class="price-lg" style="font-size:1.2rem;">$${subtotal.toFixed(2)}</p>
        <a href="cart.html" class="btn btn-outline">View cart</a>
      </div>

      <div class="card account-block">
        <h3>Orders &amp; wishlist</h3>
        <p class="muted">${orderCount} past order(s)</p>
        <p class="muted">${savedCount} item(s) saved</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a href="orders.html" class="btn btn-outline">View orders</a>
          <a href="wishlist.html" class="btn btn-outline">View wishlist</a>
        </div>
      </div>

      <div class="card account-block">
        <h3>Target profile parameters</h3>
        <p class="muted">
          profile.MyCart / profile.cartValue, tracked live for this session —
          handy for checking your Target profile scripts are firing correctly.
        </p>
        <table class="spec-table">
          <tbody>
            <tr><td class="muted">ecid</td><td class="price" style="font-size:0.78rem;">${profileParams.ecid}</td></tr>
            <tr><td class="muted">profile.MyCart</td><td class="price">${profileParams.MyCart || "—"}</td></tr>
            <tr><td class="muted">profile.cartValue</td><td class="price">$${profileParams.cartValue.toFixed(2)}</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <button class="btn btn-outline" id="logoutBtn" style="margin-top:24px;">Log out</button>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    logout();
    window.location.href = "index.html";
  });
}
