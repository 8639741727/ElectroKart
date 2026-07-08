// cart.js — plain-JS cart store backed by localStorage.
// Any page can import these functions directly; no framework needed.

import { sendCartUpdate } from "./target.js";

const CART_KEY = "ek_cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  sendCartUpdate(cart);
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty });
  }
  saveCart(cart);
  return cart;
}

export function updateQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  } else {
    cart = cart.map((i) => (i.id === id ? { ...i, qty } : i));
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function cartItemCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

export function cartSubtotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}
