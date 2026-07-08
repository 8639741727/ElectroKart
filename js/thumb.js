// thumb.js — builds the same in-house "product photo" tiles as the
// original React build: a gradient tile plus a line-art SVG icon per
// category. No external image hosting needed.

const icons = {
  audio: "M32 44v-8a20 20 0 0 1 40 0v8M28 44h8v20h-8a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6zm44 0h-8v20h8a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6z",
  computing: "M22 30h60v34H22zM18 68h68l-6 8H24zM46 68v-4h12v4",
  mobiles: "M36 16h28a6 6 0 0 1 6 6v56a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6V22a6 6 0 0 1 6-6zM46 78h8",
  wearables: "M50 32a18 18 0 1 0 0 36 18 18 0 0 0 0-36zM40 20h20l3 12H37zM40 84h20l3-12H37z",
  imaging: "M20 34h14l6-8h20l6 8h14v40H20zM50 42a14 14 0 1 0 0 28 14 14 0 0 0 0-28z",
  "smart-home": "M50 20 18 46h10v34h24V58h16v22h8V46h10z",
  gaming: "M28 42h10v8h8v10h-8v8H28a12 12 0 0 1 0-26zm44 0a12 12 0 0 1 0 26h-10v-8h-8V50h8v-8h10zM50 56h0",
};

export function productThumbHTML(product, sizePct = 100) {
  const path = icons[product.category] || icons.audio;
  const gradId = `grad-${product.id}`;
  const discountBadge =
    product.discountPct > 0 ? `<span class="thumb-discount">-${product.discountPct}%</span>` : "";
  return `
    <div class="product-thumb" style="background: linear-gradient(155deg, ${product.color}, #0f1115);">
      <svg viewBox="0 0 100 100" width="${sizePct}%" height="${sizePct}%" aria-hidden="true">
        <defs>
          <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00c97b" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#ff9500" stop-opacity="0.7" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#${gradId})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="${path}" />
        </g>
      </svg>
      ${discountBadge}
    </div>
  `;
}
