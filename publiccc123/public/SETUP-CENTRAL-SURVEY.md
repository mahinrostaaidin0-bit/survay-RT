# راه‌اندازی ثبت مرکزی نظرسنجی

## 1) Supabase
1. در Supabase یک پروژه بسازید.
2. SQL Editor را باز کنید.
3. کل محتوای `SUPABASE_SETUP.sql` را اجرا کنید.
4. در Authentication > Users یک کاربر برای خودتان بسازید (ایمیل + رمز). این حساب فقط برای پنل ادمین است.
5. از Project Settings > API Keys، Project URL و Publishable/anon key را بردارید.
6. آنها را در `js/supabase-config.js` قرار دهید.
7. هرگز `service_role` یا Secret key را داخل فایل سایت قرار ندهید.

## 2) اجرای بدون Node
این پروژه برای دریافت پاسخ دیگر به `server/server.js` وابسته نیست. بعد از تنظیم Supabase، فقط فایل‌های پوشه `public` را روی یک هاست استاتیک قرار دهید.

## 3) GitHub Pages
کل محتوای `public` را داخل یک repository قرار دهید و Pages را روی branch اصلی و root فعال کنید.

## 4) لینک‌ها
- پاسخ‌دهندگان: لینک اصلی سایت
- ادمین: همان لینک + `?admin=1`

## 5) داده‌های ثبت‌شده
برای هر پاسخ: زمان، انتخاب هر مرحله، دستگاه mobile/desktop، user-agent، platform، زبان مرورگر، timezone، اندازه صفحه، viewport، DPR، touch points، referrer و URL ثبت می‌شود.

نکته: اطلاعات دستگاهی که مرورگر در اختیار صفحه قرار می‌دهد ۱۰۰٪ تضمین‌کننده مدل دقیق دستگاه یا سیستم‌عامل نیست، چون مرورگرها ممکن است User-Agent را محدود یا کاهش دهند.
