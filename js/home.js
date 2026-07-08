import { products, categories } from "../data/products.js";
import { productCardHTML, mountProductCards } from "./productCard.js";
import { sendPageView } from "./target.js";

sendPageView("home");

const categoryGrid = document.getElementById("categoryGrid");
categoryGrid.innerHTML = categories
  .map(
    (c) => `
    <a href="products.html?category=${c.id}" class="category-tile card">
      <span class="eyebrow">Category</span>
      <h3>${c.name}</h3>
      <span class="muted">Shop ${c.name.toLowerCase()} →</span>
    </a>
  `
  )
  .join("");

const trending = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
const trendingGrid = document.getElementById("trendingGrid");
trendingGrid.innerHTML = trending.map(productCardHTML).join("");

const deals = products.filter((p) => p.discountPct > 0).slice(0, 4);
const dealsGrid = document.getElementById("dealsGrid");
dealsGrid.innerHTML = deals.map(productCardHTML).join("");

mountProductCards(document.getElementById("trendingGrid"));
mountProductCards(dealsGrid);
