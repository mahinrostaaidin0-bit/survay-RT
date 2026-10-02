# راه‌اندازی نظرسنجی مرکزی

## 1) Supabase
1. یک پروژه در Supabase بساز.
2. فایل `SUPABASE_SETUP.sql` را در SQL Editor اجرا کن.
3. در Authentication > Users یک کاربر ادمین با ایمیل/رمز بساز.
4. از Project Connect / API Keys، Project URL و Publishable key (یا anon key قدیمی) را بردار.
5. داخل `js/supabase-config.js` قرار بده:
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
6. **Secret/service_role key را هرگز در سایت نگذار.**

## 2) تست محلی
فایل `ar/index.html` را با یک static server باز کن. برای GitHub Pages نیازی به Node/Express نیست.

## 3) انتشار رایگان
کل محتویات پوشه `public` را داخل یک GitHub repository بگذار و GitHub Pages را برای branch اصلی فعال کن. سایت به صورت یک URL عمومی منتشر می‌شود.

## 4) پنل مدیر
بعد از انتشار، به URL سایت + `?admin=1` برو. مثال:
`https://USERNAME.github.io/REPOSITORY/?admin=1`

با حسابی که در Supabase Authentication ساخته‌ای وارد شو.

## داده‌های ذخیره‌شده
برای هر پاسخ: انتخاب هر مرحله، مسیر عکس‌های A/B، نوع دستگاه (موبایل/تبلت/دسکتاپ)، User-Agent، زبان مرورگر، timezone، اندازه viewport و screen، DPR و زمان ثبت ذخیره می‌شود.
