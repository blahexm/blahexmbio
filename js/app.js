/* ================================================================
   app.js — ไม่ต้องแก้ไฟล์นี้
   ================================================================ */

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
  shield: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  check:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/></svg>`,
  star:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  bolt:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  crown:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v2H2v-2zM4 17l4-8 4 4 4-6 4 10H4z"/></svg>`,
  diamond:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9l10 13L22 9 12 2zm0 3.5L19 9l-7 9.1L5 9l7-3.5z"/></svg>`,
};

/* ── Flip ── */
function flipTo(side) {
  const card = document.getElementById('flip-card');
  const tp = document.getElementById('tab-profile');
  const tm = document.getElementById('tab-music');
  if (side === 'music') {
    card.classList.add('flipped');
    tp.classList.remove('active'); tm.classList.add('active');
  } else {
    card.classList.remove('flipped');
    tm.classList.remove('active'); tp.classList.add('active');
  }
}

/* ── Badge ── */
function renderBadge() {
  const el = document.getElementById('badge');
  if (!el || !C.badge || C.badge === false) { if(el) el.style.display='none'; return; }
  if (C.badge === 'fire')   { el.className='badge emoji'; el.textContent='🔥'; return; }
  if (C.badge === 'custom') { el.className='badge emoji'; el.textContent=C.badgeCustom||'⭐'; return; }
  const svg = BADGE_SVG[C.badge];
  if (svg) { el.className='badge'; el.innerHTML=svg; }
}

/* ── Status ── */
function applyStatus(s) {
  const dot = document.getElementById('status-dot');
  const lbl = document.getElementById('status-label');
  const txt = document.getElementById('status-text');
  if (dot) dot.className = `status-dot ${s}`;
  if (lbl) lbl.className = `status-label ${s}`;
  if (txt) txt.textContent = C.manualStatusText ||
    ({online:'Online',idle:'Idle',dnd:'Do Not Disturb',offline:'Offline'}[s] || s);
}

/* ── Lanyard ── */
async function fetchLanyard() {
  if (!C.discordId) { applyStatus(C.manualStatus); return; }
  try {
    const j = await (await fetch(`https://api.lanyard.rest/v1/users/${C.discordId}`)).json();
    if (!j.success) throw 0;
    const d = j.data, s = d.discord_status || 'offline';
    applyStatus(s);
    let src = C.avatarUrl;
    if (!src && d.discord_user?.avatar)
      src = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png?size=128`;
    if (src) document.getElementById('avatar').src = src;
    const actEl = document.getElementById('activity');
    let act = null;
    if (d.listening_to_spotify && d.spotify)
      act = {icon:'🎵', type:'Spotify', detail:`${d.spotify.song} · ${d.spotify.artist}`};
    else { const a = d.activities?.find(x=>x.type===0); if(a) act={icon:'🎮',type:'Playing',detail:a.name+(a.details?` — ${a.details}`:'')}; }
    if (actEl) {
      if (act) {
        document.getElementById('activity-icon').textContent  = act.icon;
        document.getElementById('activity-type').textContent  = act.type;
        document.getElementById('activity-detail').textContent= act.detail;
        actEl.classList.add('show');
      } else actEl.classList.remove('show');
    }
  } catch { applyStatus(C.manualStatus); }
}

/* ── Music Player ── */
let _aud;
function toggleMusic() {
  if (!_aud) _aud = document.getElementById('audio');
  const pi=document.getElementById('play-icon'), pa=document.getElementById('pause-icon');
  const vz=document.getElementById('music-viz');
  if (_aud.paused) {
    if (!C.music.url) { alert('ใส่ URL เพลงใน config.js ก่อนนะครับ!'); return; }
    _aud.play();
    pi.style.display='none'; pa.style.display='block'; vz.classList.remove('paused');
  } else {
    _aud.pause();
    pi.style.display='block'; pa.style.display='none'; vz.classList.add('paused');
  }
}

/* ── Music Grid ── */
function buildMusicGrid() {
  const grid = document.getElementById('music-grid');
  if (!grid) return;
  if (!C.favMusic || C.favMusic.length === 0) {
    grid.innerHTML = `<div class="music-empty">ยังไม่มีเพลง<br><span style="opacity:.5">เพิ่มลิงก์ใน config.js → favMusic</span></div>`;
    return;
  }
  grid.innerHTML = '';
  C.favMusic.forEach(url => {
    if (!url) return;
    const card = document.createElement('div');
    card.className = 'music-embed-card';
    const sp = url.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
    if (sp) {
      card.innerHTML = `<iframe src="https://open.spotify.com/embed/${sp[1]}/${sp[2]}?utm_source=generator&theme=0" height="80" allow="autoplay;clipboard-write;encrypted-media;fullscreen;picture-in-picture" loading="lazy"></iframe>`;
      grid.appendChild(card); return;
    }
    const yt = url.match(/(?:youtu\.be\/|[?&]v=)([a-zA-Z0-9_-]{11})/);
    if (yt) {
      card.innerHTML = `<iframe src="https://www.youtube.com/embed/${yt[1]}" height="180" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
      grid.appendChild(card);
    }
  });
}

/* ── Cursor ── */
function initCursor() {
  if (!window.matchMedia('(hover:hover)').matches) return;
  const cur=document.getElementById('cursor'), trl=document.getElementById('cursor-trail');
  if (!cur||!trl) return;
  let tx=0,ty=0,mx=0,my=0;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
  setInterval(()=>{ tx+=(mx-tx)*.14; ty+=(my-ty)*.14; trl.style.left=tx+'px'; trl.style.top=ty+'px'; },16);
}

/* ── Security ── */
function initSecurity() {
  document.addEventListener('contextmenu', e=>e.preventDefault());
  document.addEventListener('keydown', e=>{
    if (e.key==='F12'||(e.ctrlKey&&e.shiftKey&&'IJC'.includes(e.key.toUpperCase()))||(e.ctrlKey&&e.key.toUpperCase()==='U'))
      e.preventDefault();
  });
  setInterval(()=>{
    if (window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160)
      document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace;color:#333;font-size:.8rem">🔒 access denied</div>';
  },1000);
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

  // socials
  const sc = document.getElementById('socials');
  C.socials.forEach(s => {
    if (!s.on || !s.url) return;
    const a = document.createElement('a');
    a.className='btn'; a.href=s.url; a.target='_blank'; a.rel='noopener';
    a.innerHTML=`${ICONS[s.id]||''}<span class="btn-label">${s.label}</span><span class="btn-arrow">→</span>`;
    sc.appendChild(a);
  });

  // music player
  if (!C.music.on) { document.getElementById('music-bar').style.display='none'; }
  else {
    document.getElementById('music-title').textContent  = C.music.title  || '—';
    document.getElementById('music-artist').textContent = C.music.artist || '';
    if (C.music.url) document.getElementById('audio').src = C.music.url;
  }

  buildMusicGrid();
  initCursor();
  initSecurity();
  fetchLanyard();
  setInterval(fetchLanyard, 12000);
});


// ===== THEME TOGGLE =====

const toggleBtn = document.getElementById("theme-toggle");

// โหลดค่าที่เคยเลือกไว้
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "🌙";
  }
});