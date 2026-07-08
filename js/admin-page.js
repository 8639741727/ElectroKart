import { getVisitorSummary, clearVisitorLog, exportVisitorLogCSV } from "./visitors.js";

const tbody = document.getElementById("visitorTableBody");
const emptyState = document.getElementById("emptyState");
const table = document.getElementById("visitorTable");
const visitorCount = document.getElementById("visitorCount");

function shortId(id) {
  return id.length > 18 ? `${id.slice(0, 8)}…${id.slice(-6)}` : id;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

function render() {
  const summary = getVisitorSummary();
  visitorCount.textContent = `${summary.length} visitor${summary.length === 1 ? "" : "s"} recorded on this browser`;

  if (summary.length === 0) {
    table.parentElement.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }
  table.parentElement.classList.remove("hidden");
  emptyState.classList.add("hidden");

  tbody.innerHTML = summary
    .map((v) => {
      const statusBadge =
        v.status === "logged-in"
          ? `<span class="status-pill-logged">Logged in</span>`
          : `<span class="status-pill-anon">Anonymous</span>`;
      const identity = v.status === "logged-in" ? `${v.name}<br><span class="muted">${v.email}</span>` : `<span class="muted">—</span>`;
      return `
        <tr>
          <td>${statusBadge}</td>
          <td>${identity}</td>
          <td class="visitor-id-cell">${shortId(v.visitorId)}</td>
          <td>${v.visitCount}</td>
          <td>${v.lastPage}</td>
          <td class="price">$${v.cartValue.toFixed(2)}</td>
          <td class="muted">${formatDate(v.firstSeen)}</td>
          <td class="muted">${formatDate(v.lastSeen)}</td>
        </tr>
      `;
    })
    .join("");
}

document.getElementById("exportBtn").addEventListener("click", () => {
  const csv = exportVisitorLogCSV();
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ferrite-visitor-log-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("Clear the visitor log on this browser? This can't be undone.")) {
    clearVisitorLog();
    render();
  }
});

render();
