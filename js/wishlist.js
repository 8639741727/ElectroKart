// wishlist.js — a simple saved-items list, stored in localStorage.
// Mirrors the "heart" wishlist pattern from Amazon/Flipkart.

const WISHLIST_KEY = "ek_wishlist";

export function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

export function isWishlisted(id) {
  return getWishlist().includes(id);
}

export function toggleWishlist(id) {
  const list = getWishlist();
  const idx = list.indexOf(id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(id);
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  return list.includes(id);
}

export function wishlistCount() {
  return getWishlist().length;
}
