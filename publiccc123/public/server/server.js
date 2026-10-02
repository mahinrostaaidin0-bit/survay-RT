/* =====================================================================
   بک‌اند نمونه برای نظرسنجی — Node.js + Express + SQLite
   کارش: گرفتن پاسخ‌های نظرسنجی از هر کسی (هر دستگاه، هر مرورگر) و
   ذخیره‌شون در یک فایل دیتابیس واحد روی سرور (survey.db) تا همه‌ی
   پاسخ‌ها یک‌جا جمع بشن — چیزی که localStorage نمی‌تونست انجام بده.

   اجرا:
     1) npm install
     2) npm start
   سرور روی http://localhost:3000 بالا میاد.
===================================================================== */

const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors());               // اجازه می‌ده سایتت (روی هر دامنه‌ای) به این سرور درخواست بزنه
app.use(express.json());       // خوندن بدنه‌ی JSON درخواست‌ها

// --- دیتابیس: یک فایل ساده کنار همین اسکریپت، بدون نیاز به نصب دیتابیس جداگانه ---
const db = new Database(path.join(__dirname, 'survey.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    device TEXT NOT NULL,
    answers TEXT NOT NULL
  )
`);

// ثبت یک پاسخ جدید (این سایت باید بهش POST بزنه)
app.post('/api/responses', (req, res) => {
  const { device, answers } = req.body || {};
  if (!answers) return res.status(400).json({ error: 'answers لازم است' });
  const stmt = db.prepare('INSERT INTO responses (created_at, device, answers) VALUES (?, ?, ?)');
  const info = stmt.run(new Date().toISOString(), device || 'unknown', JSON.stringify(answers));
  res.json({ ok: true, id: info.lastInsertRowid });
});

// گرفتن همه‌ی پاسخ‌ها (پنل ادمین این رو صدا می‌زنه)
app.get('/api/responses', (req, res) => {
  const rows = db.prepare('SELECT id, created_at, device, answers FROM responses ORDER BY id DESC').all();
  res.json(rows.map(r => ({ ...r, answers: JSON.parse(r.answers) })));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`سرور بالا اومد: http://localhost:${PORT}`));
