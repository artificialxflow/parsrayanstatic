const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function toFa(value) {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[d]);
}

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function showToast(message, type = "ok") {
  document.getElementById("toast")?.remove();
  const el = document.createElement("div");
  el.id = "toast";
  el.className = "toast";
  el.style.background = type === "err" ? "#fff1f2" : "#ecfdf5";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add("open");
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove("open");
}

document.addEventListener("click", (e) => {
  const backdrop = e.target.closest(".modal-backdrop");
  if (backdrop && e.target === backdrop) backdrop.classList.remove("open");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    qsa(".modal-backdrop.open").forEach((m) => m.classList.remove("open"));
  }
});
