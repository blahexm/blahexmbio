/* ================================================================
   stats.js — Blox Fruit Stats Page
   ================================================================ */

const STATS_CONFIG = {
  passcode:    "1234",   // 🔑 เปลี่ยนรหัสตรงนี้
  supabaseUrl: "https://zwavwijmgjgpaembmpnl.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YXZ3aWptZ2pncGFlbWJtcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTU5MDIsImV4cCI6MjA4ODIzMTkwMn0.fAqRlMP6COBxT0v1wgvvW7NSxn6jv93Ah1d42C_GKMU",
  offlineAfterSeconds: 30, // ถ้าไม่ส่งข้อมูลมานานกว่านี้ = offline
};

const SCRIPT_CONTENT = `-- Blox Fruit Stats Sender v6
local Players = game:GetService("Players")
local plr = Players.LocalPlayer
local SUPABASE_URL = "${STATS_CONFIG.supabaseUrl}"
local SUPABASE_KEY = "${STATS_CONFIG.supabaseKey}"
local httpRequest = (syn and syn.request) or (http and http.request) or request
local function getStats()
    local Data = plr:FindFirstChild("Data")
    local ls   = plr:FindFirstChild("leaderstats")
    local function dv(n) local o=Data and Data:FindFirstChild(n); return o and o.Value or 0 end
    local function lv(n) local o=ls   and ls:FindFirstChild(n);   return o and o.Value or 0 end
    return { username=plr.Name, level=dv("Level"), bounty=lv("Bounty/Honor"), money=dv("Beli"), fragments=dv("Fragments") }
end
local function send(s)
    httpRequest({ Url=SUPABASE_URL.."/rest/v1/blox_stats?on_conflict=username", Method="POST",
        Headers={["Content-Type"]="application/json",["apikey"]=SUPABASE_KEY,["Authorization"]="Bearer "..SUPABASE_KEY,["Prefer"]="resolution=merge-duplicates"},
        Body=game:GetService("HttpService"):JSONEncode(s) })
end
print("🏴 Stats Sender Started!")
while true do
    local ok,err=pcall(function() local s=getStats(); send(s); print("✅ "..s.username.." Lv."..s.level) end)
    if not ok then warn("❌ "..tostring(err)) end
    task.wait(10)
end`;

/* ── State ── */
let _unlocked      = false;
let _padValue      = '';
let _db            = null;
let _realtimeCh    = null;
let _pollInterval  = null;
let _lastData      = null;

/* ── Supabase ── */
function getDB() {
  if (_db) return _db;
  if (!window.supabase) return null;
  _db = window.supabase.createClient(STATS_CONFIG.supabaseUrl, STATS_CONFIG.supabaseKey);
  return _db;
}

/* ════════════════════
   PASSCODE
════════════════════ */
function padInput(n) {
  if (_padValue.length >= 4) return;
  _padValue += n;
  updateDots();
  if (_padValue.length === 4) setTimeout(checkPasscode, 120);
}
function padDelete() { _padValue = _padValue.slice(0,-1); updateDots(); }
function padClear()  { _padValue = ''; updateDots(); }

function updateDots() {
  document.querySelectorAll('#lock-dots span').forEach((d,i) => {
    d.classList.toggle('filled', i < _padValue.length);
  });
}

function checkPasscode() {
  if (_padValue === STATS_CONFIG.passcode) {
    _unlocked = true;
    document.getElementById('stats-lock').style.display    = 'none';
    document.getElementById('stats-content').style.display = 'block';
    initStatsData();
  } else {
    const err = document.getElementById('lock-error');
    err.textContent = 'wrong passcode';
    err.classList.add('show');
    document.getElementById('lock-dots').classList.add('shake');
    setTimeout(() => {
      err.classList.remove('show');
      document.getElementById('lock-dots').classList.remove('shake');
      _padValue = ''; updateDots();
    }, 800);
  }
}

function lockStats() {
  _unlocked = false;
  _padValue = '';
  updateDots();
  document.getElementById('stats-lock').style.display    = '';
  document.getElementById('stats-content').style.display = 'none';
  stopRealtime();
}

/* ════════════════════
   FETCH & RENDER
════════════════════ */
async function initStatsData() {
  // โหลด supabase sdk ก่อนถ้ายังไม่มี
  if (!window.supabase) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    s.onload = () => { fetchLatestStats(); startRealtime(); };
    document.head.appendChild(s);
  } else {
    fetchLatestStats();
    startRealtime();
  }
}

async function fetchLatestStats() {
  setRefreshing(true);
  const db = getDB();
  if (!db) { setRefreshing(false); return; }

  // ดึง record ล่าสุดอัตโนมัติ ไม่ต้องระบุ username
  const { data, error } = await db
    .from('blox_stats')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  setRefreshing(false);
  if (error || !data) { showNoData(); return; }
  _lastData = data;
  renderStats(data);
  fetchRobloxAvatar(data.username);
}

function showNoData() {
  document.getElementById('roblox-display-name').textContent = '—';
  document.getElementById('roblox-id-row').textContent = '';
  ['s-level','s-bounty','s-beli','s-frags'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '—';
  });
  setOnline(false, null);
}

function fmt(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1)     + 'K';
  return Number(n).toLocaleString();
}

function renderStats(data) {
  // ค่า stats
  document.getElementById('s-level').textContent  = fmt(data.level);
  document.getElementById('s-bounty').textContent = fmt(data.bounty);
  document.getElementById('s-beli').textContent   = fmt(data.money);
  document.getElementById('s-frags').textContent  = fmt(data.fragments);
  document.getElementById('roblox-display-name').textContent = data.username || '—';

  // online/offline — ถ้า updated_at ไม่เกิน OFFLINE_AFTER_SECONDS = online
  const diffSec = (Date.now() - new Date(data.updated_at)) / 1000;
  const isOnline = diffSec <= STATS_CONFIG.offlineAfterSeconds;
  setOnline(isOnline, data.updated_at);
}

function setOnline(online, updatedAt) {
  const badge = document.getElementById('stats-online-badge');
  const txt   = document.getElementById('stats-online-text');
  if (badge) badge.classList.toggle('online', online);
  if (txt)   txt.textContent = online ? 'online' : 'offline';

  const upd = document.getElementById('stats-update-time');
  if (upd && updatedAt) {
    const d = new Date(updatedAt);
    // แสดงเวลาจริง พร้อมวันที่ถ้าไม่ใช่วันนี้
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const timeStr = d.toLocaleTimeString('th-TH', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    const dateStr = isToday ? '' : ' · ' + d.toLocaleDateString('th-TH', { day:'numeric', month:'short' });
    upd.textContent = 'last seen ' + timeStr + dateStr;
  } else if (upd && !updatedAt) {
    upd.textContent = '—';
  }
}

/* ── Refresh button ── */
function setRefreshing(on) {
  const btn = document.getElementById('refresh-btn');
  if (!btn) return;
  btn.classList.toggle('spinning', on);
  btn.disabled = on;
}

function manualRefresh() {
  fetchLatestStats();
}

/* ════════════════════
   ROBLOX AVATAR
════════════════════ */
async function fetchRobloxAvatar(username) {
  if (!username) return;
  try {
    const res = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
    });
    const udata = await res.json();
    const userId = udata?.data?.[0]?.id;
    if (!userId) return;

    const idRow = document.getElementById('roblox-id-row');
    if (idRow) idRow.textContent = 'ID: ' + userId;

    const aRes  = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-bust?userIds=${userId}&size=150x150&format=Png&isCircular=false`);
    const aData = await aRes.json();
    const imgUrl = aData?.data?.[0]?.imageUrl;
    if (!imgUrl) return;

    const img = document.getElementById('roblox-avatar-img');
    const ph  = document.getElementById('roblox-avatar-placeholder');
    if (img) { img.src = imgUrl; img.style.display = 'block'; if (ph) ph.style.display = 'none'; }
  } catch(e) { console.log('avatar err', e); }
}

/* ════════════════════
   REALTIME
════════════════════ */
function startRealtime() {
  const db = getDB();
  if (!db) return;
  _realtimeCh = db.channel('stats_rt_all')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'blox_stats' }, payload => {
      if (payload.new) {
        _lastData = payload.new;
        renderStats(payload.new);
        fetchRobloxAvatar(payload.new.username);
      }
    })
    .subscribe();

  // poll ทุก 15s เพื่ออัปเดต online/offline status
  _pollInterval = setInterval(() => {
    if (_lastData) {
      const diffSec = (Date.now() - new Date(_lastData.updated_at)) / 1000;
      setOnline(diffSec <= STATS_CONFIG.offlineAfterSeconds, _lastData.updated_at);
    }
  }, 5000);
}

function stopRealtime() {
  if (_realtimeCh)   { try { _realtimeCh.unsubscribe(); } catch{} _realtimeCh = null; }
  if (_pollInterval) { clearInterval(_pollInterval); _pollInterval = null; }
}

/* ════════════════════
   SCRIPT BOX
════════════════════ */
function toggleScript() {
  const box = document.getElementById('script-box');
  const btn = document.getElementById('copy-script-btn');
  if (!box) return;
  const show = box.style.display === 'none';
  box.style.display = show ? 'block' : 'none';
  document.getElementById('script-pre').textContent = show ? SCRIPT_CONTENT : '';
  if (btn) btn.textContent = show ? '↑ hide' : '📋 script';
}

function copyScript() {
  navigator.clipboard.writeText(SCRIPT_CONTENT);
  const btn = document.querySelector('.script-box-header button');
  if (btn) { btn.textContent = '✓ copied'; setTimeout(() => btn.textContent = 'copy', 1500); }
}

/* ── expose init ── */
window._statsInit = function() {
  if (window._statsInited) return;
  window._statsInited = true;
};

// keyboard passcode
document.addEventListener('keydown', e => {
  if (typeof _currentFace !== 'undefined' && _currentFace !== 'stats') return;
  if (_unlocked) return;
  if (e.key >= '0' && e.key <= '9') padInput(e.key);
  else if (e.key === 'Backspace') padDelete();
  else if (e.key === 'Escape')    padClear();
});
