/* ══════════════════════════════════════
   INVENTORY — Supabase Reader
   รูปดึงจากเกม Roblox ออโต้ผ่าน image field
══════════════════════════════════════ */

const INV_SB_URL = 'https://nzzsqkvjzlaszxswehkd.supabase.co';
const INV_SB_KEY = 'sb_publishable_B04udlxe_F-GxoGCoiFdBQ_LCLS9LVq';
const _invSb     = window.supabase.createClient(INV_SB_URL, INV_SB_KEY);

/* ── rarity config (ไม่มีรูป local แล้ว — รูปมาจากเกมอัตโนมัติ) ── */
const ITEM_META = {
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

const RARITY_COLOR = {
  epic:      { color: '#a855f7', glow: 'rgba(168,85,247,.25)' },
  legendary: { color: '#f59e0b', glow: 'rgba(245,158,11,.25)' },
  mythical:  { color: '#ef4444', glow: 'rgba(239,68,68,.25)'  },
  secret:    { color: '#ec4899', glow: 'rgba(236,72,153,.25)' },
};

/* ── แปลง rbxassetid://XXXXX → URL รูปจริง (ผ่าน proxy เพราะ Roblox บล็อก CORS) ── */
function rbxImgUrl(rbxImg) {
  if (!rbxImg) return '';
  // ดึง assetId จาก rbxassetid://XXXXXXXXX หรือ rbxthumb://...assetId=XXXXX
  const thumbMatch = rbxImg.match(/rbxthumb:\/\/.*?assetId=(\d+)/i);
  if (thumbMatch) {
    return `https://assetdelivery.roblox.com/v1/asset/?id=${thumbMatch[1]}`;
  }
  const assetMatch = rbxImg.match(/(\d{5,})/);
  if (assetMatch) {
    // ใช้ thumbnails API ผ่าน allorigins proxy เพื่อหลีกเลี่ยง CORS block
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.roblox.com/asset-thumbnail/image?assetId=${assetMatch[1]}&width=150&height=150&format=png`)}`;
  }
  return '';
}

/* ── cache รูปที่โหลดแล้ว เพื่อไม่ต้อง fetch ซ้ำ ── */
const _imgCache = {};
async function rbxImgUrlAsync(rbxImg, imgEl) {
  if (!rbxImg || !imgEl) return;
  const assetMatch = rbxImg.match(/(\d{5,})/);
  if (!assetMatch) return;
  const assetId = assetMatch[1];

  // ถ้า cache มีแล้วใส่เลย
  if (_imgCache[assetId]) { imgEl.src = _imgCache[assetId]; return; }

  try {
    const res = await fetch(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&returnPolicy=PlaceHolder&size=150x150&format=png&isCircular=false`
    );
    const json = await res.json();
    const url  = json?.data?.[0]?.imageUrl;
    if (url) {
      _imgCache[assetId] = url;
      imgEl.src = url;
    }
  } catch {
    // fallback: ใช้ allorigins proxy
    imgEl.src = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.roblox.com/asset-thumbnail/image?assetId=${assetId}&width=150&height=150&format=png`)}`;
  }
}

/* ── ดึง qty และ image จาก val ที่ส่งมาจากสคริปใหม่ ── */
function parseItem(val) {
  if (typeof val === 'object' && val !== null) {
    return {
      qty:   val.quantity ?? val.qty ?? 0,
      image: val.image    ?? '',
    };
  }
  return { qty: val ?? 0, image: '' };
}

function fmtQty(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toLocaleString('th-TH');
}

function timeSince(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'เมื่อกี้';
  if (m < 60) return `${m} นาทีที่แล้ว`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ชั่วโมงที่แล้ว`;
  return `${Math.floor(h / 24)} วันที่แล้ว`;
}

/* ── render card แต่ละชิ้น ── */
let _invCardId = 0;
function renderItemCard(name, qty, rbxImg) {
  const meta   = ITEM_META[name] || {};
  const rarity = meta.rarity || 'legendary';
  const rc     = RARITY_COLOR[rarity] || RARITY_COLOR.legendary;
  const label  = meta.label || rarity;
  const uid    = 'inv-img-' + (++_invCardId);

  // โหลดรูปแบบ async หลัง render เพื่อหลีก CORS
  setTimeout(() => {
    const el = document.getElementById(uid);
    if (el && rbxImg) rbxImgUrlAsync(rbxImg, el);
  }, 0);

  return `
    <div class="inv-card" style="--rc:${rc.color};--rg:${rc.glow}">
      <div class="inv-card-img-wrap">
        <img class="inv-card-img" id="${uid}" src="" alt="${name}"
             onerror="this.style.opacity='.15'">
        <div class="inv-card-glow"></div>
      </div>
      <div class="inv-card-info">
        <div class="inv-card-name">${name}</div>
        <div class="inv-card-bottom">
          <span class="inv-card-badge inv-rarity-${rarity}">${label}</span>
          <span class="inv-card-qty">x${fmtQty(qty)}</span>
        </div>
      </div>
    </div>`;
}

/* ── render section ── */
async function renderInventorySection() {
  const wrap = document.getElementById('inv-inner');
  if (!wrap) return;

  wrap.innerHTML = `<div class="inv-loading">
    <div class="inv-spinner"></div>
    <span>กำลังโหลด...</span>
  </div>`;

  try {
    const { data, error } = await _invSb
      .from('inventory')
      .select('username, items, updated_at')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      wrap.innerHTML = `<div class="inv-empty">ยังไม่มีข้อมูล — รัน script ใน Roblox ก่อนนะครับ</div>`;
      return;
    }

    const itemOrder = Object.keys(ITEM_META);

    wrap.innerHTML = data.map(row => {
      const items = row.items || {};

      const cardsHtml = itemOrder
        .filter(name => {
          const { qty } = parseItem(items[name]);
          return qty > 0;
        })
        .map(name => {
          const { qty, image } = parseItem(items[name]);
          return renderItemCard(name, qty, image);
        })
        .join('');

      return `
        <div class="inv-player-block">
          <div class="inv-player-header">
            <div class="inv-player-name">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              ${row.username}
            </div>
            <div class="inv-player-time">อัปเดต ${timeSince(row.updated_at)}</div>
          </div>
          <div class="inv-grid">
            ${cardsHtml || '<div class="inv-empty-row">ไม่มีของที่ track</div>'}
          </div>
        </div>`;
    }).join('');

  } catch (e) {
    wrap.innerHTML = `<div class="inv-empty">เกิดข้อผิดพลาด: ${e.message}</div>`;
  }
}

/* ── auto-refresh ทุก 60 วิ ── */
let _invTimer = null;
function startInventoryRefresh() {
  renderInventorySection();
  if (_invTimer) clearInterval(_invTimer);
  _invTimer = setInterval(renderInventorySection, 60000);
}