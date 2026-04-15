/* ══════════════════════════════════════════════════════
   DASHBOARD.JS — Dark Premium Dashboard Logic
   Matches: reference image (horstmanager style)
   Pure Vanilla JS — no frameworks
══════════════════════════════════════════════════════ */

/* ────────────────────────────────
   AUTO-UPDATE TIMER
──────────────────────────────── */
(function initAutoUpdateBar() {
  const bar = document.getElementById('dash-autoupdate-bar');
  if (!bar) return;

  let countdown = 18;
  const countdownEl = document.getElementById('dash-countdown');
  const timeEl = document.getElementById('dash-last-time');

  function updateTime() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    if (timeEl) timeEl.textContent = `Last: ${hh}:${mm}:${ss}`;
  }

  updateTime();

  setInterval(() => {
    countdown--;
    if (countdown <= 0) countdown = 18;
    if (countdownEl) countdownEl.textContent = countdown + 's';
    if (countdown === 18) updateTime();
  }, 1000);
})();

/* ────────────────────────────────
   PC CARD RENDERER
──────────────────────────────── */

/**
 * renderDashboard(data)
 * @param {Object} data - { pcs: Array, stats: Object }
 *
 * data.pcs = [{
 *   id: 'DDC-2',
 *   version: '11.2',
 *   status: 'running' | 'offline',
 *   offlineAgo: '7h 45m ago',   // only if offline
 *   accounts: 51,
 *   pending: 1,
 *   done: 42,
 *   dead: 7
 * }]
 *
 * data.stats = {
 *   pcOnline: 5,
 *   pcOffline: 1,
 *   accounts: 0,
 *   active: 0,
 *   farming: 0,
 *   done: 0,
 *   warning: 0,
 *   dead: 0,
 *   groupKey: 'a694e7fb940a6aed8f5cb0546e84b...'
 * }
 */
function renderDashboard(data) {
  const stats = data?.stats || {};
  const pcs   = data?.pcs   || [];

  _renderStats(stats);
  _renderPcGrid(pcs);
}

/* ── Render top stat cards ── */
function _renderStats(s) {
  _setEl('dash-online-count',  s.pcOnline  ?? 0);
  _setEl('dash-offline-count', s.pcOffline ?? 0);
  _setEl('dash-accounts-count',s.accounts  ?? 0);
  _setEl('dash-active-count',  s.active    ?? 0);
  _setEl('dash-farming-count', s.farming   ?? 0);
  _setEl('dash-done-count',    s.done      ?? 0);
  _setEl('dash-warning-count', s.warning   ?? 0);
  _setEl('dash-dead-count',    s.dead      ?? 0);
  _setEl('dash-group-key',     s.groupKey  ?? '—');
}

/* ── Render PC grid ── */
function _renderPcGrid(pcs) {
  const grid = document.getElementById('pc-list');
  if (!grid) return;

  if (!pcs.length) {
    grid.innerHTML = `<div class="dash-pc-waiting">Waiting for PCs…</div>`;
    return;
  }

  grid.innerHTML = pcs.map(pc => _pcCardHTML(pc)).join('');
}

/* ── Single PC card HTML ── */
function _pcCardHTML(pc) {
  const isOffline = pc.status === 'offline';
  const cardClass = isOffline ? 'dash-pc-card offline' : 'dash-pc-card running';
  const statusBadge = isOffline
    ? `<span class="dash-pc-status offline">Offline</span>`
    : `<span class="dash-pc-status running">Running</span>`;

  const actionBtn = isOffline
    ? `<button class="dash-view-btn" onclick="handlePcView('${pc.id}')">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
         View
       </button>`
    : `<button class="dash-manage-btn" onclick="handlePcManage('${pc.id}')">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
         Manage
       </button>`;

  const offlineLine = isOffline && pc.offlineAgo
    ? `<div class="dash-pc-offline-time">${pc.offlineAgo}</div>`
    : '';

  // Color-coded stats
  const pendingColor = (pc.pending > 0) ? 'amber' : '';
  const deadColor    = (pc.dead    > 0) ? 'red'   : '';
  const doneColor    = (pc.done    > 0) ? 'green'  : '';

  return `
  <div class="${cardClass}" id="pc-card-${pc.id}">
    <div class="dash-pc-top">
      <div class="dash-pc-name-row">
        <input type="checkbox" class="dash-pc-checkbox" onchange="handlePcSelect('${pc.id}', this.checked)">
        <div>
          <div class="dash-pc-name">${pc.id} <span class="dash-pc-version">Version ${pc.version ?? '—'}</span></div>
          ${offlineLine}
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
        ${statusBadge}
        ${actionBtn}
      </div>
    </div>
    <div class="dash-pc-stats">
      <div class="dash-pc-stat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span class="s-val">${pc.accounts ?? 0}</span> accs
      </div>
      <div class="dash-pc-stat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span class="s-val ${pendingColor}">${pc.pending ?? 0}</span>
      </div>
      <div class="dash-pc-stat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span class="s-val ${doneColor}">${pc.done ?? 0}</span>
      </div>
      <div class="dash-pc-stat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <span class="s-val ${deadColor}">${pc.dead ?? 0}</span>
      </div>
    </div>
  </div>`;
}

/* ────────────────────────────────
   ACTION HANDLERS (bind to your JS)
──────────────────────────────── */

function handlePcManage(pcId) {
  console.log('[Dashboard] Manage PC:', pcId);
  // TODO: เชื่อมต่อกับ logic จัดการ PC ของคุณที่นี่
}

function handlePcView(pcId) {
  console.log('[Dashboard] View PC:', pcId);
  // TODO: เชื่อมต่อกับ logic ดู PC ออฟไลน์
}

function handlePcSelect(pcId, checked) {
  console.log('[Dashboard] Select PC:', pcId, checked);
  // TODO: multi-select logic
}

function handleFetchAll() {
  const btn = document.getElementById('dash-fetch-btn');
  if (btn) {
    btn.style.opacity = '.5';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
    }, 1200);
  }
  console.log('[Dashboard] Fetch All triggered');
  // TODO: เชื่อมต่อกับ API/Supabase fetch ของคุณ
}

function handleFilterPcs(val) {
  const cards = document.querySelectorAll('.dash-pc-card');
  const q = val.toLowerCase();
  cards.forEach(c => {
    const name = (c.id || '').replace('pc-card-', '').toLowerCase();
    c.style.display = (!q || name.includes(q)) ? '' : 'none';
  });
}

/* ────────────────────────────────
   DEMO: load sample data on Dashboard page open
   (ลบออกเมื่อเชื่อมต่อ API จริง)
──────────────────────────────── */
function loadDemoDashboard() {
  renderDashboard({
    stats: {
      pcOnline:  5,
      pcOffline: 1,
      accounts:  0,
      active:    0,
      farming:   0,
      done:      0,
      warning:   0,
      dead:      0,
      groupKey:  'a694e7fb940a6aed8f5cb0546e84b…'
    },
    pcs: [
      { id: 'DDC-2',    version: '11.2', status: 'running', accounts: 51, pending: 1, done: 42, dead: 7 },
      { id: 'DDC-3',    version: '11.2', status: 'running', accounts: 51, pending: 0, done: 35, dead: 15 },
      { id: 'DDC-4',    version: '11.2', status: 'running', accounts: 51, pending: 2, done: 39, dead: 9 },
      { id: 'DDC-5',    version: '11.2', status: 'running', accounts: 51, pending: 0, done: 35, dead: 15 },
      { id: 'HIM-MAIN', version: '11.2', status: 'running', accounts: 47, pending: 1, done: 40, dead: 6 },
      { id: 'DDC-1',    version: '11.2', status: 'offline', offlineAgo: '7h 45m ago', accounts: 51, pending: 50, done: 0, dead: 0 },
    ]
  });
}

/* ────────────────────────────────
   UTILITY
──────────────────────────────── */
function _setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}