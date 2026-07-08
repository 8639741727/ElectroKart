// auth.js — plain-JS auth store backed by localStorage.
// Front-end-only auth (no real backend), enough to demo login-status
// audiences in Adobe Target.

const USERS_KEY = "ek_users";
const SESSION_KEY = "ek_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  document.body.setAttribute("data-logged-in", session ? "true" : "false");
}

export function signup({ name, email, password }) {
  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with that email already exists.");
  }
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const session = { name, email };
  setSession(session);
  return session;
}

export function login({ email, password }) {
  const users = loadUsers();
  const match = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) {
    throw new Error("That email and password don't match our records.");
  }
  const session = { name: match.name, email: match.email };
  setSession(session);
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  document.body.setAttribute("data-logged-in", "false");
}

// Keep the data-logged-in attribute correct on every page load.
document.body.setAttribute("data-logged-in", getCurrentUser() ? "true" : "false");
