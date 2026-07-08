// common.js — runs on every page to keep the header in sync with
// cart/login state. Each HTML page includes the same header markup;
// this script just fills in the dynamic bits.

import { getCurrentUser, logout } from "./auth.js";
import { cartItemCount } from "./cart.js";
import { wishlistCount } from "./wishlist.js";
import { getOrCreateVisitorId } from "./visitors.js";

function renderHeader() {
  const badge = document.getElementById("cartBadge");
  const count = cartItemCount();
  if (badge) {
    if (count > 0) {
      badge.textContent = String(count);
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  const wishBadge = document.getElementById("wishlistBadge");
  const wishCount = wishlistCount();
  if (wishBadge) {
    if (wishCount > 0) {
      wishBadge.textContent = String(wishCount);
      wishBadge.classList.remove("hidden");
    } else {
      wishBadge.classList.add("hidden");
    }
  }

  const accountArea = document.getElementById("accountArea");
  const user = getCurrentUser();
  if (accountArea) {
    if (user) {
      accountArea.innerHTML = `
        <a href="account.html" class="nav-icon-link">Hi, ${user.name.split(" ")[0]}</a>
        <button class="link-btn" id="logoutBtn">Log out</button>
      `;
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          logout();
          window.location.href = "index.html";
        });
      }
    } else {
      accountArea.innerHTML = `<a href="login.html" class="nav-icon-link">Log in</a>`;
    }
  }
}

function wireSearch() {
  const form = document.getElementById("searchForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = form.querySelector("input[name='q']").value.trim();
    window.location.href = query
      ? `products.html?q=${encodeURIComponent(query)}`
      : "products.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getOrCreateVisitorId();
  renderHeader();
  wireSearch();
});
