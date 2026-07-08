import { products } from "../data/products.js";
import { getWishlist } from "./wishlist.js";
import { productCardHTML, mountProductCards, refreshWishlistBadge } from "./productCard.js";
import { sendPageView } from "./target.js";

sendPageView("wishlist");

const grid = document.getElementById("wishlistGrid");
const emptyState = document.getElementById("emptyState");
const countEl = document.getElementById("wishlistCount");

function mountWithHandlers() {
  mountProductCards(grid, { onCartChange: mountWithHandlers });
}

function render() {
  const ids = getWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  countEl.textContent = `${items.length} item${items.length === 1 ? "" : "s"} saved`;

  if (items.length === 0) {
    grid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }
  grid.classList.remove("hidden");
  emptyState.classList.add("hidden");

  grid.innerHTML = items.map(productCardHTML).join("");
  // Cart changes (add/qty/remove) just refresh the card controls in place.
  mountWithHandlers();

  // Un-hearting an item here should drop it out of the list right away,
  // rather than waiting for a page reload.
  grid.querySelectorAll(".wishlist-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      refreshWishlistBadge();
      setTimeout(render, 0);
    });
  });
}

render();
