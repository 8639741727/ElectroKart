import { products, categories } from "../data/products.js";
import { productCardHTML, mountProductCards } from "./productCard.js";
import { sendPageView } from "./target.js";

const params = new URLSearchParams(window.location.search);
let category = params.get("category") || "";
const query = params.get("q") || "";

sendPageView("product-listing", { category: category || "all" });

const titleEl = document.getElementById("listingTitle");
const countEl = document.getElementById("listingCount");
const sidebarEl = document.getElementById("categorySidebar");
const gridEl = document.getElementById("productGrid");
const sortSelect = document.getElementById("sortSelect");

function renderSidebar() {
  const allBtn = `<button class="sidebar-link ${!category ? "active" : ""}" data-cat="">All</button>`;
  const catBtns = categories
    .map(
      (c) =>
        `<button class="sidebar-link ${category === c.id ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`
    )
    .join("");
  sidebarEl.innerHTML = `<h3 class="sidebar-heading">Categories</h3>${allBtn}${catBtns}`;
  sidebarEl.querySelectorAll(".sidebar-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.cat;
      const url = cat ? `products.html?category=${cat}` : "products.html";
      window.location.href = url;
    });
  });
}

function getFiltered() {
  let list = products;
  if (category) list = list.filter((p) => p.category === category);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q));
  }
  const sorted = [...list];
  switch (sortSelect.value) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      sorted.sort((a, b) => b.discountPct - a.discountPct);
      break;
    default:
      break;
  }
  return sorted;
}

function render() {
  const list = getFiltered();
  const categoryName = categories.find((c) => c.id === category)?.name;
  titleEl.textContent = query ? `Results for "${query}"` : categoryName || "All products";
  countEl.textContent = `${list.length} products`;
  gridEl.innerHTML = list.length
    ? list.map(productCardHTML).join("")
    : `<p class="muted">No products match that search.</p>`;
  mountProductCards(gridEl);
}

renderSidebar();
render();
sortSelect.addEventListener("change", render);
