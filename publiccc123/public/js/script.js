/* Central survey version: Supabase + browser metadata + admin login. */
const ADMIN_T={
 fa:{empty:"هنوز پاسخی ثبت نشده.",device_mobile:"موبایل",device_desktop:"دسکتاپ",locale:"fa-IR"},
 en:{empty:"No responses saved yet.",device_mobile:"Mobile",device_desktop:"Desktop",locale:"en-US"},
 ar:{empty:"لا توجد إجابات محفوظة بعد.",device_mobile:"جوال",device_desktop:"سطح المكتب",locale:"ar-EG"}
};
function currentLang(){
  const en=document.getElementById('langEn'), ar=document.getElementById('langAr');
  if(en||ar){ if(en&&en.checked)return'en'; if(ar&&ar.checked)return'ar'; return'fa'; }
  const l=document.documentElement.lang; return l==='en'||l==='ar'?l:'fa';
}
const answers={};
function imageFor(card){ const img=card?.querySelector('img'); return img ? img.getAttribute('src') : null; }
function setAnswer(p,a,b,selectedSide=null){
  const cards=[...document.querySelectorAll('.card-img[data-page="'+p+'"]')];
  answers[p]={a:!!a,b:!!b,imageA:imageFor(cards[0]),imageB:imageFor(cards[1]),selected:selectedSide};
  cards.forEach(c=>c.classList.toggle('sel',(c.dataset.side==='a'&&a)||(c.dataset.side==='b'&&b)));
}
document.querySelectorAll('.pick-btn').forEach(btn=>btn.addEventListener('click',()=>{const c=btn.closest('.card-img');setAnswer(+c.dataset.page,c.dataset.side==='a',c.dataset.side==='b',c.dataset.side);}));
document.querySelectorAll('.neither,.both').forEach(el=>el.addEventListener('click',()=>{const p=+el.dataset.page;setAnswer(p,el.dataset.a==='1',el.dataset.b==='1',el.classList.contains('both')?'both':'none');}));
const start=document.getElementById('startLabel');
if(start) start.addEventListener('click',()=>{Object.keys(answers).forEach(k=>delete answers[k]);document.querySelectorAll('.card-img.sel').forEach(el=>el.classList.remove('sel'));const s=document.getElementById('step1');if(s)s.checked=true;});
function detectDevice(){const ua=navigator.userAgent||'';if(/iPad|Tablet|Android(?!.*Mobile)|Kindle|Silk/i.test(ua))return'tablet';if(/Mobi|Android|iPhone|iPod/i.test(ua))return'mobile';return'desktop';}
function metadata(){return {device:detectDevice(),device_details:{touchPoints:navigator.maxTouchPoints||0,platform:navigator.platform||'',vendor:navigator.vendor||'',dpr:window.devicePixelRatio||1,online:navigator.onLine},user_agent:navigator.userAgent,language:navigator.language||'',timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'',viewport_width:innerWidth,viewport_height:innerHeight,screen_width:screen.width,screen_height:screen.height,referrer:document.referrer||''};}
function sb(){ if(!window.supabase||!window.SUPABASE_URL||window.SUPABASE_URL.startsWith('YOUR_')) return null; return window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_PUBLISHABLE_KEY); }
const supa=sb();
const finish=document.getElementById('finishBtn');
if(finish) finish.addEventListener('click',async()=>{
  if(!supa){alert('اتصال پایگاه داده هنوز تنظیم نشده است.');return;}
  finish.disabled=true;
  const m=metadata();
  const payload={survey_id:'visual-taste-v1',device:m.device,device_details:m.device_details,answers:JSON.parse(JSON.stringify(answers)),user_agent:m.user_agent,language:m.language,timezone:m.timezone,viewport_width:m.viewport_width,viewport_height:m.viewport_height,screen_width:m.screen_width,screen_height:m.screen_height,referrer:m.referrer};
  const {error}=await supa.from('survey_responses').insert(payload);
  finish.disabled=false;
  if(error){console.error(error);alert('ثبت پاسخ انجام نشد. لطفاً اتصال اینترنت را بررسی کنید.');return;}
  const thanks=document.getElementById('thanks');if(thanks)thanks.hidden=false;
});
const back=document.getElementById('backBtn');
if(back) back.addEventListener('click',()=>{const t=document.getElementById('thanks');if(t)t.hidden=true;const h=document.getElementById('viewHero');if(h)h.checked=true;});

function adminMarkup(){
  const sec=document.getElementById('adminview'); if(!sec)return;
  if(!document.getElementById('adminLoginBox')){
    sec.insertAdjacentHTML('afterbegin',`<div id="adminLoginBox" class="no-print" style="margin:16px 0;padding:16px;border:1px solid #444;border-radius:12px;max-width:520px"><h3>ورود مدیر</h3><input id="adminEmail" type="email" placeholder="ایمیل ادمین" style="display:block;width:100%;padding:10px;margin:8px 0"><input id="adminPassword" type="password" placeholder="رمز عبور" style="display:block;width:100%;padding:10px;margin:8px 0"><button class="home-btn" id="adminLoginBtn">ورود</button><button class="home-btn" id="adminLogoutBtn" style="display:none">خروج</button><p id="adminLoginStatus"></p></div>`);
    document.getElementById('adminLoginBtn').onclick=adminLogin;
    document.getElementById('adminLogoutBtn').onclick=async()=>{await supa?.auth.signOut();renderAdmin();};
  }
}
async function adminLogin(){const email=document.getElementById('adminEmail').value.trim(),password=document.getElementById('adminPassword').value;const st=document.getElementById('adminLoginStatus');if(!supa){st.textContent='Supabase config تنظیم نشده.';return;}const {error}=await supa.auth.signInWithPassword({email,password});st.textContent=error?error.message:'ورود موفق بود.';if(!error)await renderAdmin();}
function choicesStr(ans,lang){const out=[];for(let p=1;p<=10;p++){const v=(ans&&ans[p])||{};out.push(v.a&&v.b?'هر دو':v.a?'A':v.b?'B':'—');}return out.join(' / ');}
async function renderAdmin(){
 if(new URLSearchParams(location.search).get('admin')!=='1')return;
 ['hero','survey','about'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none';});
 const av=document.getElementById('adminview');if(av)av.style.display='block';adminMarkup();
 const {data:{session}}=supa?await supa.auth.getSession():{data:{session:null}};
 const box=document.getElementById('adminLoginBox'), login=document.getElementById('adminLoginBtn'), logout=document.getElementById('adminLogoutBtn');
 if(!session){if(login)login.style.display='inline-block';if(logout)logout.style.display='none';document.getElementById('adminTable').style.display='none';document.getElementById('adminStatus').textContent='برای دیدن پاسخ‌ها وارد حساب مدیر شوید.';return;}
 if(login)login.style.display='none';if(logout)logout.style.display='inline-block';
 const {data,error}=await supa.from('survey_responses').select('*').order('id',{ascending:false});
 if(error){document.getElementById('adminStatus').textContent=error.message;return;}
 document.getElementById('adminStatus').textContent=`تعداد پاسخ‌ها: ${data.length}`;
 const tbody=document.getElementById('adminBody');tbody.innerHTML='';
 data.forEach((r,i)=>{const tr=document.createElement('tr');const d=r.device==='mobile'?'موبایل':r.device==='tablet'?'تبلت':'دسکتاپ';const vals=[i+1,new Date(r.created_at).toLocaleString(ADMIN_T[currentLang()].locale),d,choicesStr(r.answers,currentLang()),r.language,r.viewport_width+'×'+r.viewport_height];vals.forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.appendChild(td);});tbody.appendChild(tr);});
 document.getElementById('adminTable').style.display=data.length?'table':'none';
 window.__surveyRows=data;
}
const exportBtn=document.getElementById('exportBtn');
if(exportBtn)exportBtn.addEventListener('click',()=>{const rows=window.__surveyRows||[];const blob=new Blob([JSON.stringify(rows,null,2)],{type:'application/json;charset=utf-8'});const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='survey-responses.json';a.click();URL.revokeObjectURL(u);});
const clearBtn=document.getElementById('clearBtn');
if(clearBtn)clearBtn.addEventListener('click',async()=>{if(!supa)return;if(confirm('همه پاسخ‌های مرکزی حذف شوند؟')){const {error}=await supa.from('survey_responses').delete().neq('id',0);if(error)alert(error.message);else renderAdmin();}});
const printBtn=document.getElementById('printBtn');if(printBtn)printBtn.addEventListener('click',()=>window.print());
adminMarkup();renderAdmin();
