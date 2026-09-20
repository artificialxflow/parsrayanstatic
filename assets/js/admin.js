function statusClass(status) {
  if (["قبول", "تکمیل", "ارسال شده", "رسید انبار"].includes(status)) return "text-emerald-700 bg-emerald-100";
  if (["رد", "کمبود"].includes(status)) return "text-rose-700 bg-rose-100";
  if (["در جریان", "سفارش شده", "در تولید"].includes(status)) return "text-amber-800 bg-amber-100";
  return "text-sky-800 bg-sky-100";
}

function renderKpis() {
  const box = qs("#kpi-grid");
  if (!box) return;
  box.innerHTML = APP_DATA.kpis
    .map(
      (k) => `
      <article class="card-neo p-5 text-white ${k.tone} border-slate-900">
        <div class="flex items-center justify-between mb-3">
          <span class="opacity-90 text-sm font-bold">${k.label}</span>
          <i data-lucide="${k.icon}" class="w-6 h-6"></i>
        </div>
        <p class="text-4xl font-black">${toFa(k.value)}</p>
      </article>`
    )
    .join("");
}

function stockStatus(row) {
  return row.qty < row.min ? "کمبود" : "کافی";
}

function renderWarehouse(filter = "") {
  const tbody = qs("#wh-body");
  if (!tbody) return;
  const q = filter.trim();
  const rows = APP_DATA.warehouse.filter((r) => !q || `${r.sku} ${r.name} ${r.loc}`.includes(q));
  tbody.innerHTML = rows
    .map((r) => {
      const st = stockStatus(r);
      return `<tr>
        <td class="font-bold">${r.sku}</td>
        <td>${r.name}</td>
        <td>${toFa(r.qty)} ${r.unit}</td>
        <td>${toFa(r.min)}</td>
        <td>${r.loc}</td>
        <td><span class="badge ${statusClass(st === "کمبود" ? "رد" : "قبول")}">${st}</span></td>
      </tr>`;
    })
    .join("");
}

function renderSimple(id, rows, cols) {
  const tbody = qs(id);
  if (!tbody) return;
  tbody.innerHTML = rows
    .map((r) => `<tr>${cols.map((c) => `<td>${typeof r[c] === "number" ? toFa(r[c]) : r[c] ?? ""}</td>`).join("")}</tr>`)
    .join("");
}

function renderProduction() {
  const tbody = qs("#prod-body");
  if (!tbody) return;
  tbody.innerHTML = APP_DATA.production
    .map(
      (r) => `<tr>
        <td class="font-bold">${r.wo}</td>
        <td>${r.product}</td>
        <td>${r.line}</td>
        <td>
          <div class="flex items-center gap-2">
            <div class="h-2 w-24 bg-slate-200 rounded-full overflow-hidden border border-slate-800">
              <div class="h-full bg-blue-600" style="width:${r.progress}%"></div>
            </div>
            <span>${toFa(r.progress)}٪</span>
          </div>
        </td>
        <td><span class="badge ${statusClass(r.status)}">${r.status}</span></td>
      </tr>`
    )
    .join("");
}

function renderQuality() {
  const tbody = qs("#qc-body");
  if (!tbody) return;
  tbody.innerHTML = APP_DATA.quality
    .map(
      (r) => `<tr>
        <td class="font-bold">${r.qc}</td>
        <td>${r.item}</td>
        <td><span class="badge ${statusClass(r.result)}">${r.result}</span></td>
        <td>${r.nc}</td>
        <td>${r.owner}</td>
      </tr>`
    )
    .join("");
}

function renderPurchase() {
  const tbody = qs("#pr-body");
  if (!tbody) return;
  tbody.innerHTML = APP_DATA.purchase
    .map(
      (r) => `<tr>
        <td class="font-bold">${r.pr}</td>
        <td>${r.vendor}</td>
        <td>${r.item}</td>
        <td><span class="badge ${statusClass(r.status)}">${r.status}</span></td>
      </tr>`
    )
    .join("");
}

function renderSales() {
  const tbody = qs("#so-body");
  if (!tbody) return;
  tbody.innerHTML = APP_DATA.sales
    .map(
      (r) => `<tr>
        <td class="font-bold">${r.so}</td>
        <td>${r.customer}</td>
        <td>${toFa(r.amount)} میلیون</td>
        <td><span class="badge ${statusClass(r.status)}">${r.status}</span></td>
      </tr>`
    )
    .join("");
}

function renderCrm() {
  renderSimple("#crm-body", APP_DATA.crm, ["lead", "stage", "owner"]);
}

function renderMoves() {
  renderSimple("#mv-body", APP_DATA.moves, ["doc", "date", "item", "qty"]);
}

function drawCharts() {
  if (!window.Chart) return;
  Chart.defaults.font.family = "Vazirmatn";
  const prod = qs("#chart-prod");
  const stock = qs("#chart-stock");
  if (prod) {
    new Chart(prod, {
      type: "line",
      data: {
        labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"].map((x) => x),
        datasets: [
          {
            label: "خروجی تولید (دستگاه)",
            data: [18, 22, 19, 27, 24, 31],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,.15)",
            fill: true,
            tension: 0.35,
          },
        ],
      },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } },
    });
  }
  if (stock) {
    new Chart(stock, {
      type: "doughnut",
      data: {
        labels: ["مواد اولیه", "نیمه‌ساخته", "محصول", "مصرفی"],
        datasets: [{ data: [38, 22, 27, 13], backgroundColor: ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6"] }],
      },
      options: { plugins: { legend: { position: "bottom" } } },
    });
  }
}

function showView(name) {
  qsa("[data-view]").forEach((el) => el.classList.toggle("hidden", el.dataset.view !== name));
  qsa("[data-nav]").forEach((el) => {
    const active = el.dataset.nav === name;
    el.classList.toggle("bg-blue-600", active);
    el.classList.toggle("text-white", active);
    el.classList.toggle("text-slate-700", !active);
  });
  qs("#page-title").textContent = qsa("[data-nav]").find((n) => n.dataset.nav === name)?.dataset.title || "داشبورد";
}

function toggleSidebar(open) {
  const side = qs("#sidebar");
  const overlay = qs("#sidebar-overlay");
  if (window.innerWidth >= 1024) return;
  if (open === undefined) open = side.classList.contains("translate-x-full");
  side.classList.toggle("translate-x-full", !open);
  side.classList.toggle("translate-x-0", open);
  overlay.classList.toggle("open", open);
}

document.addEventListener("DOMContentLoaded", () => {
  renderKpis();
  renderWarehouse();
  renderProduction();
  renderQuality();
  renderPurchase();
  renderSales();
  renderCrm();
  renderMoves();
  drawCharts();
  if (window.lucide) lucide.createIcons();

  qsa("[data-nav]").forEach((btn) =>
    btn.addEventListener("click", () => {
      showView(btn.dataset.nav);
      toggleSidebar(false);
      if (window.lucide) lucide.createIcons();
    })
  );

  qs("#wh-search")?.addEventListener("input", (e) => renderWarehouse(e.target.value));
  qs("#mv-search")?.addEventListener("input", (e) => {
    const q = e.target.value;
    const tbody = qs("#mv-body");
    const rows = APP_DATA.moves.filter((r) => `${r.doc} ${r.item}`.includes(q));
    tbody.innerHTML = rows.map((r) => `<tr><td>${r.doc}</td><td>${r.date}</td><td>${r.item}</td><td>${r.qty}</td></tr>`).join("");
  });

  qs("#sidebar-toggle")?.addEventListener("click", () => {
    const side = qs("#sidebar");
    const opening = side.classList.contains("-translate-x-full");
    toggleSidebar(opening);
  });
  qs("#sidebar-overlay")?.addEventListener("click", () => toggleSidebar(false));

  qs("#doc-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = qs("#doc-type").value;
    const item = qs("#doc-item").value.trim();
    const qty = qs("#doc-qty").value;
    if (!item || !qty) {
      showToast("کالا و مقدار را وارد کنید.", "err");
      return;
    }
    APP_DATA.moves.unshift({
      doc: type === "in" ? `رسید R-${toFa(210 + APP_DATA.moves.length)}` : `حواله H-${toFa(190 + APP_DATA.moves.length)}`,
      date: "۱۴۰۳/۰۶/۲۹",
      item,
      qty: type === "in" ? `+${toFa(qty)}` : `−${toFa(qty)}`,
    });
    renderMoves();
    closeModal("doc-modal");
    e.target.reset();
    showToast("سند انبار به‌صورت نمایشی ثبت شد.");
  });

  showView("dashboard");
});
