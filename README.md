# ElectroKart — demo electronics store (plain HTML/CSS/JS)

A realistic-looking online store built with **plain HTML, CSS, and
JavaScript — no build step, no npm install.** Open it directly in VS Code
with the **Live Server** extension — nothing else needed.

Renamed from the earlier "FERRITE" version to **ElectroKart**, following the
same naming pattern as Flipkart/Snapdeal (a plain word + "Kart"), and
rebuilt with a much bigger catalog, more pages, and Amazon/Flipkart-style
product titles.

## Pages (13 total)

| Page | File |
|---|---|
| Home | `index.html` |
| All Products (filter/search/sort) | `products.html` |
| Product detail | `product.html?id=...` |
| Today's Deals | `deals.html` |
| Wishlist | `wishlist.html` |
| Cart | `cart.html` |
| Checkout | `checkout.html` |
| Order confirmation | `confirmation.html` |
| Your Orders (order history) | `orders.html` |
| Log in | `login.html` |
| Sign up | `signup.html` |
| Account | `account.html` |
| Visitor Log (Adobe Target testing tool) | `admin.html` |

There's no real backend — accounts, cart, wishlist, and orders are all
stored in the browser (`localStorage`), enough to demo login-based
audiences, cart-based profile scripts, and recommendations criteria in
Adobe Target without needing a server of your own.

## The product catalog

**45 products across 7 categories:** Audio, Computing, Mobiles & Tablets,
Wearables, Cameras & Imaging, Smart Home, and Gaming. Titles follow the
long, spec-and-color-in-parentheses style Amazon/Flipkart listings use
(e.g. *"Nimbus Pixelay 12 Pro, 256GB, 5G (Cosmic Blue)"*) for realism. All
brand names (Voltrix, Nimbus, Pulsewave, Meridian, etc.) are invented for
this demo — not real trademarks — so the catalog is safe to publish as-is.

Having more products across more categories gives Adobe Target recommendation
criteria (most-viewed, top-sellers, related-by-category, cross-sell) enough
variety to actually show different results per zone, rather than the same
handful of items everywhere.

## The cart — how "Add to Cart" works now

Previously, clicking "Add to Cart" flashed a temporary confirmation and then
reset back to an "Add to Cart" button — so a second click looked like
nothing had happened. That's fixed:

- Click **Add to Cart** once → the button is replaced by a **quantity
  selector (1–10)** showing the current amount in your cart, plus a
  **Remove** link.
- Changing the quantity updates the cart immediately, no extra click.
- This works the same way on product cards (home, listings, deals,
  wishlist, cross-sell) and on the product detail page.

## Wishlist, Deals, and Orders — new pages

- **Wishlist** — tap the ♡ on any product card or product page to save it.
  View everything saved at `wishlist.html`.
- **Today's Deals** (`deals.html`) — every discounted product, sorted by
  biggest discount first. Also a natural spot for its own Target zone.
- **Your Orders** (`orders.html`) — every completed checkout is saved here
  with items, total, and date, so you can demo a full purchase-history view.

## Running it — just Live Server, nothing else

1. Unzip this folder and open it in VS Code (**File → Open Folder**, select
   the `electrokart` folder itself).
2. Install the **Live Server** extension if you don't have it already.
3. Right-click **`index.html`** → **Open with Live Server**.
4. Click around: browse products, add to cart, adjust quantity, save to
   wishlist, sign up, check out, and see the order appear under "Your Orders".

## Publishing to GitHub

**Repo name:** `electrokart` (or reuse your existing `ferrite-electronics`
repo — see note below).

**If you're starting a fresh repo:**
1. Create it at [github.com/new](https://github.com/new), don't add a README.
2. On the repo page, **Add file → Upload files**.
3. **Drag the actual folders** (`css`, `js`, `data`) from Windows Explorer
   directly onto the upload box — not through a file-picker dialog, which
   can't select folders. Then drag in the `.html` files, `favicon.svg`, and
   `README.md` the same way.
4. Scroll down and click the green **Commit changes** button — this step is
   easy to miss, and without it nothing is actually saved.
5. **Settings → Pages → Source: Deploy from a branch → Branch: `main` → `/root`
   → Save.**

**If you're replacing the old FERRITE site in your existing repo:**
1. Go to your repo, open each old file/folder, and delete it (or delete the
   whole repo and recreate it — simplest if there's nothing else in there).
2. Upload this new folder's contents the same way as above.
3. Pages settings don't need to change — same branch, same root.

Either way, your live URL will be:
```
https://<your-username>.github.io/<repo-name>/
```

## Where the Adobe Target hooks live

| What | Where |
|---|---|
| Adobe Launch embed script | Top `<head>` of every `.html` page (look for the comment) |
| Page view / product view / cart / purchase events | `js/target.js` |
| Recommendations containers (Target zones) | `data-target-zone="..."` sections in `index.html`, `product.html`, `cart.html` |
| Custom XT hero mbox zone | Hero section in `index.html` (`data-target-zone="homepage-hero"`) |
| Login-status signal for audiences | `<body data-logged-in="true/false">`, set in `js/auth.js` |
| `profile.MyCart` / `profile.cartValue` | `js/target.js` → `getProfileParams()`, also shown on the **Account** page |
| Anonymous visitor ID (ECID-style) | `js/visitors.js` → `getOrCreateVisitorId()`, included in `getProfileParams()` as `ecid` |
| Visitor capture (local stand-in for a backend) | `admin.html` — see note in that page about its limits |

Every Target-related function checks whether `window.alloy` exists before
calling it — until a real Adobe Launch embed is added, it just logs what
*would* have been sent to the console (DevTools → Console).

### Adding Adobe Launch

1. In Adobe Launch, publish your library and grab the embed script:
   ```html
   <script src="https://assets.adobedtm.com/YOUR-PROPERTY-ID/launch-EN.min.js" async></script>
   ```
2. Paste that into the `<head>` of every `.html` file, where the comment
   says so (there are 13 pages — a find-and-replace across the folder
   works well here).
3. Make sure the Launch property has the **Adobe Experience Platform Web
   SDK** extension configured with your datastream/edge config ID.
4. Reload — `js/target.js` starts sending real events.

## Project structure

```
index.html, products.html, product.html, deals.html, wishlist.html,
cart.html, checkout.html, confirmation.html, orders.html,
login.html, signup.html, account.html, admin.html

css/style.css          All styling

data/products.js       Product catalog (45 products, 7 categories)

js/
  auth.js               Login/signup, stored in localStorage
  cart.js               Cart state, stored in localStorage
  wishlist.js           Wishlist state, stored in localStorage
  visitors.js           Anonymous visitor ID + local visit log (backend stand-in)
  target.js             Adobe Target/Alloy event wiring
  thumb.js              Generates product "photo" tiles (line-art SVG)
  productCard.js        Shared product card markup, qty stepper, wishlist toggle
  common.js             Runs on every page: cart/wishlist badges, login state
  home.js, products-page.js, product-page.js, deals-page.js,
  wishlist-page.js, cart-page.js, checkout-page.js,
  confirmation-page.js, orders-page.js, login-page.js,
  signup-page.js, account-page.js, admin-page.js
                         One script per page
```

## Notes

- This is a **demo** — no real payments are processed and no emails are sent.
- Product "photos" are generated line-art tiles, not real images or real
  brands, so there are no external image dependencies or trademark concerns.
- The Visitor Log (`admin.html`) only reflects visits on your own browser —
  see the note on that page for why a real cross-device database needs an
  actual server.
