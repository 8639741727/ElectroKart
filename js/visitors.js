// visitors.js — a lightweight, install-free stand-in for a real backend.
//
// There's no server here, so this can't capture visitors across different
// people's machines — that genuinely requires a server somewhere. What it
// DOES do, entirely inside this browser:
//
// 1. Gives every visitor a persistent anonymous ID the first time they
//    show up (same idea as Adobe's ECID / Experience Cloud ID — an
//    anonymous identifier that later gets "stitched" to a known profile
//    once someone logs in).
// 2. Keeps a running log of visits (page, timestamp, login state, cart
//    value) in localStorage, viewable on the admin.html Visitor Log page.
//
// Once you wire up real Adobe Launch/Alloy, Adobe Experience Platform
// becomes your actual backend — it already does steps 1 and 2 for you
// at scale, across every visitor's device, which is the piece that can't
// be replicated for free without a server.

const VISITOR_ID_KEY = "ek_visitor_id";
const LOG_KEY = "ek_visitor_log";
const MAX_LOG_ENTRIES = 500;

export function getOrCreateVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function readLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLog(log) {
  const trimmed = log.slice(-MAX_LOG_ENTRIES);
  localStorage.setItem(LOG_KEY, JSON.stringify(trimmed));
}

/**
 * Call on every page load. Records one row in the visit log tying
 * together: anonymous visitor ID, login state (and name/email if known),
 * which page was viewed, and the current cart value at that moment.
 */
export function recordVisit(pageName, extra = {}) {
  const visitorId = getOrCreateVisitorId();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("ek_session") || "null");
  } catch {
    user = null;
  }
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("ek_cart") || "[]");
  } catch {
    cart = [];
  }
  const cartValue = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const log = readLog();
  log.push({
    visitorId,
    status: user ? "logged-in" : "anonymous",
    name: user?.name || null,
    email: user?.email || null,
    page: pageName,
    cartValue: +cartValue.toFixed(2),
    timestamp: new Date().toISOString(),
    ...extra,
  });
  writeLog(log);
}

export function getVisitorLog() {
  return readLog();
}

/** Groups the raw page-view log into one row per visitor — first seen,
 *  last seen, visit count, current status, latest cart value. This is
 *  what the admin Visitor Log table actually displays. */
export function getVisitorSummary() {
  const log = readLog();
  const byVisitor = new Map();

  for (const entry of log) {
    const existing = byVisitor.get(entry.visitorId);
    if (!existing) {
      byVisitor.set(entry.visitorId, {
        visitorId: entry.visitorId,
        status: entry.status,
        name: entry.name,
        email: entry.email,
        firstSeen: entry.timestamp,
        lastSeen: entry.timestamp,
        visitCount: 1,
        lastPage: entry.page,
        cartValue: entry.cartValue,
      });
    } else {
      existing.visitCount += 1;
      existing.lastSeen = entry.timestamp;
      existing.lastPage = entry.page;
      existing.cartValue = entry.cartValue;
      // A later logged-in visit should override an earlier anonymous one —
      // mirrors how identity stitching works once someone logs in.
      if (entry.status === "logged-in") {
        existing.status = "logged-in";
        existing.name = entry.name;
        existing.email = entry.email;
      }
    }
  }

  return Array.from(byVisitor.values()).sort(
    (a, b) => new Date(b.lastSeen) - new Date(a.lastSeen)
  );
}

export function clearVisitorLog() {
  localStorage.removeItem(LOG_KEY);
}

export function exportVisitorLogCSV() {
  const rows = getVisitorSummary();
  const header = ["Visitor ID", "Status", "Name", "Email", "First seen", "Last seen", "Visits", "Last page", "Cart value"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.visitorId,
        r.status,
        r.name || "",
        r.email || "",
        r.firstSeen,
        r.lastSeen,
        r.visitCount,
        r.lastPage,
        r.cartValue,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
  }
  return lines.join("\n");
}
