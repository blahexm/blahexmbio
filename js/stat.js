/* ================================================================
   stats.js — Blox Fruit Stats Page
   แก้ PASSCODE และ SUPABASE ด้านล่าง
   ================================================================ */

const STATS_CONFIG = {
  passcode: "1234",   // 🔑 เปลี่ยนรหัสตรงนี้
  supabaseUrl: "https://zwavwijmgjgpaembmpnl.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YXZ3aWptZ2pncGFlbWJtcG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTU5MDIsImV4cCI6MjA4ODIzMTkwMn0.fAqRlMP6COBxT0v1wgvvW7NSxn6jv93Ah1d42C_GKMU",
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
let _unlocked = false;
let _padValue  = '';
let _currentUsername = null;
let _statsInterval = null;
let _supabaseChannel = null;
let _db = null;

/* ── Supabase init ── */
function getDB() {
  if (_db) return _db;
  if (!window.supabase) return null;
  _db = window.supabase.createClient(STATS_CONFIG.supabaseUrl, STATS_CONFIG.supabaseKey);
  return _db;
}

/* ── Passcode ── */
function padInput(n) {
  if (_padValue.length >= 4) return;
  _padValue += n;
  updateDots();
  if (_padValue.length === 4) setTimeout(checkPasscode, 120);
}
function padDelete() {
  _padValue = _padValue.slice(0,-1);
  updateDots();
}
function padClear() {
  _padValue = '';
  updateDots();
}
function updateDots() {
  const dots = document.querySelectorAll('#lock-dots span');
  dots.forEach((d,i) => {
    d.classList.toggle('filled', i < _padValue.length);
  });
}
function checkPasscode() {
  if (_padValue === STATS_CONFIG.passcode) {
    _unlocked = true;
    document.getElementById('stats-lock').style.display    = 'none';
    document.getElementById('stats-content').style.display = 'block';
    loadStoredIds();
    fetchStats();
    startRealtime();
  } else {
    const err = document.getElementById('lock-error');
    err.textContent = 'wrong passcode';
    err.classList.add('show');
    document.getElementById('lock-dots').classList.add('shake');
    setTimeout(()=>{
      err.classList.remove('show');
      document.getElementById('lock-dots').classList.remove('shake');
      _padValue=''; updateDots();
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

/* ── Load IDs from localStorage ── */
function loadStoredIds() {
  let ids = [];
  try { ids = JSON.parse(localStorage.getItem('blox_ids') || '[]'); } catch{}
  if (ids.length === 0) ids = [];
  renderIdList(ids);
  if (ids.length > 0 && !_currentUsername) selectId(ids[0]);
}
function saveIds(ids) {
  try { localStorage.setItem('blox_ids', JSON.stringify(ids)); } catch{}
}
function getIds() {
  try { return JSON.parse(localStorage.getItem('blox_ids') || '[]'); } catch { return []; }
}
function addId() {
  const input = document.getElementById('id-input');
  const val = input.value.trim();
  if (!val) return;
  const ids = getIds();
  if (ids.includes(val)) { input.value=''; return; }
  ids.push(val);
  saveIds(ids);
  renderIdList(ids);
  if (ids.length === 1) selectId(val);
  input.value = '';
}
function removeId(name) {
  let ids = getIds().filter(x => x !== name);
  saveIds(ids);
  renderIdList(ids);
  if (_currentUsername === name) {
    _currentUsername = ids[0] || null;
    if (_currentUsername) fetchStats();
    else clearStats();
  }
}
function selectId(name) {
  _currentUsername = name;
  renderIdList(getIds());
  fetchStats();
  stopRealtime();
  startRealtime();
}
function renderIdList(ids) {
  const list = document.getElementById('id-list');
  if (!list) return;
  if (ids.length === 0) {
    list.innerHTML = `<div class="id-empty">no accounts added</div>`;
    return;
  }
  list.innerHTML = '';
  ids.forEach(name => {
    const row = document.createElement('div');
    row.className = 'id-row' + (name === _currentUsername ? ' active' : '');
    row.innerHTML = `
      <span class="id-name" onclick="selectId('${name}')">${name}</span>
      <button class="id-remove" onclick="removeId('${name}')">✕</button>
    `;
    list.appendChild(row);
  });
}

/* ── Fetch Stats ── */
async function fetchStats() {
  if (!_currentUsername) return;
  const db = getDB();
  if (!db) return;
  const { data, error } = await db
    .from('blox_stats')
    .select('*')
    .eq('username', _currentUsername)
    .single();
  if (error || !data) { clearStats(); return; }
  renderStats(data);
  fetchRobloxAvatar(data.username);
}

function clearStats() {
  ['s-level','s-bounty','s-beli','s-frags'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '—';
  });
  setOnline(false);
}

function fmt(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1_000_000) return (n/1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n/1_000).toFixed(1) + 'K';
  return Number(n).toLocaleString();
}

function renderStats(data) {
  document.getElementById('s-level').textContent  = fmt(data.level);
  document.getElementById('s-bounty').textContent = fmt(data.bounty);
  document.getElementById('s-beli').textContent   = fmt(data.money);
  document.getElementById('s-frags').textContent  = fmt(data.fragments);
  document.getElementById('roblox-display-name').textContent = data.username || '—';

  // online if updated within 30s
  const diff = (Date.now() - new Date(data.updated_at)) / 1000;
  setOnline(diff < 30);

  const upd = document.getElementById('stats-update-time');
  if (upd) {
    const d = new Date(data.updated_at);
    upd.textContent = 'updated ' + d.toLocaleTimeString('th-TH');
  }
}

function setOnline(online) {
  const badge = document.getElementById('stats-online-badge');
  const txt   = document.getElementById('stats-online-text');
  if (!badge || !txt) return;
  badge.classList.toggle('online', online);
  txt.textContent = online ? 'online' : 'offline';
}

/* ── Roblox Avatar ── */
async function fetchRobloxAvatar(username) {
  try {
    // 1. get userId
    const res = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
    });
    const udata = await res.json();
    const userId = udata?.data?.[0]?.id;
    if (!userId) return;

    // show user id
    const idRow = document.getElementById('roblox-id-row');
    if (idRow) idRow.textContent = `ID: ${userId}`;

    // 2. get avatar thumbnail
    const aRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-bust?userIds=${userId}&size=150x150&format=Png&isCircular=false`);
    const aData = await aRes.json();
    const imgUrl = aData?.data?.[0]?.imageUrl;
    if (!imgUrl) return;

    const img  = document.getElementById('roblox-avatar-img');
    const ph   = document.getElementById('roblox-avatar-placeholder');
    if (img) {
      img.src = imgUrl;
      img.style.display = 'block';
      if (ph) ph.style.display = 'none';
    }
  } catch(e) { console.log('avatar error', e); }
}

/* ── Realtime ── */
function startRealtime() {
  const db = getDB();
  if (!db || !_currentUsername) return;
  _supabaseChannel = db.channel('stats_rt_' + _currentUsername)
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'blox_stats',
      filter: `username=eq.${_currentUsername}`
    }, payload => {
      if (payload.new) { renderStats(payload.new); fetchRobloxAvatar(payload.new.username); }
    })
    .subscribe();

  // also poll every 15s for online status
  _statsInterval = setInterval(fetchStats, 15000);
}
function stopRealtime() {
  if (_supabaseChannel) { try { _supabaseChannel.unsubscribe(); } catch{} _supabaseChannel = null; }
  if (_statsInterval)   { clearInterval(_statsInterval); _statsInterval = null; }
}

/* ── Script toggle ── */
function toggleScript() {
  const box = document.getElementById('script-box');
  const pre = document.getElementById('script-pre');
  if (!box) return;
  if (box.style.display === 'none') {
    pre.textContent = SCRIPT_CONTENT;
    box.style.display = 'block';
    document.getElementById('copy-script-btn').textContent = '↑ hide';
  } else {
    box.style.display = 'none';
    document.getElementById('copy-script-btn').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="10" height="10"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> script`;
  }
}
function copyScript() {
  navigator.clipboard.writeText(SCRIPT_CONTENT);
  const btn = document.querySelector('.script-box-header button');
  if (btn) { btn.textContent = '✓'; setTimeout(()=>btn.textContent='copy', 1500); }
}

/* ── Load supabase SDK then expose init ── */
window._statsInit = function() {
  if (window._statsInited) return;
  window._statsInited = true;
  if (!window.supabase) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    s.onload = () => { if (_unlocked) { fetchStats(); startRealtime(); } };
    document.head.appendChild(s);
  }
};

// keyboard support for passcode
document.addEventListener('keydown', e => {
  if (_currentFace !== 'stats' || _unlocked) return;
  if (e.key >= '0' && e.key <= '9') padInput(e.key);
  else if (e.key === 'Backspace') padDelete();
  else if (e.key === 'Escape') padClear();
});
