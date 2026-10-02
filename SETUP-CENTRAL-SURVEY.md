# راه‌اندازی ثبت مرکزی نظرسنجی

راهنمای کامل مراحل در `DEPLOY.md` است. خلاصه:

1. پروژه‌ی Supabase بساز و `SUPABASE_SETUP.sql` را در SQL Editor اجرا کن.
2. در Authentication > Users یک کاربر ادمین بساز.
3. Project URL و Publishable/anon key را در `supabase-config.js` بگذار.
4. `service_role` / Secret key را هرگز داخل سایت نگذار.
5. همه‌ی فایل‌ها را در ریشه‌ی GitHub repository آپلود کن و Pages را روی main / root فعال کن.

## لینک‌ها
- پاسخ‌دهندگان: لینک اصلی سایت
- ادمین: همان لینک + `?admin=1`

## داده‌های ثبت‌شده
زمان، انتخاب هر مرحله، دستگاه mobile/desktop، user-agent، platform، زبان مرورگر، timezone، اندازه صفحه، viewport، DPR، touch points، referrer و URL.

نکته: مرورگرها ممکن است User-Agent را محدود کنند، پس مدل دقیق دستگاه/سیستم‌عامل ۱۰۰٪ تضمین نیست.
