/* ══════════════════════════════════════
   DASHBOARD.JS — Multi-ID Overview
   - รวมของทุก ID
   - Online / Offline ตาม updated_at
   - รูปดึงจากเกม Roblox ออโต้
══════════════════════════════════════ */

const ONLINE_THRESHOLD_MIN = 1;

/* ── filter state ── */
const DASH_FILTER_KEY = 'blahexm_dash_hidden';
function dashHiddenLoad() {
  try { return JSON.parse(localStorage.getItem(DASH_FILTER_KEY)) || []; } catch { return []; }
}
function dashHiddenSave(arr) { localStorage.setItem(DASH_FILTER_KEY, JSON.stringify(arr)); }
let _dashHidden = dashHiddenLoad();

function dashIsHidden(name) { return _dashHidden.includes(name); }
function dashToggleHidden(name) {
  if (dashIsHidden(name)) _dashHidden = _dashHidden.filter(n => n !== name);
  else _dashHidden.push(name);
  dashHiddenSave(_dashHidden);
}

/* ── state ── */
let _dashData    = [];
let _dashFilter  = 'all';
let _dashSearch  = '';
let _dashSortCol = 'value';
let _dashSortAsc = false;

/* ── parse item (รองรับ format ใหม่ {quantity, image} และ format เก่า) ── */
function dashParseItem(val) {
  if (typeof val === 'object' && val !== null) {
    return {
      qty:   val.quantity ?? val.qty ?? 0,
      image: val.image    ?? '',
    };
  }
  return { qty: val ?? 0, image: '' };
}

/* ── แปลง rbxassetid → Roblox CDN URL ── */
function dashRbxImgUrl(rbxImg) {
  if (!rbxImg) return '';
  const thumbMatch = rbxImg.match(/rbxthumb:\/\/.*?assetId=(\d+)/i);
  if (thumbMatch) {
    return `https://www.roblox.com/asset-thumbnail/image?assetId=${thumbMatch[1]}&width=150&height=150&format=png`;
  }
  const assetMatch = rbxImg.match(/(\d{5,})/);
  if (assetMatch) {
    return `https://www.roblox.com/asset-thumbnail/image?assetId=${assetMatch[1]}&width=150&height=150&format=png`;
  }
  return '';
}

/* ── ดึง image ของไอเทมจากแถวแรกที่มีข้อมูล (ใช้แสดงใน summary/filter) ── */
function dashGetItemImage(name) {
  for (const row of _dashData) {
    const val = (row.items || {})[name];
    if (val && typeof val === 'object' && val.image) {
      return dashRbxImgUrl(val.image);
    }
  }
  return '';
}

/* ── helpers ── */
function isOnline(dateStr) {
  if (!dateStr) return false;
  const normalized = dateStr.replace(' ', 'T').replace(/(\+00)$/, 'Z').replace(/(\.\d+)$/, '$1Z');
  const t = new Date(normalized).getTime();
  if (isNaN(t)) return false;
  return (Date.now() - t) / 60000 <= ONLINE_THRESHOLD_MIN;
}

function calcRowValue(items) {
  const rates = (typeof SMART_RATES !== 'undefined' ? SMART_RATES : null)
             || (typeof SMART_RATES_DEFAULT !== 'undefined' ? SMART_RATES_DEFAULT : {});
  let total = 0;
  Object.entries(items || {}).forEach(([name, val]) => {
    if (dashIsHidden(name)) return;
    const { qty } = dashParseItem(val);
    const rate = rates[name];
    if (!rate || rate.divisor === 0) return;
    total += rate.multiply ? qty * rate.divisor : qty / rate.divisor;
  });
  return total;
}

function calcTotalItems(items) {
  let t = 0;
  Object.values(items || {}).forEach(val => {
    const { qty } = dashParseItem(val);
    t += qty;
  });
  return t;
}

function fmtBaht(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M฿';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K฿';
  return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '฿';
}

function fmtQtyDash(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toLocaleString('th-TH');
}

function timeSinceDash(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'เมื่อกี้';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

/* ── aggregate qty รวมทุก ID ── */
function aggregateItems(rows) {
  const totals = {};
  rows.forEach(row => {
    Object.entries(row.items || {}).forEach(([name, val]) => {
      const { qty } = dashParseItem(val);
      totals[name] = (totals[name] || 0) + qty;
    });
  });
  return totals;
}

/* ── filter & sort ── */
function getFilteredRows() {
  let rows = _dashData.map(row => ({
    ...row,
    _online: isOnline(row.updated_at),
    _value:  calcRowValue(row.items),
    _total:  calcTotalItems(row.items),
  }));

  if (_dashFilter === 'online')  rows = rows.filter(r => r._online);
  if (_dashFilter === 'offline') rows = rows.filter(r => !r._online);
  if (_dashSearch) {
    const q = _dashSearch.toLowerCase();
    rows = rows.filter(r => r.username.toLowerCase().includes(q));
  }

  rows.sort((a, b) => {
    if (_dashSortCol === 'name')    return _dashSortAsc ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
    let va, vb;
    if (_dashSortCol === 'value')   { va = a._value;   vb = b._value; }
    if (_dashSortCol === 'items')   { va = a._total;   vb = b._total; }
    if (_dashSortCol === 'updated') { va = new Date(a.updated_at||0); vb = new Date(b.updated_at||0); }
    return _dashSortAsc ? va - vb : vb - va;
  });

  return rows;
}

/* ── render ── */
function renderDashboard() {
  const wrap = document.getElementById('dash-inner');
  if (!wrap) return;

  if (_dashData.length === 0) {
    wrap.innerHTML = `<div class="dash-empty">ยังไม่มีข้อมูล — รอโหลด...</div>`;
    return;
  }

  const allRows      = _dashData.map(r => ({ ...r, _online: isOnline(r.updated_at), _value: calcRowValue(r.items) }));
  const onlineCnt    = allRows.filter(r => r._online).length;
  const offlineCnt   = allRows.length - onlineCnt;
  const totalVal     = allRows.reduce((s, r) => s + r._value, 0);
  const aggItems     = aggregateItems(_dashData);
  const filteredRows = getFilteredRows();

  const itemOrder = typeof ITEM_META !== 'undefined' ? Object.keys(ITEM_META) : Object.keys(aggItems);
  const rates     = (typeof SMART_RATES !== 'undefined' ? SMART_RATES : null)
                 || (typeof SMART_RATES_DEFAULT !== 'undefined' ? SMART_RATES_DEFAULT : {});

  /* ── Stats bar ── */
  const statsHtml = `
    <div class="dash-stats-row">
      <div class="dash-stat-card">
        <div class="dash-stat-label">ทั้งหมด</div>
        <div class="dash-stat-val">${allRows.length}</div>
        <div class="dash-stat-sub">ID</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-label">Online</div>
        <div class="dash-stat-val green">${onlineCnt}</div>
        <div class="dash-stat-sub">≤ ${ONLINE_THRESHOLD_MIN} นาที</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-label">Offline</div>
        <div class="dash-stat-val ${offlineCnt > 0 ? 'red' : ''}">${offlineCnt}</div>
        <div class="dash-stat-sub">ไม่ active</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-label">มูลค่ารวม</div>
        <div class="dash-stat-val" style="font-size:.95rem;color:#34d399">${fmtBaht(totalVal)}</div>
        <div class="dash-stat-sub">ทุก ID รวมกัน</div>
      </div>
    </div>`;

  /* ── Item summary (รูปดึงจากเกมออโต้) ── */
  const itemSummaryHtml = itemOrder
    .filter(name => (aggItems[name] || 0) > 0)
    .map(name => {
      const qty    = aggItems[name] || 0;
      const meta   = typeof ITEM_META !== 'undefined' ? (ITEM_META[name] || {}) : {};
      const rate   = rates[name];
      const rarity = meta.rarity || 'legendary';
      const rc     = (typeof RARITY_COLOR !== 'undefined' ? RARITY_COLOR[rarity] : null) || { color: '#f59e0b', glow: '' };
      const hidden = dashIsHidden(name);
      const imgSrc = dashGetItemImage(name); // รูปจากเกมออโต้

      let valStr = '—', hasVal = false;
      if (!hidden && rate && rate.divisor > 0) {
        const v = rate.multiply ? qty * rate.divisor : qty / rate.divisor;
        valStr = fmtBaht(v); hasVal = true;
      }

      return `
        <div class="dash-sum-card" style="--rc:${hidden ? '#444' : rc.color};opacity:${hidden ? '.38' : '1'};transition:opacity .2s">
          <div class="dash-sum-top">
            <img class="dash-sum-img" src="${imgSrc}" alt="${name}" onerror="this.style.opacity='.15'">
            <span class="dash-sum-name">${name}</span>
          </div>
          <div class="dash-sum-qty">x${fmtQtyDash(qty)}</div>
          <div class="dash-sum-val ${hasVal ? 'has-val' : ''}">${hidden ? '<span style="font-size:.48rem;color:var(--dim2)">ซ่อนอยู่</span>' : valStr}</div>
        </div>`;
    }).join('');

  /* ── Filter panel (รูปจากเกมออโต้) ── */
  const filterPanelHtml = itemOrder.map(name => {
    const meta   = typeof ITEM_META !== 'undefined' ? (ITEM_META[name] || {}) : {};
    const hidden = dashIsHidden(name);
    const rarity = meta.rarity || 'legendary';
    const rc     = (typeof RARITY_COLOR !== 'undefined' ? RARITY_COLOR[rarity] : null) || { color: '#f59e0b' };
    const imgSrc = dashGetItemImage(name);

    return `
      <label class="dash-filter-item ${hidden ? 'hidden' : 'visible'}" onclick="dashToggleHidden('${name}');renderDashboard()" style="cursor:pointer">
        <div style="display:flex;align-items:center;gap:8px;flex:1">
          <img src="${imgSrc}" width="20" height="20" style="object-fit:contain" onerror="this.style.display='none'">
          <span style="font-size:.6rem;color:var(--text)">${name}</span>
        </div>
        <div class="dash-filter-toggle ${hidden ? '' : 'on'}" style="--tc:${rc.color}">
          <div class="dash-filter-toggle-knob"></div>
        </div>
      </label>`;
  }).join('');

  /* ── ID table ── */
  const thArrow = col => {
    const arrow = _dashSortCol === col ? (_dashSortAsc ? '▲' : '▼') : '▾';
    return `<span class="sort-arrow">${arrow}</span>`;
  };
  const thCls = col => _dashSortCol === col ? 'sorted' : '';

  const tableRowsHtml = filteredRows.map(row => {
    const statusCls   = row._online ? 'online' : 'offline';
    const statusLabel = row._online ? 'online' : 'offline';
    const valStr      = row._value > 0 ? fmtBaht(row._value) : '—';
    const valCls      = row._value > 0 ? '' : 'zero';

    /* mini item list ในตาราง (รูปจากเกมออโต้) */
    const miniItems = itemOrder.map(name => {
      const val = (row.items || {})[name];
      const { qty, image } = dashParseItem(val);
      if (qty <= 0) return '';
      const imgSrc = dashRbxImgUrl(image);
      return `<span title="${name}: ${qty}" style="display:inline-flex;align-items:center;gap:2px;margin-right:4px;font-size:.5rem;color:var(--dim)">
        <img src="${imgSrc}" width="12" height="12" style="object-fit:contain;opacity:.8" onerror="this.style.display='none'">
        ${fmtQtyDash(qty)}
      </span>`;
    }).join('');

    return `
      <tr>
        <td style="width:32px;padding-left:12px">
          <input type="checkbox" class="dash-row-check" data-user="${row.username}" onchange="dashUpdateDeleteBtn()" style="accent-color:var(--a);cursor:pointer;width:13px;height:13px">
        </td>
        <td>
          <div class="dash-id-name">
            <span class="dash-id-status-dot ${statusCls}"></span>
            ${row.username}
          </div>
        </td>
        <td><span class="dash-id-status-badge ${statusCls}">${statusLabel}</span></td>
        <td><span class="dash-id-val ${valCls}">${valStr}</span></td>
        <td style="max-width:200px;overflow:hidden">${miniItems}</td>
        <td><span class="dash-id-time">${timeSinceDash(row.updated_at)}</span></td>
        <td>
          <button onclick="dashDeleteOne('${row.username}')" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#ef4444;border-radius:6px;padding:3px 8px;font-size:.5rem;cursor:pointer;font-family:'Geist Mono',monospace;transition:all .15s" onmouseover="this.style.background='rgba(239,68,68,.2)'" onmouseout="this.style.background='rgba(239,68,68,.1)'">🗑️</button>
        </td>
      </tr>`;
  }).join('');

  wrap.innerHTML = `
    ${statsHtml}

    <div class="dash-card" style="margin-bottom:12px;position:relative">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div class="dash-section-label" style="margin-bottom:0">ของรวมทุก ID</div>
        <button class="dash-filter-btn" onclick="dashToggleFilterPanel()" id="dash-filter-panel-btn" style="display:flex;align-items:center;gap:5px;${_dashHidden.length>0?'border-color:var(--a);color:var(--a)':''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M22 3H2l8 9.46V19l4 2V12.46L22 3z"/></svg>
          Filters${_dashHidden.length > 0 ? ` (${_dashHidden.length})` : ''}
        </button>
      </div>

      <div id="dash-filter-panel" style="display:none;background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px;margin-bottom:12px">
        <div style="font-family:'Geist Mono',monospace;font-size:.48rem;color:var(--dim2);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">แสดง / ซ่อน ไอเทม</div>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${filterPanelHtml}
        </div>
        <div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border);display:flex;gap:6px">
          <button class="dash-filter-btn" onclick="_dashHidden=[];dashHiddenSave([]);renderDashboard()" style="font-size:.5rem">✓ แสดงทั้งหมด</button>
          <button class="dash-filter-btn" onclick="dashToggleFilterPanel()" style="font-size:.5rem">ปิด</button>
        </div>
      </div>

      <div class="dash-item-summary">
        ${itemSummaryHtml || '<div class="dash-empty" style="padding:16px 0">ยังไม่มีของ</div>'}
      </div>
    </div>

    <div class="dash-card">
      <div class="dash-id-filters">
        <button class="dash-filter-btn ${_dashFilter==='all'?'active':''}" onclick="dashSetFilter('all')">ทั้งหมด (${allRows.length})</button>
        <button class="dash-filter-btn online ${_dashFilter==='online'?'active':''}" onclick="dashSetFilter('online')">🟢 Online (${onlineCnt})</button>
        <button class="dash-filter-btn offline ${_dashFilter==='offline'?'active':''}" onclick="dashSetFilter('offline')">⚫ Offline (${offlineCnt})</button>
        <button class="dash-filter-btn" id="dash-del-selected-btn" onclick="dashDeleteSelected()" style="display:none;border-color:rgba(239,68,68,.4);color:#ef4444">🗑️ ลบที่เลือก</button>
        <button class="dash-filter-btn" onclick="dashDeleteAll()" style="border-color:rgba(239,68,68,.2);color:rgba(239,68,68,.6)">🗑️ ลบทั้งหมด</button>
        <input class="dash-id-search" placeholder="ค้นหา username..." value="${_dashSearch}"
               oninput="_dashSearch=this.value;renderDashboard()">
      </div>

      <div class="dash-id-table-wrap">
        <table class="dash-id-table">
          <thead>
            <tr>
              <th style="width:32px;padding-left:12px"><input type="checkbox" id="dash-check-all" onchange="dashToggleAll(this.checked)" style="accent-color:var(--a);cursor:pointer;width:13px;height:13px"></th>
              <th class="${thCls('name')}"    onclick="dashSort('name')">Username ${thArrow('name')}</th>
              <th>Status</th>
              <th class="${thCls('value')}"   onclick="dashSort('value')">มูลค่า ${thArrow('value')}</th>
              <th>ของในคลัง</th>
              <th class="${thCls('updated')}" onclick="dashSort('updated')">อัปเดต ${thArrow('updated')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml || `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--dim2);font-size:.6rem">ไม่พบ ID ที่ตรงกัน</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/* ── controls ── */
function dashSetFilter(f) { _dashFilter = f; renderDashboard(); }

function dashSort(col) {
  if (_dashSortCol === col) _dashSortAsc = !_dashSortAsc;
  else { _dashSortCol = col; _dashSortAsc = false; }
  renderDashboard();
}

function dashToggleFilterPanel() {
  const p = document.getElementById('dash-filter-panel');
  if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

/* ── fetch from Supabase ── */
async function fetchDashboard() {
  const btn = document.getElementById('dash-refresh-btn');
  if (btn) btn.classList.add('spinning');

  const wrap = document.getElementById('dash-inner');
  if (wrap && _dashData.length === 0) {
    wrap.innerHTML = `<div class="dash-loading"><div class="dash-spinner"></div><span>กำลังโหลด...</span></div>`;
  }

  try {
    const { data, error } = await _invSb
      .from('inventory')
      .select('username, items, updated_at')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    _dashData = data || [];
    renderDashboard();
  } catch (e) {
    if (wrap) wrap.innerHTML = `<div class="dash-empty">เกิดข้อผิดพลาด: ${e.message}</div>`;
  } finally {
    if (btn) btn.classList.remove('spinning');
  }
}

/* ── auto-refresh ── */
let _dashAutoTimer = null;
function startDashboard() {
  fetchDashboard();
  if (_dashAutoTimer) clearInterval(_dashAutoTimer);
  _dashAutoTimer = setInterval(fetchDashboard, 10000);
}

/* ── checkbox helpers ── */
function dashToggleAll(checked) {
  document.querySelectorAll('.dash-row-check').forEach(c => c.checked = checked);
  dashUpdateDeleteBtn();
}

function dashUpdateDeleteBtn() {
  const cnt = document.querySelectorAll('.dash-row-check:checked').length;
  const btn = document.getElementById('dash-del-selected-btn');
  if (btn) {
    btn.style.display = cnt > 0 ? '' : 'none';
    btn.textContent = `🗑️ ลบที่เลือก (${cnt})`;
  }
  const all = document.querySelectorAll('.dash-row-check').length;
  const allBox = document.getElementById('dash-check-all');
  if (allBox) allBox.checked = cnt === all && all > 0;
}

/* ── delete ── */
async function dashDeleteOne(username) {
  if (!confirm(`ลบ "${username}" ออกจากระบบ?`)) return;
  try {
    const { error } = await _invSb.from('inventory').delete().eq('username', username);
    if (error) throw error;
    _dashData = _dashData.filter(r => r.username !== username);
    renderDashboard();
  } catch(e) { alert('ลบไม่ได้: ' + e.message); }
}

async function dashDeleteSelected() {
  const usernames = [...document.querySelectorAll('.dash-row-check:checked')].map(c => c.dataset.user);
  if (!usernames.length) return;
  if (!confirm(`ลบ ${usernames.length} ID ที่เลือก?`)) return;
  try {
    const { error } = await _invSb.from('inventory').delete().in('username', usernames);
    if (error) throw error;
    _dashData = _dashData.filter(r => !usernames.includes(r.username));
    renderDashboard();
  } catch(e) { alert('ลบไม่ได้: ' + e.message); }
}

async function dashDeleteAll() {
  if (!_dashData.length) return;
  if (!confirm(`ลบทุก ID (${_dashData.length} รายการ) ออกจากระบบ?`)) return;
  try {
    const allUsers = _dashData.map(r => r.username);
    const { error } = await _invSb.from('inventory').delete().in('username', allUsers);
    if (error) throw error;
    _dashData = [];
    renderDashboard();
  } catch(e) { alert('ลบไม่ได้: ' + e.message); }
}