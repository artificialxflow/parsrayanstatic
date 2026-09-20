const APP_DATA = {
  kpis: [
    { id: "stock", label: "اقلام زیر حداقل موجودی", value: 4, tone: "bg-rose-500", icon: "package-x" },
    { id: "wo", label: "سفارش کار باز", value: 7, tone: "bg-amber-500", icon: "factory" },
    { id: "nc", label: "عدم انطباق باز", value: 3, tone: "bg-violet-500", icon: "shield-alert" },
    { id: "sales", label: "فروش ماه (میلیون تومان)", value: 186, tone: "bg-emerald-500", icon: "banknote" },
  ],
  warehouse: [
    { sku: "PR-110", name: "ورق فولادی ۲ میل", unit: "کیلو", qty: 420, min: 500, loc: "سالن A" },
    { sku: "PR-204", name: "الکتروموتور ۳ کیلووات", unit: "عدد", qty: 18, min: 8, loc: "قفسه M" },
    { sku: "PR-331", name: "رنگ صنعتی آبی", unit: "لیتر", qty: 36, min: 40, loc: "انبار مواد" },
    { sku: "PR-412", name: "یاتاقان ۶۲۰۴", unit: "عدد", qty: 90, min: 30, loc: "قفسه K" },
    { sku: "PR-508", name: "بست کمربندی", unit: "بسته", qty: 12, min: 20, loc: "سالن بسته‌بندی" },
  ],
  production: [
    { wo: "WO-۱۴۰۳-۱۸", product: "پمپ سانتریفیوژ مدل P20", line: "خط ۱", progress: 72, status: "در جریان" },
    { wo: "WO-۱۴۰۳-۱۹", product: "گیربکس صنعتی G8", line: "خط ۲", progress: 40, status: "در جریان" },
    { wo: "WO-۱۴۰۳-۱۶", product: "مخزن استیل ۲۰۰ لیتری", line: "جوشکاری", progress: 100, status: "تکمیل" },
    { wo: "WO-۱۴۰۳-۲۰", product: "فریم دستگاه برش", line: "خط ۱", progress: 15, status: "باز" },
  ],
  quality: [
    { qc: "QC-۹۰۱", item: "پمپ P20 سری صبح", result: "قبول", nc: "—", owner: "مریم نوری" },
    { qc: "QC-۹۰۲", item: "رنگ‌کاری گیربکس G8", result: "رد", nc: "NC-۲۲", owner: "حسین مرادی" },
    { qc: "QC-۹۰۳", item: "جوش مخزن ۲۰۰", result: "قبول", nc: "—", owner: "مریم نوری" },
    { qc: "QC-۹۰۴", item: "ابعاد فریم برش", result: "در انتظار", nc: "—", owner: "کیوان رستمی" },
  ],
  purchase: [
    { pr: "PRQ-۵۵", vendor: "فولاد پارس", item: "ورق ۲ میل", status: "در انتظار تأیید" },
    { pr: "PRQ-۵۶", vendor: "رنگین صنعت", item: "رنگ صنعتی", status: "سفارش شده" },
    { pr: "PRQ-۵۲", vendor: "یاتاقان شرق", item: "یاتاقان ۶۲۰۴", status: "رسید انبار" },
  ],
  sales: [
    { so: "SO-۷۷۱", customer: "صنایع غذایی آذر", amount: 42, status: "در تولید" },
    { so: "SO-۷۷۴", customer: "ماشین‌سازی کویر", amount: 28, status: "ارسال شده" },
    { so: "SO-۷۷۸", customer: "پتروشیمی نور", amount: 61, status: "پیش‌فاکتور" },
  ],
  crm: [
    { lead: "سرنخ — کارخانه سپهر", stage: "پیشنهاد", owner: "سارا کیانی" },
    { lead: "مشتری — صنایع غذایی آذر", stage: "پس از فروش", owner: "سارا کیانی" },
    { lead: "سرنخ — نساجی باران", stage: "تماس اولیه", owner: "رضا عباسی" },
  ],
  moves: [
    { doc: "رسید R-۲۰۹", date: "۱۴۰۳/۰۶/۲۸", item: "یاتاقان ۶۲۰۴", qty: "+۳۰" },
    { doc: "حواله H-۱۸۸", date: "۱۴۰۳/۰۶/۲۷", item: "ورق فولادی", qty: "−۸۰" },
    { doc: "حواله H-۱۸۷", date: "۱۴۰۳/۰۶/۲۶", item: "رنگ صنعتی", qty: "−۱۲" },
  ],
};
