@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');

[data-theme="crimson"]     {--a:#dc2626;--ag:rgba(220,38,38,.12);--aglow:rgba(220,38,38,.3)}
[data-theme="rose"]        {--a:#f43f5e;--ag:rgba(244,63,94,.12);--aglow:rgba(244,63,94,.3)}
[data-theme="orange"]      {--a:#f97316;--ag:rgba(249,115,22,.12);--aglow:rgba(249,115,22,.3)}
[data-theme="amber"]       {--a:#f59e0b;--ag:rgba(245,158,11,.12);--aglow:rgba(245,158,11,.28)}
[data-theme="gold"]        {--a:#eab308;--ag:rgba(234,179,8,.12);--aglow:rgba(234,179,8,.28)}
[data-theme="yellow"]      {--a:#facc15;--ag:rgba(250,204,21,.1);--aglow:rgba(250,204,21,.25)}
[data-theme="caramel"]     {--a:#c47d3e;--ag:rgba(196,125,62,.12);--aglow:rgba(196,125,62,.28)}
[data-theme="gingerbread"] {--a:#b5651d;--ag:rgba(181,101,29,.12);--aglow:rgba(181,101,29,.28)}
[data-theme="mocha"]       {--a:#a0785a;--ag:rgba(160,120,90,.12);--aglow:rgba(160,120,90,.28)}
[data-theme="silver"]      {--a:#94a3b8;--ag:rgba(148,163,184,.1);--aglow:rgba(148,163,184,.22)}
[data-theme="mint"]        {--a:#34d399;--ag:rgba(52,211,153,.1);--aglow:rgba(52,211,153,.25)}
[data-theme="cobalt"]      {--a:#3b82f6;--ag:rgba(59,130,246,.12);--aglow:rgba(59,130,246,.28)}
[data-theme="violet"]      {--a:#8b5cf6;--ag:rgba(139,92,246,.12);--aglow:rgba(139,92,246,.28)}

:root{--bg:#080808;--card:#101010;--border:rgba(255,255,255,.07);--text:#ede8e0;--dim:rgba(237,232,224,.38)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Syne',sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;overflow-x:hidden}
@media(hover:hover){body{cursor:none}}
@media(hover:none){#cursor,#cursor-trail{display:none!important}}

/* Blobs */
.bg-blob{position:fixed;border-radius:50%;filter:blur(110px);pointer-events:none;z-index:0;background:var(--a);opacity:.07;will-change:transform;animation:blob 12s ease-in-out infinite}
.bg-blob-1{width:480px;height:480px;top:-160px;left:-160px}
.bg-blob-2{width:400px;height:400px;bottom:-130px;right:-130px;animation-delay:-6s;animation-direction:reverse}
@keyframes blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(16px,16px) scale(1.05)}}

/* Cursor */
#cursor{position:fixed;width:9px;height:9px;background:var(--a);border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:screen;transform:translate(-50%,-50%);transition:background .4s}
#cursor-trail{position:fixed;width:24px;height:24px;border:1px solid var(--aglow);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:border-color .4s}

/* Header */
header{position:sticky;top:0;z-index:200;width:100%;display:flex;align-items:center;justify-content:center;padding:0 20px;height:56px;background:rgba(8,8,8,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}
.header-inner{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:12px;padding:4px}
.tab-btn{display:flex;align-items:center;gap:7px;padding:7px 14px;border-radius:9px;font-family:'Space Mono',monospace;font-size:.65rem;font-weight:700;color:var(--dim);background:transparent;border:none;cursor:pointer;transition:all .25s ease;letter-spacing:.04em;-webkit-tap-highlight-color:transparent}
.tab-btn svg{width:13px;height:13px;flex-shrink:0}
.tab-btn.active{background:var(--a);color:#000;box-shadow:0 0 16px var(--aglow)}
.tab-btn.active svg{color:#000}
.tab-btn:not(.active):hover{color:var(--text);background:rgba(255,255,255,.06)}

/* Main - scroll sections */
main{display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 16px 60px;width:100%;position:relative;z-index:1}

.section{width:100%;max-width:390px;display:flex;justify-content:center;scroll-margin-top:72px}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* Card */
.card{width:100%;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:40px 36px;position:relative;box-shadow:0 40px 90px rgba(0,0,0,.7)}
.card::before{content:'';position:absolute;top:0;left:14%;right:14%;height:1px;background:linear-gradient(90deg,transparent,var(--a),transparent);opacity:.5}

/* Avatar */
.avatar-wrap{position:relative;width:86px;height:86px;margin:0 auto 18px}
.avatar{width:86px;height:86px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.07);background:#1a1a1a;display:block}
.avatar-ring{position:absolute;inset:-5px;border-radius:50%;border:1.5px solid var(--a);opacity:.4;animation:spin 9s linear infinite}
.avatar-ring::after{content:'';position:absolute;top:-3px;left:26%;width:34%;height:5px;background:var(--a);border-radius:50%;filter:blur(5px);opacity:.75}
@keyframes spin{to{transform:rotate(360deg)}}
.status-dot{position:absolute;bottom:3px;right:3px;width:15px;height:15px;border-radius:50%;border:3px solid var(--card);background:#3f3f46;transition:all .4s}
.status-dot.online{background:#22c55e;box-shadow:0 0 6px #22c55e44}
.status-dot.idle  {background:#f59e0b;box-shadow:0 0 6px #f59e0b44}
.status-dot.dnd   {background:#ef4444;box-shadow:0 0 6px #ef444444}

/* Name / Badge */
.name-row{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:4px}
.profile-name{font-size:1.8rem;font-weight:800;letter-spacing:-.4px;background:linear-gradient(145deg,var(--text) 38%,var(--a));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.badge{display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative}
.badge svg{width:20px;height:20px;color:var(--a)}
.badge.emoji{font-size:1.1rem;line-height:1}
.badge::after{content:'';position:absolute;inset:-4px;border-radius:50%;background:var(--a);opacity:0;filter:blur(7px);animation:badge-pulse 2.5s ease-in-out infinite}
@keyframes badge-pulse{0%,100%{opacity:0}50%{opacity:.3}}

.profile-bio{text-align:center;font-size:.73rem;color:var(--dim);font-family:'Space Mono',monospace;margin-bottom:8px;min-height:14px}
.status-label{display:flex;align-items:center;justify-content:center;gap:6px;font-family:'Space Mono',monospace;font-size:.65rem;color:var(--dim);margin-bottom:20px}
.status-label .dot{width:5px;height:5px;border-radius:50%;background:#3f3f46;transition:background .4s}
.status-label.online .dot{background:#22c55e}
.status-label.idle   .dot{background:#f59e0b}
.status-label.dnd    .dot{background:#ef4444}

/* Activity */
.activity{display:none;align-items:center;gap:10px;background:var(--ag);border:1px solid rgba(255,255,255,.05);border-radius:10px;padding:10px 12px;margin-bottom:16px}
.activity.show{display:flex;animation:fadeUp .3s ease}
.activity-icon{font-size:1.1rem}
.activity-type{font-size:.58rem;color:var(--a);font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:.1em;margin-bottom:2px}
.activity-detail{font-size:.71rem;color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

.divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin-bottom:16px}

/* Socials */
.socials{display:flex;flex-direction:column;gap:7px;margin-bottom:12px}
.btn{display:flex;align-items:center;gap:11px;padding:11px 15px;border-radius:10px;text-decoration:none;border:1px solid var(--border);background:rgba(255,255,255,.02);color:var(--dim);font-size:.79rem;font-weight:600;transition:transform .2s,border-color .2s,color .2s;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent}
.btn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--ag),transparent);opacity:0;transition:opacity .2s}
.btn:hover{border-color:rgba(255,255,255,.11);color:var(--text);transform:translateX(3px)}
.btn:hover::before{opacity:1}
.btn:active{transform:scale(.97)}
.btn svg{width:15px;height:15px;flex-shrink:0;position:relative}
.btn-label{flex:1;position:relative}
.btn-arrow{font-size:.58rem;opacity:.2;transition:opacity .2s,transform .2s;position:relative}
.btn:hover .btn-arrow{opacity:.6;transform:translateX(2px)}

/* Music bar */
.music-bar{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:10px;padding:9px 13px}
.music-play-btn{width:27px;height:27px;border-radius:50%;background:var(--a);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:transform .2s,box-shadow .2s;-webkit-tap-highlight-color:transparent}
.music-play-btn:hover{transform:scale(1.12);box-shadow:0 0 12px var(--aglow)}
.music-play-btn:active{transform:scale(.93)}
.music-play-btn svg{width:11px;height:11px;fill:#000}
.music-info{flex:1;overflow:hidden}
.music-title{font-size:.7rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.music-artist{font-size:.58rem;color:var(--dim);font-family:'Space Mono',monospace;margin-top:1px}
.music-viz{display:flex;align-items:flex-end;gap:2px;height:13px}
.music-viz span{width:2.5px;background:var(--a);border-radius:2px;opacity:.55;animation:bar 1s ease-in-out infinite;will-change:transform}
.music-viz span:nth-child(1){height:4px; animation-delay:0s}
.music-viz span:nth-child(2){height:10px;animation-delay:.18s}
.music-viz span:nth-child(3){height:6px; animation-delay:.32s}
.music-viz span:nth-child(4){height:12px;animation-delay:.09s}
.music-viz span:nth-child(5){height:4px; animation-delay:.24s}
.music-viz.paused span{animation-play-state:paused;opacity:.18}
@keyframes bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.28)}}

/* Music page */
.music-page-header{text-align:center;margin-bottom:20px}
.music-page-title{font-size:1rem;font-weight:800;color:var(--a);font-family:'Space Mono',monospace;letter-spacing:.08em;display:flex;align-items:center;justify-content:center;gap:8px}
.music-page-title svg{width:14px;height:14px}
.music-page-sub{font-size:.6rem;color:var(--dim);font-family:'Space Mono',monospace;margin-top:4px}
.music-grid{display:flex;flex-direction:column;gap:10px;max-height:420px;overflow-y:auto;padding-right:2px}
.music-grid::-webkit-scrollbar{width:3px}
.music-grid::-webkit-scrollbar-thumb{background:var(--ag);border-radius:2px}
.music-embed-card{background:rgba(255,255,255,.025);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s,transform .2s}
.music-embed-card:hover{border-color:rgba(255,255,255,.1);transform:translateY(-1px)}
.music-embed-card iframe{display:block;width:100%;border:none}
.music-empty{text-align:center;padding:32px 0;font-family:'Space Mono',monospace;font-size:.7rem;color:var(--dim);line-height:1.8}

/* ══════════════════
   STATS PAGE
══════════════════ */
.stats-lock{display:flex;flex-direction:column;align-items:center;padding:20px 0 8px;min-height:360px;justify-content:center}
.lock-icon{width:48px;height:48px;border-radius:50%;background:var(--ag);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.lock-icon svg{width:22px;height:22px;color:var(--a)}
.lock-title{font-size:1rem;font-weight:800;letter-spacing:.06em;margin-bottom:4px}
.lock-sub{font-size:.6rem;color:var(--dim);font-family:'Space Mono',monospace;margin-bottom:20px}
.lock-dots{display:flex;gap:10px;margin-bottom:22px}
.lock-dots span{width:10px;height:10px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);transition:all .15s}
.lock-dots span.filled{background:var(--a);border-color:var(--a);box-shadow:0 0 8px var(--aglow)}
.lock-dots.shake{animation:shake .4s ease}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
.lock-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:200px}
.lock-pad button{height:46px;border-radius:10px;border:1px solid var(--border);background:rgba(255,255,255,.03);color:var(--text);font-family:'Space Mono',monospace;font-size:.85rem;cursor:pointer;transition:all .15s;-webkit-tap-highlight-color:transparent}
.lock-pad button:hover{background:var(--ag);border-color:rgba(255,255,255,.1)}
.lock-pad button:active{transform:scale(.93)}
.lock-pad .pad-clear,.lock-pad .pad-del{color:var(--dim);font-size:.7rem}
.lock-error{font-family:'Space Mono',monospace;font-size:.6rem;color:#ef4444;margin-top:10px;opacity:0;transition:opacity .2s;min-height:16px}
.lock-error.show{opacity:1}

.stats-content{display:flex;flex-direction:column;gap:12px}
.stats-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2px}
.stats-title{font-family:'Space Mono',monospace;font-size:.62rem;color:var(--dim);letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:6px}
.stats-title svg{color:var(--a)}
.stats-online-badge{display:flex;align-items:center;gap:5px;font-family:'Space Mono',monospace;font-size:.58rem;color:var(--dim);background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:20px;padding:3px 8px;transition:all .3s}
.stats-online-badge.online{color:#22c55e;border-color:rgba(34,197,94,.2);background:rgba(34,197,94,.06)}
.stats-live-dot{width:5px;height:5px;border-radius:50%;background:currentColor;animation:pulse-dot 1.5s infinite}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}

.icon-btn{background:none;border:1px solid var(--border);border-radius:6px;padding:4px 6px;color:var(--dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;-webkit-tap-highlight-color:transparent}
.icon-btn:hover{border-color:var(--a);color:var(--a)}
.icon-btn:disabled{opacity:.4;cursor:not-allowed}
.icon-btn.spinning svg{animation:spin .7s linear infinite}

.roblox-avatar-wrap{display:flex;flex-direction:column;align-items:center;padding:10px 0 4px}
.roblox-avatar-inner{width:72px;height:72px;border-radius:14px;overflow:hidden;border:1.5px solid var(--border);background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center;margin-bottom:8px}
.roblox-avatar-inner img{width:100%;height:100%;object-fit:cover}
.roblox-avatar-placeholder{color:var(--dim)}
.roblox-name{font-size:.95rem;font-weight:800;letter-spacing:.02em}
.roblox-id-row{font-size:.58rem;color:var(--dim);font-family:'Space Mono',monospace;margin-top:2px}

.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.stat-card{background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:12px;padding:12px 14px;transition:border-color .2s,background .2s}
.stat-card:hover{border-color:rgba(255,255,255,.1);background:rgba(255,255,255,.035)}
.stat-card-icon{font-size:.95rem;margin-bottom:4px}
.stat-card-label{font-family:'Space Mono',monospace;font-size:.5rem;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px}
.stat-card-val{font-family:'Space Mono',monospace;font-size:1.2rem;font-weight:700;color:var(--a)}

.stats-update-row{display:flex;align-items:center;justify-content:space-between}
#stats-update-time{font-family:'Space Mono',monospace;font-size:.55rem;color:var(--dim)}
.stats-copy-script{display:flex;align-items:center;gap:4px;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:6px;padding:3px 8px;font-family:'Space Mono',monospace;font-size:.55rem;color:var(--dim);cursor:pointer;transition:all .2s}
.stats-copy-script:hover{border-color:var(--a);color:var(--a)}

.script-box{background:rgba(0,0,0,.4);border:1px solid var(--border);border-radius:10px;overflow:hidden;animation:fadeUp .2s ease}
.script-box-header{display:flex;align-items:center;justify-content:space-between;padding:7px 12px;border-bottom:1px solid var(--border);font-family:'Space Mono',monospace;font-size:.55rem;color:var(--dim)}
.script-box-header button{background:var(--ag);border:1px solid rgba(255,255,255,.08);border-radius:5px;color:var(--a);padding:2px 8px;font-family:'Space Mono',monospace;font-size:.55rem;cursor:pointer;transition:all .2s}
.script-box-header button:hover{background:var(--a);color:#000}
.script-box pre{padding:10px 12px;font-size:.52rem;line-height:1.6;color:#94a3b8;font-family:'Space Mono',monospace;overflow-x:auto;max-height:140px;overflow-y:auto;white-space:pre-wrap;word-break:break-all}

/* Footer */
footer{width:100%;padding:14px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:center;position:relative;z-index:1}
.footer-text{font-family:'Space Mono',monospace;font-size:.56rem;color:rgba(255,255,255,.08);letter-spacing:.15em;text-transform:uppercase}

@media(max-width:440px){
  .card{padding:32px 20px;border-radius:16px}
  .profile-name{font-size:1.55rem}
  .tab-btn{padding:6px 10px;font-size:.6rem}
  .stat-card-val{font-size:1rem}
}

/* ══════════════════
   FINANCE / CALC PAGE
══════════════════ */
.calc-card{padding:26px 24px 20px;min-height:340px}

/* Lock */
.fin-lock{display:flex;flex-direction:column;align-items:center;padding:16px 0 8px}
.fin-lock-icon{width:52px;height:52px;border-radius:50%;background:var(--ag);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--a)}
.fin-lock-title{font-size:1.1rem;font-weight:800;letter-spacing:.06em;margin-bottom:4px}
.fin-lock-sub{font-family:'Space Mono',monospace;font-size:.58rem;color:var(--dim);margin-bottom:20px}
.fin-pin-input{width:100%;padding:13px 16px;background:rgba(0,0,0,.35);border:1px solid var(--border);border-radius:12px;color:var(--text);font-family:'Space Mono',monospace;font-size:.9rem;text-align:center;letter-spacing:4px;outline:none;transition:border-color .2s;-webkit-tap-highlight-color:transparent}
.fin-pin-input:focus{border-color:var(--a);box-shadow:0 0 0 3px var(--ag)}
.fin-pin-input::placeholder{letter-spacing:2px;font-size:.75rem;color:rgba(255,255,255,.12)}
.fin-pin-err{font-family:'Space Mono',monospace;font-size:.58rem;color:#f43f5e;margin-top:10px;min-height:16px;letter-spacing:.05em}
.shake{animation:shake .35s ease}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}

/* Totals */
.fin-totals{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
.fin-total-card{background:rgba(255,255,255,.025);border:1px solid var(--border);border-radius:12px;padding:12px 14px}
.fin-total-card.main{background:var(--ag);border-color:rgba(255,255,255,.07)}
.fin-total-label{font-family:'Space Mono',monospace;font-size:.5rem;color:var(--dim);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px}
.fin-total-val{font-family:'Space Mono',monospace;font-size:1.15rem;font-weight:700;color:var(--a)}
.fin-total-val.sm{font-size:.9rem}

/* Chart */
.fin-section-label{font-family:'Space Mono',monospace;font-size:.5rem;color:var(--dim);letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px}
.fin-chart{display:flex;align-items:flex-end;gap:5px;height:80px;padding:0 2px;margin-bottom:16px}
.fin-bar-col{display:flex;flex-direction:column;align-items:center;flex:1;height:100%;gap:3px}
.fin-bar-amt{font-family:'Space Mono',monospace;font-size:.38rem;color:var(--dim);white-space:nowrap;overflow:hidden;max-width:38px;text-overflow:ellipsis;height:12px;line-height:12px}
.fin-bar-wrap{flex:1;width:100%;display:flex;align-items:flex-end;background:rgba(255,255,255,.03);border-radius:4px;overflow:hidden}
.fin-bar-fill{width:100%;background:rgba(255,255,255,.1);border-radius:4px;transition:height .4s cubic-bezier(.16,1,.3,1)}
.fin-bar-fill.today{background:var(--a);box-shadow:0 0 10px var(--aglow)}
.fin-bar-lbl{font-family:'Space Mono',monospace;font-size:.48rem;color:var(--dim)}
.fin-bar-lbl.today{color:var(--a);font-weight:700}

/* Input */
.fin-input-row{display:flex;gap:7px;align-items:center}
.fin-amount-input{width:110px;flex-shrink:0;padding:10px 11px;background:rgba(0,0,0,.3);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:'Space Mono',monospace;font-size:.72rem;outline:none;transition:border-color .2s;-webkit-tap-highlight-color:transparent}
.fin-amount-input:focus{border-color:var(--a)}
.fin-note-input{flex:1;padding:10px 11px;background:rgba(0,0,0,.3);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:'Space Mono',monospace;font-size:.68rem;outline:none;transition:border-color .2s;-webkit-tap-highlight-color:transparent}
.fin-note-input:focus{border-color:rgba(255,255,255,.12)}
.fin-amount-input::placeholder,.fin-note-input::placeholder{color:rgba(255,255,255,.14);font-size:.6rem}
.fin-add-btn{width:36px;height:36px;flex-shrink:0;border-radius:10px;background:var(--a);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#000;transition:transform .15s,box-shadow .15s;-webkit-tap-highlight-color:transparent}
.fin-add-btn:hover{transform:scale(1.08);box-shadow:0 0 14px var(--aglow)}
.fin-add-btn:active{transform:scale(.93)}

/* Logs */
.fin-logs{display:flex;flex-direction:column;gap:5px;max-height:130px;overflow-y:auto;padding-right:2px}
.fin-logs::-webkit-scrollbar{width:2px}
.fin-logs::-webkit-scrollbar-thumb{background:var(--ag);border-radius:2px}
.fin-log-row{display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:8px}
.fin-log-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.fin-log-dot.pos{background:#22c55e}
.fin-log-dot.neg{background:#f43f5e}
.fin-log-note{flex:1;font-size:.65rem;color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fin-log-time{font-family:'Space Mono',monospace;font-size:.5rem;color:rgba(255,255,255,.2)}
.fin-log-amt{font-family:'Space Mono',monospace;font-size:.65rem;font-weight:700;flex-shrink:0}
.fin-log-amt.pos{color:#22c55e}
.fin-log-amt.neg{color:#f43f5e}
.fin-empty-log{font-family:'Space Mono',monospace;font-size:.58rem;color:rgba(255,255,255,.12);text-align:center;padding:16px 0}

/* Footer actions */
.fin-foot-actions{display:flex;justify-content:space-between;margin-top:12px}
.fin-undo-btn,.fin-lock-btn{padding:5px 12px;border-radius:8px;border:1px solid var(--border);background:rgba(255,255,255,.02);color:var(--dim);font-family:'Space Mono',monospace;font-size:.55rem;cursor:pointer;transition:all .2s;-webkit-tap-highlight-color:transparent;letter-spacing:.04em}
.fin-undo-btn:hover{color:var(--text);border-color:rgba(255,255,255,.12)}
.fin-lock-btn:hover{color:#f43f5e;border-color:rgba(244,63,94,.25)}
.fin-loading{text-align:center;padding:40px 0;font-family:'Space Mono',monospace;font-size:.6rem;color:var(--dim);letter-spacing:.1em}

/* ══════════════════
   SMART CALC PAGE
══════════════════ */
.smart-input{width:100%;min-height:140px;padding:12px 14px;background:rgba(0,0,0,.35);border:1px solid var(--border);border-radius:12px;color:var(--text);font-family:'Space Mono',monospace;font-size:.65rem;line-height:1.7;outline:none;resize:vertical;transition:border-color .2s;-webkit-tap-highlight-color:transparent;margin-bottom:12px}
.smart-input:focus{border-color:var(--a)}
.smart-input::placeholder{color:rgba(255,255,255,.14)}
.smart-rows{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
.smart-row{display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(255,255,255,.025);border:1px solid var(--border);border-radius:10px}
.smart-emoji{font-size:.95rem;flex-shrink:0;width:22px;text-align:center}
.smart-name{flex:1;font-size:.68rem;font-weight:700;color:var(--text)}
.smart-qty{font-family:'Space Mono',monospace;font-size:.58rem;color:var(--dim);flex-shrink:0}
.smart-val{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--a);font-weight:700;flex-shrink:0;min-width:64px;text-align:right}
.smart-total{display:flex;justify-content:space-between;align-items:center;padding:11px 14px;background:var(--ag);border:1px solid rgba(255,255,255,.07);border-radius:11px;margin-bottom:10px;font-family:'Space Mono',monospace;font-size:.58rem;color:var(--dim)}
.smart-total-val{font-size:1.05rem;font-weight:700;color:var(--a)}
.smart-copy-btn{width:100%;padding:9px;border-radius:10px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.03);color:var(--dim);font-family:'Space Mono',monospace;font-size:.58rem;cursor:pointer;transition:all .2s;letter-spacing:.06em}
.smart-copy-btn:hover{border-color:var(--a);color:var(--a)}
.smart-empty{font-family:'Space Mono',monospace;font-size:.58rem;color:rgba(255,255,255,.2);text-align:center;padding:20px 0}

/* Rate Settings */
.smart-btn-row{display:flex;gap:8px;margin-bottom:8px}
.smart-settings-btn{flex:1;padding:9px;border-radius:10px;border:1px solid var(--border);background:rgba(255,255,255,.03);color:var(--dim);font-family:'Space Mono',monospace;font-size:.58rem;cursor:pointer;transition:all .2s;letter-spacing:.04em}
.smart-settings-btn:hover{border-color:var(--a);color:var(--a)}
.smart-copy-btn{flex:1}
.smart-settings-panel{background:rgba(0,0,0,.3);border:1px solid var(--border);border-radius:12px;padding:14px;margin-top:4px;animation:fadeUp .2s ease}
.rate-title{font-family:'Space Mono',monospace;font-size:.5rem;color:var(--dim);letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}
.rate-rows{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.rate-row{display:flex;align-items:center;gap:8px}
.rate-op{font-family:'Space Mono',monospace;font-size:.6rem;font-weight:700;padding:2px 6px;border-radius:5px;flex-shrink:0}
.rate-op.multiply{background:rgba(52,211,153,.12);color:#34d399}
.rate-op.divide{background:rgba(148,163,184,.1);color:var(--dim)}
.rate-emoji{font-size:.9rem;width:20px;text-align:center;flex-shrink:0}
.rate-name{flex:1;font-size:.65rem;font-weight:700;color:var(--text)}
.rate-input{width:80px;padding:5px 8px;background:rgba(0,0,0,.4);border:1px solid var(--border);border-radius:7px;color:var(--a);font-family:'Space Mono',monospace;font-size:.65rem;text-align:right;outline:none;transition:border-color .2s}
.rate-input:focus{border-color:var(--a)}
.rate-actions{display:flex;gap:8px}
.rate-save-btn,.rate-reset-btn{flex:1;padding:7px;border-radius:8px;border:1px solid var(--border);background:rgba(255,255,255,.02);color:var(--dim);font-family:'Space Mono',monospace;font-size:.58rem;cursor:pointer;transition:all .2s;letter-spacing:.04em}
.rate-save-btn:hover{background:var(--ag);border-color:var(--a);color:var(--a)}
.rate-reset-btn:hover{color:var(--text);border-color:rgba(255,255,255,.12)}
.rate-msg{font-family:'Space Mono',monospace;font-size:.55rem;color:#22c55e;margin-top:8px;min-height:14px;text-align:center}
.smart-top-actions{display:flex;justify-content:flex-end;margin-bottom:8px}