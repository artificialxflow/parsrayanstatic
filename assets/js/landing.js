document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const nav = qs("#mobile-nav");
  qs("#menu-btn")?.addEventListener("click", () => nav.classList.toggle("hidden"));
  qsa("#mobile-nav a").forEach((a) => a.addEventListener("click", () => nav.classList.add("hidden")));

  const form = qs("#contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = qs("#c-name").value.trim();
    const company = qs("#c-company").value.trim();
    const phone = qs("#c-phone").value.trim();
    const msg = qs("#c-msg").value.trim();
    if (!name || !company || !phone || !msg) {
      showToast("لطفاً فیلدهای ضروری را کامل کنید.", "err");
      return;
    }
    form.reset();
    showToast("درخواست شما ثبت شد. همکاران پارس‌رایان به‌زودی تماس می‌گیرند.");
  });
});
