/* app.js */
const ICONS = {
  discord:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>`,
  instagram:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  tiktok:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.35a8.16 8.16 0 0 0 4.77 1.52V7.43a4.85 4.85 0 0 1-1-.74z"/></svg>`,
  youtube:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  github:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  twitter:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>`,
  steam:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.606 0 11.979 0z"/></svg>`,
  twitch:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>`,
};
const BADGE_SVG = {
  shield:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/></svg>`,
  star:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  bolt:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  crown:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v2H2v-2zM4 17l4-8 4 4 4-6 4 10H4z"/></svg>`,
  diamond:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9l10 13L22 9 12 2zm0 3.5L19 9l-7 9.1L5 9l7-3.5z"/></svg>`,
};

/* ── Nav & Sidebar ── */
let _currentTab = 'profile';

function scrollToSection(name) {
  const el = document.getElementById('section-' + name);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActiveTab(name);
  if (name === 'calc') setTimeout(() => renderCalcPage(), 300);
  // close sidebar on mobile
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sb-overlay');
  if (sb && sb.classList.contains('open')) {
    sb.classList.remove('open');
    ov.classList.remove('open');
  }
}

function setActiveTab(name) {
  document.querySelectorAll('.sb-item').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('tab-' + name);
  if (btn) btn.classList.add('active');
  _currentTab = name;
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sb-overlay');
  sb.classList.toggle('open');
  ov.classList.toggle('open');
}

function initScrollSpy() {
  const sections = ['profile', 'calc', 'smart', 'quick', 'inventory'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const name = e.target.id.replace('section-', '');
        setActiveTab(name);
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(name => {
    const el = document.getElementById('section-' + name);
    if (el) observer.observe(el);
  });
}

/* ── Theme Switcher ── */
const THEMES = [
  { id:'crimson', color:'#dc2626' }, { id:'rose',    color:'#f43f5e' },
  { id:'orange',  color:'#f97316' }, { id:'amber',   color:'#f59e0b' },
  { id:'gold',    color:'#eab308' }, { id:'yellow',  color:'#facc15' },
  { id:'mint',    color:'#34d399' }, { id:'cobalt',  color:'#3b82f6' },
  { id:'violet',  color:'#8b5cf6' }, { id:'silver',  color:'#94a3b8' },
  { id:'mocha',   color:'#a0785a' },
];
const THEME_KEY = 'blahexm_theme';

function applyTheme(id) {
  document.documentElement.setAttribute('data-theme', id);
  localStorage.setItem(THEME_KEY, id);
  // update active dot
  document.querySelectorAll('.theme-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.theme === id);
  });
}

function buildThemeGrids() {
  const savedTheme = localStorage.getItem(THEME_KEY) || C.theme || 'rose';
  ['theme-grid', 'mob-theme-grid'].forEach(gid => {
    const g = document.getElementById(gid);
    if (!g) return;
    g.innerHTML = '';
    THEMES.forEach(t => {
      const d = document.createElement('div');
      d.className = 'theme-dot' + (t.id === savedTheme ? ' active' : '');
      d.dataset.theme = t.id;
      d.style.background = t.color;
      d.title = t.id;
      d.onclick = () => { applyTheme(t.id); closeMobThemePanel(); };
      g.appendChild(d);
    });
  });
  applyTheme(savedTheme);
}

function toggleThemePanel() {
  const p = document.getElementById('mob-theme-panel');
  if (!p) return;
  p.style.display = p.style.display === 'none' ? 'block' : 'none';
}
function closeMobThemePanel() {
  const p = document.getElementById('mob-theme-panel');
  if (p) p.style.display = 'none';
}

/* ── Badge ── */
function renderBadge() {
  const el = document.getElementById('badge');
  if (!el || !C.badge || C.badge === false) { if(el) el.style.display='none'; return; }
  if (C.badge==='fire')   { el.className='badge emoji'; el.textContent='🔥'; return; }
  if (C.badge==='custom') { el.className='badge emoji'; el.textContent=C.badgeCustom||'⭐'; return; }
  const svg = BADGE_SVG[C.badge];
  if (svg) { el.className='badge'; el.innerHTML=svg; }
}

/* ── Status ── */
function applyStatus(s) {
  const dot=document.getElementById('status-dot');
  const lbl=document.getElementById('status-label');
  const txt=document.getElementById('status-text');
  if (dot) dot.className=`status-dot ${s}`;
  if (lbl) lbl.className=`status-label ${s}`;
  if (txt) txt.textContent=C.manualStatusText||({online:'Online',idle:'Idle',dnd:'Do Not Disturb',offline:'Offline'}[s]||s);
}

/* ── Lanyard ── */
async function fetchLanyard() {
  if (!C.discordId) { applyStatus(C.manualStatus); return; }
  try {
    const j = await (await fetch(`https://api.lanyard.rest/v1/users/${C.discordId}`)).json();
    if (!j.success) throw 0;
    const d=j.data, s=d.discord_status||'offline';
    applyStatus(s);
    let src=C.avatarUrl;
    if (!src&&d.discord_user?.avatar)
      src=`https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png?size=128`;
    if (src) document.getElementById('avatar').src=src;
    const actEl=document.getElementById('activity');
    let act=null;
    if (d.listening_to_spotify&&d.spotify)
      act={icon:'🎵',type:'Spotify',detail:`${d.spotify.song} · ${d.spotify.artist}`};
    else { const a=d.activities?.find(x=>x.type===0); if(a) act={icon:'🎮',type:'Playing',detail:a.name+(a.details?` — ${a.details}`:'')}; }
    if (actEl) {
      if (act) {
        document.getElementById('activity-icon').textContent=act.icon;
        document.getElementById('activity-type').textContent=act.type;
        document.getElementById('activity-detail').textContent=act.detail;
        actEl.classList.add('show');
      } else actEl.classList.remove('show');
    }
  } catch { applyStatus(C.manualStatus); }
}

/* ── Music ── */
let _aud;
function toggleMusic() {
  if (!_aud) _aud=document.getElementById('audio');
  const pi=document.getElementById('play-icon'),pa=document.getElementById('pause-icon');
  const vz=document.getElementById('music-viz');
  if (_aud.paused) {
    if (!C.music.url) { alert('ใส่ URL เพลงใน config.js ก่อน!'); return; }
    _aud.play();
    pi.style.display='none'; pa.style.display='block'; vz.classList.remove('paused');
  } else {
    _aud.pause();
    pi.style.display='block'; pa.style.display='none'; vz.classList.add('paused');
  }
}

function buildMusicGrid() {
  const grid=document.getElementById('music-grid');
  if (!grid) return;
  if (!C.favMusic||C.favMusic.length===0) {
    grid.innerHTML=`<div class="music-empty">ยังไม่มีเพลง<br><span style="opacity:.5">เพิ่มลิงก์ใน config.js → favMusic</span></div>`;
    return;
  }
  grid.innerHTML='';
  C.favMusic.forEach(url=>{
    if (!url) return;
    const card=document.createElement('div'); card.className='music-embed-card';
    const sp=url.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
    if (sp) { card.innerHTML=`<iframe src="https://open.spotify.com/embed/${sp[1]}/${sp[2]}?utm_source=generator&theme=0" height="80" allow="autoplay;clipboard-write;encrypted-media;fullscreen;picture-in-picture" loading="lazy"></iframe>`; grid.appendChild(card); return; }
    const yt=url.match(/(?:youtu\.be\/|[?&]v=)([a-zA-Z0-9_-]{11})/);
    if (yt) { card.innerHTML=`<iframe src="https://www.youtube.com/embed/${yt[1]}" height="180" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen loading="lazy"></iframe>`; grid.appendChild(card); }
  });
}

/* ── Cursor ── */
function initCursor() {
  if (!window.matchMedia('(hover:hover)').matches) return;
  const cur=document.getElementById('cursor'),trl=document.getElementById('cursor-trail');
  if (!cur||!trl) return;
  let tx=0,ty=0,mx=0,my=0;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
  setInterval(()=>{ tx+=(mx-tx)*.14; ty+=(my-ty)*.14; trl.style.left=tx+'px'; trl.style.top=ty+'px'; },16);
}

/* ── Security ── */
function initSecurity() {
  document.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('keydown',e=>{
    if (e.key==='F12'||(e.ctrlKey&&e.shiftKey&&'IJC'.includes(e.key.toUpperCase()))||(e.ctrlKey&&e.key.toUpperCase()==='U'))
      e.preventDefault();
  });
}


/* ── Size Scale ── */
const SCALE_KEY = 'blahexm_scale';

function applyScale(val) {
  const pct = parseInt(val);
  document.documentElement.style.setProperty('--scale', pct / 100);
  localStorage.setItem(SCALE_KEY, pct);
  const label = document.getElementById('size-val');
  if (label) label.textContent = pct + '%';
  const slider = document.getElementById('size-slider');
  if (slider) slider.value = pct;
}

function initScale() {
  const saved = parseInt(localStorage.getItem(SCALE_KEY)) || 100;
  applyScale(saved);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', C.theme);
  document.title = C.name;
  document.getElementById('profile-name').textContent = C.name;
  document.getElementById('profile-bio').textContent  = C.bio || '';
  document.getElementById('footer-text').textContent  = C.footerText;
  if (C.avatarUrl) document.getElementById('avatar').src = C.avatarUrl;

  renderBadge();

  const sc = document.getElementById('socials');
  C.socials.forEach(s => {
    if (!s.on || !s.url) return;
    const a = document.createElement('a');
    a.className='btn'; a.href=s.url; a.target='_blank'; a.rel='noopener';
    a.innerHTML=`${ICONS[s.id]||''}<span class="btn-label">${s.label}</span><span class="btn-arrow">→</span>`;
    sc.appendChild(a);
  });

  if (!C.music.on) { document.getElementById('music-bar').style.display='none'; }
  else {
    document.getElementById('music-title').textContent  = C.music.title  || '—';
    document.getElementById('music-artist').textContent = C.music.artist || '';
    if (C.music.url) document.getElementById('audio').src = C.music.url;
  }

  // Apply saved theme
  buildThemeGrids();

  // Update sidebar user info
  const sbName = document.getElementById('sb-user-name');
  const sbStatus = document.getElementById('sb-user-status');
  if (sbName) sbName.textContent = C.name;
  if (sbStatus) sbStatus.textContent = C.manualStatusText || '—';
  if (C.avatarUrl) {
    const sbAv = document.getElementById('sb-avatar');
    if (sbAv) sbAv.src = C.avatarUrl;
  }

  initScale();
  initCursor();
  initSecurity();
  initScrollSpy();
  fetchLanyard();
  setInterval(fetchLanyard, 12000);
  renderCalcPage();

  const qcWrap = document.getElementById('quick-calc-inner');
  if (qcWrap) renderQuickCalc(qcWrap);
  startSbInventory();
});
/* ══════════════════════════════════════
   FINANCE TRACKER — Supabase sync
══════════════════════════════════════ */
// PIN is now in config.js → C.financePin
const SESSION_KEY = 'blahexm_auth';
const SB_URL      = 'https://zwavwijmgjgpaembmpnl.supabase.co';
const SB_KEY      = 'sb_publishable_3h62iooez-XuZR9DAuspbw_blEOj2zl';
const _sb         = window.supabase.createClient(SB_URL, SB_KEY);

let _financeUnlocked = false;

/* ── Supabase helpers ── */
async function financeLoad() {
  const { data } = await _sb.from('finance').select('*');
  const result = {};
  (data || []).forEach(row => { result[row.date] = { total: row.total, logs: row.logs || [] }; });
  return result;
}
async function financeSaveDay(date, total, logs) {
  await _sb.from('finance').upsert({ date, total, logs, updated_at: new Date().toISOString() }, { onConflict: 'date' });
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getLast7Keys() {
  const keys = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    keys.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
  }
  return keys;
}
function fmtMoney(n) {
  return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ── Auth ── */
function financeCheckSession() { return sessionStorage.getItem(SESSION_KEY) === '1'; }
function financeSetSession()   { sessionStorage.setItem(SESSION_KEY, '1'); }

function showTab(name) { scrollToSection(name); }

/* ── Main render ── */
function renderCalcPage() {
  const wrap = document.getElementById('calc-inner');
  if (!wrap) return;
  if (financeCheckSession()) {
    renderFinanceDashboard(wrap);
  } else {
    renderFinanceLock(wrap);
  }
}

/* ── Lock screen ── */
function renderFinanceLock(wrap) {
  wrap.innerHTML = `
    <div class="fin-lock">
      <div class="fin-lock-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div class="fin-lock-title">finance</div>
      <div class="fin-lock-sub">enter password to continue</div>
      <input class="fin-pin-input" id="fin-pin-input" type="password"
        placeholder="••••••••" autocomplete="off" spellcheck="false"
        oninput="finPinInput(this)" onkeydown="if(event.key==='Enter')finPinSubmit()" />
      <div class="fin-pin-err" id="fin-pin-err"></div>
    </div>
  `;
  setTimeout(() => document.getElementById('fin-pin-input')?.focus(), 100);
}

function finPinInput(el) {
  document.getElementById('fin-pin-err').textContent = '';
  el.style.borderColor = '';
}

function finPinSubmit() {
  const val = document.getElementById('fin-pin-input')?.value || '';
  if (val === (C.financePin || 'blahexm')) {
    financeSetSession();
    _financeUnlocked = true;
    renderFinanceDashboard(document.getElementById('calc-inner'));
  } else {
    const inp = document.getElementById('fin-pin-input');
    const err = document.getElementById('fin-pin-err');
    if (inp) { inp.value = ''; inp.style.borderColor = 'rgba(244,63,94,.5)'; inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 400); }
    if (err) err.textContent = 'wrong password';
  }
}

/* ── Dashboard ── */
async function renderFinanceDashboard(wrap) {
  wrap.innerHTML = `<div class="fin-loading">loading...</div>`;
  const data   = await financeLoad();
  const today  = todayKey();
  const todayD = data[today] || { total: 0, logs: [] };
  const keys   = getLast7Keys();

  let weekTotal = 0;
  keys.forEach(k => { weekTotal += (data[k]?.total || 0); });

  const vals   = keys.map(k => data[k]?.total || 0);
  const maxVal = Math.max(...vals, 1);
  const barHTML = keys.map((k, i) => {
    const v   = vals[i];
    const pct = Math.max(4, Math.round((v / maxVal) * 100));
    const isT = k === today;
    const lbl = k.slice(8);
    return `<div class="fin-bar-col">
      <div class="fin-bar-amt">${v > 0 ? '+'+fmtMoney(v) : ''}</div>
      <div class="fin-bar-wrap">
        <div class="fin-bar-fill ${isT?'today':''}" style="height:${pct}%"></div>
      </div>
      <div class="fin-bar-lbl ${isT?'today':''}">${lbl}</div>
    </div>`;
  }).join('');

  const logs    = (todayD.logs || []).slice(-5).reverse();
  const logHTML = logs.length === 0
    ? `<div class="fin-empty-log">ยังไม่มีรายการวันนี้</div>`
    : logs.map(l => `
      <div class="fin-log-row">
        <span class="fin-log-dot ${l.amount>=0?'pos':'neg'}"></span>
        <span class="fin-log-note">${l.note || (l.amount>=0?'รายรับ':'รายจ่าย')}</span>
        <span class="fin-log-time">${l.time}</span>
        <span class="fin-log-amt ${l.amount>=0?'pos':'neg'}">${l.amount>=0?'+':''}${fmtMoney(l.amount)}฿</span>
      </div>`).join('');

  wrap.innerHTML = `
    <div class="fin-totals">
      <div class="fin-total-card main">
        <div class="fin-total-label">วันนี้</div>
        <div class="fin-total-val">${todayD.total>=0?'+':''}${fmtMoney(todayD.total)}฿</div>
      </div>
      <div class="fin-total-card">
        <div class="fin-total-label">7 วัน</div>
        <div class="fin-total-val sm">${weekTotal>=0?'+':''}${fmtMoney(weekTotal)}฿</div>
      </div>
    </div>
    <div class="fin-section-label">รายวัน (7 วัน)</div>
    <div class="fin-chart">${barHTML}</div>
    <div class="fin-input-row">
      <input class="fin-amount-input" id="fin-amount" type="number"
        placeholder="+200 หรือ -50" step="any"
        onkeydown="if(event.key==='Enter')finAddEntry()" />
      <input class="fin-note-input" id="fin-note" type="text"
        placeholder="หมายเหตุ (optional)"
        onkeydown="if(event.key==='Enter')finAddEntry()" />
      <button class="fin-add-btn" onclick="finAddEntry()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
    <div class="fin-section-label" style="margin-top:14px">รายการล่าสุด</div>
    <div class="fin-logs" id="fin-logs">${logHTML}</div>
    <div class="fin-foot-actions">
      <button class="fin-undo-btn" onclick="finUndo()">↩ ย้อนกลับ</button>
      <button class="fin-lock-btn" onclick="finLock()">🔒 ล็อค</button>
    </div>
  `;
}

/* ── Actions ── */
async function finAddEntry() {
  const amtEl  = document.getElementById('fin-amount');
  const noteEl = document.getElementById('fin-note');
  const amt    = parseFloat(amtEl?.value);
  if (isNaN(amt) || amt === 0) { amtEl?.classList.add('shake'); setTimeout(()=>amtEl?.classList.remove('shake'),400); return; }
  const note = noteEl?.value?.trim() || '';
  const time = new Date().toLocaleTimeString('th-TH', { hour:'2-digit', minute:'2-digit' });
  const today = todayKey();
  const data  = await financeLoad();
  if (!data[today]) data[today] = { total: 0, logs: [] };
  data[today].total += amt;
  data[today].logs.push({ amount: amt, note, time });
  await financeSaveDay(today, data[today].total, data[today].logs);
  if (amtEl)  amtEl.value  = '';
  if (noteEl) noteEl.value = '';
  renderFinanceDashboard(document.getElementById('calc-inner'));
}

async function finUndo() {
  const today = todayKey();
  const data  = await financeLoad();
  if (!data[today]?.logs?.length) return;
  const last = data[today].logs.pop();
  data[today].total -= last.amount;
  await financeSaveDay(today, data[today].total, data[today].logs);
  renderFinanceDashboard(document.getElementById('calc-inner'));
}

function finLock() {
  sessionStorage.removeItem(SESSION_KEY);
  _financeUnlocked = false;
  renderFinanceLock(document.getElementById('calc-inner'));
}

/* ══════════════════════════════════════
   SMART CALCULATOR
══════════════════════════════════════ */
// เรทเริ่มต้น — divisor คือจำนวนของ ÷ divisor = ราคา฿
const SMART_RATES_DEFAULT = {
  'Aura Crate':     { divisor: 0.3,    emoji: '📦', img: 'img/items/aura-crate.png',     multiply: true },
  'Cosmetic Crate': { divisor: 0.1,    emoji: '🎁', img: 'img/items/cosmetic-crate.png', multiply: true },
  'Clan Reroll':    { divisor: 700,    emoji: '⚔️', img: 'img/items/clan-reroll.png' },
  'Mythical Chest': { divisor: 400,    emoji: '🏆', img: 'img/items/mythical-chest.png' },
  'Power Shard':    { divisor: 1500,   emoji: '🔷', img: 'img/items/power-shard.png' },
  'Upper Seal':     { divisor: 1500,   emoji: '🔱', img: 'img/items/upper-seal.png' },
  'Race Reroll':    { divisor: 20000,  emoji: '🐉', img: 'img/items/race-reroll.png' },
  'Trait Reroll':   { divisor: 20000,  emoji: '💎', img: 'img/items/trait-reroll.png' },
  'Passive Shard':  { divisor: 0,      emoji: '🔮', img: 'img/items/passive-shard.png' },
};
const SMART_RATES_KEY = 'blahexm_rates';

function loadRates() {
  try {
    const saved = JSON.parse(localStorage.getItem(SMART_RATES_KEY));
    if (saved) return saved;
  } catch {}
  return JSON.parse(JSON.stringify(SMART_RATES_DEFAULT));
}
function saveRates(rates) {
  localStorage.setItem(SMART_RATES_KEY, JSON.stringify(rates));
}
let SMART_RATES = loadRates();


function parseSmartText(text) {
  const results = {};
  const lines   = text.split('\n').map(l => l.trim()).filter(Boolean);
  const knownNames = Object.keys(SMART_RATES_DEFAULT);

  // Strategy 1: NamexNUMBER on same line e.g. "Race Rerollx8227136"
  // Strategy 2: Name on one line, xNUMBER on next line
  // Strategy 3: Name repeated then xNUMBER (copy-paste artifact)

  function fuzzyMatch(raw) {
    const r = raw.toLowerCase().replace(/\s+/g,' ').trim();
    return knownNames.find(k => {
      const kl = k.toLowerCase();
      if (kl === r) return true;
      // partial: all words of key appear in raw
      const words = kl.split(' ');
      return words.every(w => r.includes(w));
    });
  }

  // Pass 1: same-line NamexNUM
  const usedLines = new Set();
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(.+?)x(\d+)$/i);
    if (!m) continue;
    const matched = fuzzyMatch(m[1]);
    if (matched) {
      results[matched] = (results[matched] || 0) + parseInt(m[2]);
      usedLines.add(i);
    }
  }

  // Pass 2: Name line followed by xNUMBER line (possibly with duplicate name in between)
  for (let i = 0; i < lines.length; i++) {
    if (usedLines.has(i)) continue;
    const matched = fuzzyMatch(lines[i]);
    if (!matched) continue;
    // Look ahead up to 3 lines for xNUMBER
    for (let j = i+1; j < Math.min(i+4, lines.length); j++) {
      if (usedLines.has(j)) continue;
      const m = lines[j].match(/^x(\d+)$/i);
      if (m) {
        results[matched] = (results[matched] || 0) + parseInt(m[1]);
        usedLines.add(i); usedLines.add(j);
        break;
      }
    }
  }

  return results;
}

function smartCalc() {
  const text   = document.getElementById('smart-input')?.value || '';
  const result = document.getElementById('smart-result');
  if (!result) return;
  if (!text.trim()) { result.innerHTML = ''; return; }

  const parsed = parseSmartText(text);
  if (Object.keys(parsed).length === 0) {
    result.innerHTML = '<div class="smart-empty">ไม่พบของที่รู้จัก — ลองแปะข้อความใหม่</div>';
    return;
  }

  let grand = 0;
  const rows = Object.entries(parsed).map(([name, qty]) => {
    const rate   = SMART_RATES[name];
    const def    = SMART_RATES_DEFAULT[name];
    const imgSrc = def?.img || '';
    const emoji  = def?.emoji || '📦';
    if (!rate || rate.divisor === 0) return null;
    const val = rate.multiply ? qty * rate.divisor : qty / rate.divisor;
    grand += val;
    const iconHtml = imgSrc
      ? `<img class="item-icon" src="${imgSrc}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span class="smart-emoji" style="display:none">${emoji}</span>`
      : `<span class="smart-emoji">${emoji}</span>`;
    return `<div class="smart-row">
      <span class="smart-icon-wrap">${iconHtml}</span>
      <span class="smart-name">${name}</span>
      <span class="smart-qty">${qty.toLocaleString('th-TH')}</span>
      <span class="smart-val">${val.toLocaleString('th-TH', {minimumFractionDigits:2,maximumFractionDigits:2})}฿</span>
    </div>`;
  }).filter(Boolean);

  result.innerHTML = `
    <div class="smart-rows">${rows.join('')}</div>
    <div class="smart-total">
      <span>รวมทั้งหมด</span>
      <span class="smart-total-val">${grand.toLocaleString('th-TH', {minimumFractionDigits:2,maximumFractionDigits:2})}฿</span>
    </div>
    <div class="smart-btn-row">
      <button class="smart-copy-btn" onclick="smartCopy(${grand.toFixed(2)})">copy ยอดรวม</button>
    </div>
  `;
}

function smartCopy(val) {
  navigator.clipboard.writeText(val.toFixed(2)).catch(()=>{});
  const btn = document.querySelector('.smart-copy-btn');
  if (btn) { btn.textContent = 'copied! ✓'; setTimeout(()=>{ btn.textContent = 'copy ยอดรวม'; }, 1500); }
}


function renderRateSettings(panel) {
  const rates = loadRates();
  const rows = Object.entries(SMART_RATES_DEFAULT)
    .filter(([, v]) => v.divisor > 0)
    .map(([name, def]) => {
      const cur = rates[name]?.divisor ?? def.divisor;
      const id  = 'rate_' + name.replace(/\s/g,'_');
      const op  = def.multiply
        ? '<span class="rate-op multiply">× คูณ</span>'
        : '<span class="rate-op divide">÷ หาร</span>';
      const iconHtml = def.img
        ? `<img class="item-icon" src="${def.img}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span class="rate-emoji" style="display:none">${def.emoji}</span>`
        : `<span class="rate-emoji">${def.emoji}</span>`;
      return `<div class="rate-row">
        <span class="rate-icon-wrap">${iconHtml}</span>
        <span class="rate-name">${name}</span>
        ${op}
        <input class="rate-input" id="${id}" type="number" value="${cur}" step="any" min="0"/>
      </div>`;
    }).join('');

  panel.innerHTML = `
    <div class="rate-title">แก้เรท</div>
    <div class="rate-rows">${rows}</div>
    <div class="rate-actions">
      <button class="rate-save-btn" onclick="saveRateSettings()">💾 บันทึก</button>
      <button class="rate-reset-btn" onclick="resetRateSettings()">↺ reset</button>
    </div>
    <div class="rate-msg" id="rate-msg"></div>
  `;
}

function saveRateSettings() {
  const rates = loadRates();
  Object.entries(SMART_RATES_DEFAULT).filter(([,v])=>v.divisor>0).forEach(([name]) => {
    const id  = 'rate_' + name.replace(/\s/g,'_');
    const el  = document.getElementById(id);
    const val = parseFloat(el?.value);
    if (!isNaN(val) && val > 0) rates[name] = { ...(rates[name]||{}), divisor: val };
  });
  saveRates(rates);
  SMART_RATES = rates;
  const msg = document.getElementById('rate-msg');
  if (msg) { msg.textContent = '✓ บันทึกแล้ว'; setTimeout(()=>{ msg.textContent=''; }, 1500); }
  smartCalc();
}

function resetRateSettings() {
  localStorage.removeItem(SMART_RATES_KEY);
  SMART_RATES = loadRates();
  const panel = document.getElementById('smart-settings-top');
  if (panel) renderRateSettings(panel);
  smartCalc();
}

function openRateSettings() {
  const panel = document.getElementById('smart-settings-top');
  if (!panel) return;
  if (panel.style.display === 'none') {
    renderRateSettings(panel);
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
}
/* ══════════════════════════════════════
   QUICK CALC — กรอกจำนวนชิ้น คิดราคาออโต้
══════════════════════════════════════ */
let _qcMode = 'qty'; // 'qty' = ชิ้น→บาท | 'price' = บาท→ชิ้น

function renderQuickCalc(container) {
  const items = Object.entries(SMART_RATES_DEFAULT).filter(([,v]) => v.divisor > 0);

  // ── mode: qty → price ──
  const inputsQtyHTML = items.map(([name, def]) => {
    const id = 'qc_' + name.replace(/\s/g,'_');
    const iconHtml = def.img
      ? `<img class="item-icon" src="${def.img}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span class="qcalc-emoji" style="display:none">${def.emoji}</span>`
      : `<span class="qcalc-emoji">${def.emoji}</span>`;
    return `<div class="qcalc-item">
      <span class="qcalc-icon-wrap">${iconHtml}</span>
      <span class="qcalc-name">${name}</span>
      <input class="qcalc-field" id="${id}" type="number" min="0" placeholder="0" oninput="updateQuickCalc()" />
    </div>`;
  }).join('');

  const resultsQtyHTML = items.map(([name, def]) => {
    const rid = 'qcr_' + name.replace(/\s/g,'_');
    const iconHtml = def.img
      ? `<img class="item-icon" src="${def.img}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span class="qcalc-result-emoji" style="display:none">${def.emoji}</span>`
      : `<span class="qcalc-result-emoji">${def.emoji}</span>`;
    return `<div class="qcalc-result-row" id="row_${name.replace(/\s/g,'_')}">
      <span class="qcalc-icon-wrap">${iconHtml}</span>
      <span class="qcalc-result-name">${name}</span>
      <span class="qcalc-result-qty" id="${rid}_qty"></span>
      <span class="qcalc-result-val zero" id="${rid}_val">—</span>
    </div>`;
  }).join('');

  // ── mode: price → qty ──
  const inputsPriceHTML = items.map(([name, def]) => {
    const id = 'rqc_' + name.replace(/\s/g,'_');
    const iconHtml = def.img
      ? `<img class="item-icon" src="${def.img}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span class="qcalc-emoji" style="display:none">${def.emoji}</span>`
      : `<span class="qcalc-emoji">${def.emoji}</span>`;
    return `<div class="qcalc-item">
      <span class="qcalc-icon-wrap">${iconHtml}</span>
      <span class="qcalc-name">${name}</span>
      <input class="qcalc-field" id="${id}" type="number" min="0" placeholder="0฿" oninput="updateReverseCalc()" />
    </div>`;
  }).join('');

  const resultsReverseHTML = items.map(([name, def]) => {
    const rid = 'rqcr_' + name.replace(/\s/g,'_');
    const iconHtml = def.img
      ? `<img class="item-icon" src="${def.img}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"><span class="qcalc-result-emoji" style="display:none">${def.emoji}</span>`
      : `<span class="qcalc-result-emoji">${def.emoji}</span>`;
    return `<div class="qcalc-result-row" id="rrow_${name.replace(/\s/g,'_')}">
      <span class="qcalc-icon-wrap">${iconHtml}</span>
      <span class="qcalc-result-name">${name}</span>
      <span class="qcalc-result-qty" id="${rid}_extra"></span>
      <span class="qcalc-result-val zero" id="${rid}_val">—</span>
    </div>`;
  }).join('');

  container.innerHTML = `
    <div class="qcalc-tabs">
      <button class="qcalc-tab active" id="tab-qty" onclick="switchQcMode('qty')">🧮 ชิ้น → บาท</button>
      <button class="qcalc-tab" id="tab-price" onclick="switchQcMode('price')">💰 บาท → ชิ้น</button>
    </div>

    <div id="qcalc-qty-panel">
      <div class="qcalc-wrap">
        <div class="qcalc-left">
          <div class="qcalc-label">ใส่จำนวนชิ้น</div>
          <div class="qcalc-inputs">${inputsQtyHTML}</div>
        </div>
        <div class="qcalc-right">
          <div class="qcalc-label">ราคารวม</div>
          <div class="qcalc-result-rows">${resultsQtyHTML}</div>
          <div class="qcalc-total">
            <span class="qcalc-total-label">รวมทั้งหมด</span>
            <span class="qcalc-total-val" id="qcalc-grand">0.00฿</span>
          </div>
          <button class="qcalc-copy-btn" id="qcalc-copy-btn" onclick="quickCalcCopy()">copy ยอดรวม</button>
        </div>
      </div>
    </div>

    <div id="qcalc-price-panel" style="display:none">
      <div class="qcalc-wrap">
        <div class="qcalc-left">
          <div class="qcalc-label">ใส่จำนวนเงิน (฿)</div>
          <div class="qcalc-inputs">${inputsPriceHTML}</div>
        </div>
        <div class="qcalc-right">
          <div class="qcalc-label">ได้ของกี่ชิ้น</div>
          <div class="qcalc-result-rows">${resultsReverseHTML}</div>
          <div class="qcalc-total">
            <span class="qcalc-total-label">เงินรวม</span>
            <span class="qcalc-total-val" id="rqcalc-grand">0.00฿</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function switchQcMode(mode) {
  _qcMode = mode;
  document.getElementById('qcalc-qty-panel').style.display   = mode === 'qty'   ? '' : 'none';
  document.getElementById('qcalc-price-panel').style.display = mode === 'price' ? '' : 'none';
  document.getElementById('tab-qty').classList.toggle('active',   mode === 'qty');
  document.getElementById('tab-price').classList.toggle('active', mode === 'price');
}

let _qcGrand = 0;

function updateQuickCalc() {
  const items = Object.entries(SMART_RATES_DEFAULT).filter(([,v]) => v.divisor > 0);
  let grand = 0;
  items.forEach(([name, def]) => {
    const id = 'qc_' + name.replace(/\s/g,'_');
    const rid = 'qcr_' + name.replace(/\s/g,'_');
    const rowId = 'row_' + name.replace(/\s/g,'_');
    const inp = document.getElementById(id);
    const valEl = document.getElementById(rid + '_val');
    const qtyEl = document.getElementById(rid + '_qty');
    const row = document.getElementById(rowId);
    if (!inp || !valEl) return;
    const qty = parseFloat(inp.value) || 0;
    const rate = SMART_RATES[name] || def;
    if (!rate || rate.divisor === 0) return;
    const val = rate.multiply ? qty * rate.divisor : qty / rate.divisor;
    grand += val;
    if (qty > 0) {
      valEl.textContent = val.toLocaleString('th-TH', {minimumFractionDigits:2,maximumFractionDigits:2}) + '฿';
      valEl.className = 'qcalc-result-val';
      qtyEl.textContent = qty.toLocaleString('th-TH') + ' ชิ้น';
      if (row) row.classList.add('has-val');
    } else {
      valEl.textContent = '—';
      valEl.className = 'qcalc-result-val zero';
      qtyEl.textContent = '';
      if (row) row.classList.remove('has-val');
    }
  });
  _qcGrand = grand;
  const grandEl = document.getElementById('qcalc-grand');
  if (grandEl) grandEl.textContent = grand.toLocaleString('th-TH', {minimumFractionDigits:2,maximumFractionDigits:2}) + '฿';
}

function updateReverseCalc() {
  const items = Object.entries(SMART_RATES_DEFAULT).filter(([,v]) => v.divisor > 0);
  let grandBaht = 0;
  items.forEach(([name, def]) => {
    const id    = 'rqc_'  + name.replace(/\s/g,'_');
    const rid   = 'rqcr_' + name.replace(/\s/g,'_');
    const rowId = 'rrow_' + name.replace(/\s/g,'_');
    const inp   = document.getElementById(id);
    const valEl = document.getElementById(rid + '_val');
    const extEl = document.getElementById(rid + '_extra');
    const row   = document.getElementById(rowId);
    if (!inp || !valEl) return;
    const baht = parseFloat(inp.value) || 0;
    const rate = SMART_RATES[name] || def;
    if (!rate || rate.divisor === 0) return;
    // กลับสูตร: qty = baht / divisor (multiply) หรือ qty = baht * divisor (divide)
    const qty = rate.multiply ? baht / rate.divisor : baht * rate.divisor;
    grandBaht += baht;
    if (baht > 0) {
      valEl.textContent = Math.floor(qty).toLocaleString('th-TH') + ' ชิ้น';
      valEl.className = 'qcalc-result-val';
      if (extEl) extEl.textContent = baht.toLocaleString('th-TH', {minimumFractionDigits:2,maximumFractionDigits:2}) + '฿';
      if (row) row.classList.add('has-val');
    } else {
      valEl.textContent = '—';
      valEl.className = 'qcalc-result-val zero';
      if (extEl) extEl.textContent = '';
      if (row) row.classList.remove('has-val');
    }
  });
  const grandEl = document.getElementById('rqcalc-grand');
  if (grandEl) grandEl.textContent = grandBaht.toLocaleString('th-TH', {minimumFractionDigits:2,maximumFractionDigits:2}) + '฿';
}

function quickCalcCopy() {
  navigator.clipboard.writeText(_qcGrand.toFixed(2)).catch(()=>{});
  const btn = document.getElementById('qcalc-copy-btn');
  if (btn) { btn.textContent = 'copied! ✓'; setTimeout(()=>{ btn.textContent = 'copy ยอดรวม'; }, 1500); }
}
/* ══════════════════════════════════════
   INVENTORY — สต็อกรวม + สถานะ ID
══════════════════════════════════════ */
const INV_KEY = 'blahexm_inventory'; // { ids: [ { name, online, items:{} } ] }

function invLoad() {
  try { return JSON.parse(localStorage.getItem(INV_KEY)) || { ids: [] }; } catch { return { ids: [] }; }
}
function invSave(data) { localStorage.setItem(INV_KEY, JSON.stringify(data)); }

const INV_ITEMS = Object.keys(SMART_RATES_DEFAULT);

/* ── render หน้า Inventory ── */
function renderInventory() {
  renderInvSummary();
  renderInvIdList();
}

function renderInvSummary() {
  const el = document.getElementById('inv-summary');
  if (!el) return;
  const data = invLoad();
  // รวมสต็อก
  const totals = {};
  INV_ITEMS.forEach(k => totals[k] = 0);
  data.ids.forEach(id => {
    INV_ITEMS.forEach(k => { totals[k] += (id.items?.[k] || 0); });
  });

  const html = INV_ITEMS.map(name => {
    const def = SMART_RATES_DEFAULT[name];
    const qty = totals[name];
    const iconHtml = def?.img
      ? `<img class="item-icon" src="${def.img}" alt="${name}" onerror="this.style.display='none'">`
      : `<span>${def?.emoji||'📦'}</span>`;
    return `<div class="inv-sum-item ${qty === 0 ? 'zero' : ''}">
      <span class="inv-sum-icon">${iconHtml}</span>
      <span class="inv-sum-name">${name}</span>
      <span class="inv-sum-qty">${qty > 0 ? 'x' + qty.toLocaleString('th-TH') : '—'}</span>
    </div>`;
  }).join('');
  el.innerHTML = `<div class="inv-sum-grid">${html}</div>`;
}

function renderInvIdList() {
  const el = document.getElementById('inv-id-list');
  if (!el) return;
  const data = invLoad();
  if (data.ids.length === 0) {
    el.innerHTML = `<div class="inv-empty">ยังไม่มี ID — กด "+ เพิ่ม ID" ด้านบน</div>`;
    return;
  }
  const rows = data.ids.map((id, i) => `
    <div class="inv-id-row">
      <input type="checkbox" class="inv-id-check" data-idx="${i}" onchange="updateInvDeleteBtn()" />
      <span class="inv-id-dot ${id.online ? 'online' : 'offline'}"></span>
      <span class="inv-id-name">${id.name}</span>
      <span class="inv-id-status">${id.online ? 'ออนไลน์' : 'ออฟไลน์'}</span>
      <div class="inv-id-actions">
        <button class="inv-id-btn" onclick="toggleIdOnline(${i})">
          ${id.online ? '🔴 ออฟ' : '🟢 ออน'}
        </button>
        <button class="inv-id-btn" onclick="openEditIdModal(${i})">✏️ แก้ไข</button>
        <button class="inv-id-btn danger" onclick="deleteId(${i})">🗑️</button>
      </div>
    </div>
  `).join('');
  el.innerHTML = `
    <div class="inv-list-toolbar">
      <label class="inv-select-all-wrap">
        <input type="checkbox" id="inv-check-all" onchange="toggleSelectAll(this.checked)" />
        <span class="inv-select-all-label">เลือกทั้งหมด</span>
      </label>
      <div class="inv-toolbar-right">
        <button class="inv-toolbar-btn refresh" onclick="renderInventory()">🔄 รีเฟรช</button>
        <button class="inv-toolbar-btn danger" id="inv-delete-selected" onclick="deleteSelected()" style="display:none">🗑️ ลบที่เลือก</button>
        <button class="inv-toolbar-btn danger" onclick="deleteAllIds()">🗑️ ลบทั้งหมด</button>
      </div>
    </div>
    ${rows}
  `;
}

function updateInvDeleteBtn() {
  const checked = document.querySelectorAll('.inv-id-check:checked').length;
  const btn = document.getElementById('inv-delete-selected');
  if (btn) btn.style.display = checked > 0 ? '' : 'none';
  // sync select-all checkbox
  const all = document.querySelectorAll('.inv-id-check').length;
  const allCheck = document.getElementById('inv-check-all');
  if (allCheck) allCheck.checked = checked === all && all > 0;
}

function toggleSelectAll(checked) {
  document.querySelectorAll('.inv-id-check').forEach(c => c.checked = checked);
  updateInvDeleteBtn();
}

function deleteSelected() {
  const idxs = [...document.querySelectorAll('.inv-id-check:checked')].map(c => parseInt(c.dataset.idx));
  if (!idxs.length) return;
  if (!confirm(`ลบ ${idxs.length} ID ที่เลือก?`)) return;
  const data = invLoad();
  data.ids = data.ids.filter((_, i) => !idxs.includes(i));
  invSave(data);
  renderInventory();
}

function deleteAllIds() {
  const data = invLoad();
  if (!data.ids.length) return;
  if (!confirm('ลบ ID ทั้งหมด?')) return;
  invSave({ ids: [] });
  renderInventory();
}

/* ── Modal ── */
let _editingIdx = -1;

function openAddIdModal() {
  _editingIdx = -1;
  document.getElementById('inv-modal-title').textContent = 'เพิ่ม ID';
  document.getElementById('inv-modal-idname').value = '';
  document.getElementById('inv-modal-online').checked = true;
  document.getElementById('inv-modal-status-txt').textContent = 'ออนไลน์';
  renderModalItems({});
  document.getElementById('inv-modal-overlay').style.display = '';
  document.getElementById('inv-modal').style.display = '';
}

function openEditIdModal(i) {
  const data = invLoad();
  const id = data.ids[i];
  _editingIdx = i;
  document.getElementById('inv-modal-title').textContent = 'แก้ไข ID';
  document.getElementById('inv-modal-idname').value = id.name;
  document.getElementById('inv-modal-online').checked = id.online;
  document.getElementById('inv-modal-status-txt').textContent = id.online ? 'ออนไลน์' : 'ออฟไลน์';
  renderModalItems(id.items || {});
  document.getElementById('inv-modal-overlay').style.display = '';
  document.getElementById('inv-modal').style.display = '';
}

function renderModalItems(items) {
  const el = document.getElementById('inv-modal-items');
  el.innerHTML = INV_ITEMS.map(name => {
    const def = SMART_RATES_DEFAULT[name];
    const iconHtml = def?.img
      ? `<img class="item-icon" src="${def.img}" alt="${name}" onerror="this.style.display='none'">`
      : `<span>${def?.emoji||'📦'}</span>`;
    return `<div class="inv-modal-item-row">
      <span class="inv-modal-item-icon">${iconHtml}</span>
      <span class="inv-modal-item-name">${name}</span>
      <input class="inv-modal-item-input" id="inv_item_${name.replace(/\s/g,'_')}"
        type="number" min="0" placeholder="0" value="${items[name] || ''}" />
    </div>`;
  }).join('');

  // toggle label
  document.getElementById('inv-modal-online').onchange = function() {
    document.getElementById('inv-modal-status-txt').textContent = this.checked ? 'ออนไลน์' : 'ออฟไลน์';
  };
}

function closeIdModal() {
  document.getElementById('inv-modal-overlay').style.display = 'none';
  document.getElementById('inv-modal').style.display = 'none';
}

function saveIdModal() {
  const name   = document.getElementById('inv-modal-idname').value.trim();
  if (!name) { document.getElementById('inv-modal-idname').classList.add('shake'); setTimeout(()=>document.getElementById('inv-modal-idname').classList.remove('shake'),400); return; }
  const online = document.getElementById('inv-modal-online').checked;
  const items  = {};
  INV_ITEMS.forEach(n => {
    const val = parseInt(document.getElementById('inv_item_' + n.replace(/\s/g,'_'))?.value) || 0;
    if (val > 0) items[n] = val;
  });
  const data = invLoad();
  if (_editingIdx >= 0) {
    data.ids[_editingIdx] = { name, online, items };
  } else {
    data.ids.push({ name, online, items });
  }
  invSave(data);
  closeIdModal();
  renderInventory();
}

function toggleIdOnline(i) {
  const data = invLoad();
  data.ids[i].online = !data.ids[i].online;
  invSave(data);
  renderInvIdList();
}

function deleteId(i) {
  const data = invLoad();
  data.ids.splice(i, 1);
  invSave(data);
  renderInventory();
}

/* ══════════════════════════════════════
   SUPABASE INVENTORY — ดึงข้อมูลจริงจาก Roblox
   (รวมไว้ใน app.js เพราะ index.html load แค่ไฟล์นี้)
══════════════════════════════════════ */
const INV_SB_URL = 'https://nzzsqkvjzlaszxswehkd.supabase.co';
const INV_SB_KEY = 'sb_publishable_B04udlxe_F-GxoGCoiFdBQ_LCLS9LVq';
const _invSb     = window.supabase.createClient(INV_SB_URL, INV_SB_KEY);

// ── rarity config ──
const RARITY_COLOR = {
  epic:      { color: '#a855f7', glow: 'rgba(168,85,247,.25)' },
  legendary: { color: '#f59e0b', glow: 'rgba(245,158,11,.25)' },
  mythical:  { color: '#ef4444', glow: 'rgba(239,68,68,.25)'  },
  secret:    { color: '#ec4899', glow: 'rgba(236,72,153,.25)' },
};
const ITEM_RARITY = {
  'Race Reroll':    { rarity: 'epic',      label: 'Epic'      },
  'Trait Reroll':   { rarity: 'epic',      label: 'Epic'      },
  'Clan Reroll':    { rarity: 'legendary', label: 'Legendary' },
  'Mythical Chest': { rarity: 'mythical',  label: 'Mythical'  },
  'Aura Crate':     { rarity: 'secret',    label: 'Secret'    },
  'Cosmetic Crate': { rarity: 'secret',    label: 'Secret'    },
  'Passive Shard':  { rarity: 'legendary', label: 'Legendary' },
  'Power Shard':    { rarity: 'legendary', label: 'Legendary' },
  'Upper Seal':     { rarity: 'legendary', label: 'Legendary' },
};

// ── parse item value (รองรับ {quantity, image} และตัวเลขเดิม) ──
function sbParseItem(val) {
  if (typeof val === 'object' && val !== null) {
    return {
      qty:   val.quantity ?? val.qty ?? 0,
      image: val.image ?? '',
    };
  }
  return { qty: val ?? 0, image: '' };
}

// ── image cache ──
const _imgCache = {};

// ── async load รูปจาก Roblox thumbnails API (หลีก CORS) ──
async function loadRbxImg(rbxImg, imgEl) {
  if (!rbxImg || !imgEl) return;
  const m = rbxImg.match(/(\d{5,})/);
  if (!m) return;
  const id = m[1];
  if (_imgCache[id]) { imgEl.src = _imgCache[id]; return; }
  try {
    const res  = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${id}&returnPolicy=PlaceHolder&size=150x150&format=png&isCircular=false`);
    const json = await res.json();
    const url  = json?.data?.[0]?.imageUrl;
    if (url) { _imgCache[id] = url; imgEl.src = url; }
  } catch {
    imgEl.src = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://www.roblox.com/asset-thumbnail/image?assetId='+id+'&width=150&height=150&format=png')}`;
  }
}

// ── format helpers ──
function sbFmtQty(n) {
  if (n >= 1_000_000) return (n/1_000_000).toFixed(1).replace(/\.0$/,'')+'M';
  if (n >= 1_000)     return (n/1_000).toFixed(1).replace(/\.0$/,'')+'K';
  return n.toLocaleString('th-TH');
}
function sbTimeSince(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff/60000);
  if (m < 1)  return 'เมื่อกี้';
  if (m < 60) return m+' นาทีที่แล้ว';
  const h = Math.floor(m/60);
  if (h < 24) return h+' ชั่วโมงที่แล้ว';
  return Math.floor(h/24)+' วันที่แล้ว';
}
function sbFmtBaht(n) {
  if (n >= 1_000_000) return (n/1_000_000).toFixed(2)+'M฿';
  if (n >= 1_000)     return (n/1_000).toFixed(1)+'K฿';
  return n.toLocaleString('th-TH',{minimumFractionDigits:2,maximumFractionDigits:2})+'฿';
}

// ── render Supabase inventory card ──
let _sbCardIdx = 0;
function renderSbCard(name, qty, rbxImg) {
  const meta   = ITEM_RARITY[name] || {};
  const rarity = meta.rarity || 'legendary';
  const rc     = RARITY_COLOR[rarity] || RARITY_COLOR.legendary;
  const label  = meta.label || rarity;
  const uid    = 'sbimg-'+(++_sbCardIdx);
  setTimeout(()=>{ const el=document.getElementById(uid); if(el&&rbxImg) loadRbxImg(rbxImg,el); },0);
  return `
    <div class="inv-card" style="--rc:${rc.color};--rg:${rc.glow}">
      <div class="inv-card-img-wrap">
        <img class="inv-card-img" id="${uid}" src="" alt="${name}" onerror="this.style.opacity='.15'">
        <div class="inv-card-glow"></div>
      </div>
      <div class="inv-card-info">
        <div class="inv-card-name">${name}</div>
        <div class="inv-card-bottom">
          <span class="inv-card-badge inv-rarity-${rarity}">${label}</span>
          <span class="inv-card-qty">x${sbFmtQty(qty)}</span>
        </div>
      </div>
    </div>`;
}

// ── render summary bar (รวมทุก ID) ──
function renderSbSummary(rows) {
  const el = document.getElementById('inv-summary');
  if (!el) return;
  const totals = {};
  const images = {};
  const itemOrder = Object.keys(ITEM_RARITY);

  rows.forEach(row => {
    Object.entries(row.items||{}).forEach(([name, val]) => {
      const { qty, image } = sbParseItem(val);
      totals[name] = (totals[name]||0) + qty;
      if (image && !images[name]) images[name] = image;
    });
  });

  const rates = (typeof SMART_RATES !== 'undefined' ? SMART_RATES : null)
             || (typeof SMART_RATES_DEFAULT !== 'undefined' ? SMART_RATES_DEFAULT : {});

  let grandTotal = 0;
  const cards = itemOrder.map(name => {
    const qty = totals[name]||0;
    if (qty === 0) return '';
    const meta   = ITEM_RARITY[name]||{};
    const rarity = meta.rarity||'legendary';
    const rc     = RARITY_COLOR[rarity]||RARITY_COLOR.legendary;
    const uid    = 'sbsum-'+name.replace(/\s/g,'-');
    const rbxImg = images[name]||'';
    const rate   = rates[name];
    let valStr = '';
    if (rate && rate.divisor > 0) {
      const v = rate.multiply ? qty*rate.divisor : qty/rate.divisor;
      grandTotal += v;
      valStr = sbFmtBaht(v);
    }
    setTimeout(()=>{ const el=document.getElementById(uid); if(el&&rbxImg) loadRbxImg(rbxImg,el); },0);
    return `<div class="inv-sum-item" style="--rc:${rc.color}">
      <img class="inv-sum-sbimg" id="${uid}" src="" alt="${name}" onerror="this.style.opacity='.15'">
      <span class="inv-sum-name">${name}</span>
      <span class="inv-sum-qty" style="color:${rc.color}">x${sbFmtQty(qty)}</span>
      ${valStr ? `<span class="inv-sum-val">${valStr}</span>` : ''}
    </div>`;
  }).filter(Boolean).join('');

  el.innerHTML = `
    <div class="inv-sum-grid">${cards||'<div class="inv-empty" style="padding:16px 0">ยังไม่มีของ</div>'}</div>
    ${grandTotal > 0 ? `<div class="inv-grand-row"><span>มูลค่ารวมทั้งหมด</span><span class="inv-grand-val">${sbFmtBaht(grandTotal)}</span></div>` : ''}
  `;
}

// ── render ID list (Supabase) ──
function renderSbIdList(rows) {
  const el = document.getElementById('inv-id-list');
  if (!el) return;
  if (!rows.length) {
    el.innerHTML = '<div class="inv-empty">ยังไม่มีข้อมูล — รัน script ใน Roblox ก่อนนะครับ</div>';
    return;
  }
  const itemOrder = Object.keys(ITEM_RARITY);
  const rates = (typeof SMART_RATES !== 'undefined' ? SMART_RATES : null)
             || (typeof SMART_RATES_DEFAULT !== 'undefined' ? SMART_RATES_DEFAULT : {});

  el.innerHTML = rows.map(row => {
    const items  = row.items||{};
    const isOn   = (Date.now()-new Date(row.updated_at).getTime())/60000 <= 10;
    let rowVal = 0;
    const cardsHtml = itemOrder.map(name => {
      const { qty, image } = sbParseItem(items[name]||0);
      if (qty <= 0) return '';
      const rate = rates[name];
      if (rate && rate.divisor > 0) rowVal += rate.multiply ? qty*rate.divisor : qty/rate.divisor;
      return renderSbCard(name, qty, image);
    }).join('');

    return `
      <div class="inv-player-block">
        <div class="inv-player-header">
          <div class="inv-player-name">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            ${row.username}
            <span class="inv-id-dot ${isOn?'online':'offline'}" style="width:7px;height:7px;border-radius:50%;display:inline-block;background:${isOn?'#34d399':'var(--dim2)'};${isOn?'box-shadow:0 0 5px #34d39966':''}"></span>
            ${rowVal > 0 ? `<span style="font-family:'Geist Mono',monospace;font-size:.6rem;color:#34d399;margin-left:4px">${sbFmtBaht(rowVal)}</span>` : ''}
          </div>
          <div class="inv-player-time">อัปเดต ${sbTimeSince(row.updated_at)}</div>
        </div>
        <div class="inv-grid">
          ${cardsHtml||'<div class="inv-empty-row">ไม่มีของที่ track</div>'}
        </div>
      </div>`;
  }).join('');
}

// ── fetch + render ──
let _sbRows = [];
async function fetchAndRenderInventory() {
  const el = document.getElementById('inv-id-list');
  const sumEl = document.getElementById('inv-summary');
  if (el && !_sbRows.length) el.innerHTML = '<div class="inv-loading"><div class="inv-spinner"></div><span>กำลังโหลด...</span></div>';
  try {
    const { data, error } = await _invSb.from('inventory').select('username,items,updated_at').order('updated_at',{ascending:false});
    if (error) throw error;
    _sbRows = data||[];
    renderSbSummary(_sbRows);
    renderSbIdList(_sbRows);
  } catch(e) {
    if (el) el.innerHTML = `<div class="inv-empty">เกิดข้อผิดพลาด: ${e.message}</div>`;
  }
}

// ── start auto-refresh ──
let _sbTimer = null;
function startSbInventory() {
  fetchAndRenderInventory();
  if (_sbTimer) clearInterval(_sbTimer);
  _sbTimer = setInterval(fetchAndRenderInventory, 30000);
}