import { products } from "../data/products.js";
import { productCardHTML, mountProductCards } from "./productCard.js";
import { sendPageView } from "./target.js";

sendPageView("deals");

const deals = products
  .filter((p) => p.discountPct > 0)
  .sort((a, b) => b.discountPct - a.discountPct);

document.getElementById("dealsCount").textContent = `${deals.length} deals live right now`;

const grid = document.getElementById("dealsGrid");
grid.innerHTML = deals.map(productCardHTML).join("");
mountProductCards(grid);
