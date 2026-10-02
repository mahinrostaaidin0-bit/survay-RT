# راه‌اندازی نظرسنجی مرکزی (ساختار تخت — همه فایل‌ها کنار هم)

## ساختار فایل‌ها
همه‌ی فایل‌ها در ریشه‌ی repository هستند، بدون پوشه:
`index.html`, `fa.html`, `en.html`, `ar.html`, `style.css`, `app.js`, `supabase-config.js`,
`robots.txt`, `sitemap.xml` و تصاویر.

## 1) Supabase
1. یک پروژه در Supabase بساز.
2. فایل `SUPABASE_SETUP.sql` را در SQL Editor اجرا کن.
3. در Authentication > Users یک کاربر ادمین با ایمیل/رمز بساز.
4. از Project Settings > API Keys، Project URL و Publishable key (یا anon key قدیمی) را بردار.
5. داخل `supabase-config.js` قرار بده: `SUPABASE_URL` و `SUPABASE_PUBLISHABLE_KEY`.
6. **Secret/service_role key را هرگز در سایت نگذار.**

## 2) تست محلی
فایل `ar.html` را با یک static server باز کن. نیازی به Node/Express نیست.

## 3) انتشار رایگان روی GitHub Pages
همه‌ی فایل‌ها را در ریشه‌ی یک repository آپلود کن، سپس Settings > Pages > Branch: main / root.

## 4) پنل مدیر
`https://USERNAME.github.io/REPOSITORY/?admin=1`
با حسابی که در Supabase ساخته‌ای وارد شو.

## داده‌های ذخیره‌شده
انتخاب هر مرحله، مسیر عکس‌های A/B، نوع دستگاه، User-Agent، زبان مرورگر، timezone، اندازه viewport و screen، DPR و زمان ثبت.
