<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Viora AI</title>
<link rel="icon" type="image/png" href="/V.png" />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #faf8ff; --surface: #ffffff; --border: #ede9f8;
  --violet: #7c3aed; --violet-light: #8b5cf6; --pink: #ec4899; --orange: #f97316;
  --text: #1e1030; --text-mid: #6b5b8e; --text-light: #a898c8;
  --grad-a: #7c3aed; --grad-b: #ec4899; --grad-c: #f97316;
  --font-head: 'Syne', sans-serif; --font-body: 'Plus Jakarta Sans', sans-serif;
  --red: #ef4444; --sidebar-w: 272px;
}
html, body { height: 100%; background: var(--bg); font-family: var(--font-body); color: var(--text); overflow: hidden; }

/* BG */
.mesh { position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(ellipse 60% 50% at 10% 20%, rgba(124,58,237,.12) 0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 90% 10%, rgba(236,72,153,.10) 0%, transparent 70%),
    radial-gradient(ellipse 70% 40% at 60% 90%, rgba(249,115,22,.09) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 30% 70%, rgba(6,182,212,.08) 0%, transparent 70%); }
.blob { position: fixed; border-radius: 50%; filter: blur(55px); pointer-events: none; z-index: 0; opacity: .3; animation: blobFloat 9s ease-in-out infinite alternate; }
.blob-1 { width: 320px; height: 320px; background: #c084fc; top: -80px; right: 8%; }
.blob-2 { width: 240px; height: 240px; background: #fb923c; bottom: 8%; left: -60px; animation-duration: 12s; animation-delay: -4s; }
.blob-3 { width: 200px; height: 200px; background: #22d3ee; bottom: 28%; right: -40px; animation-duration: 7s; animation-delay: -2s; }
@keyframes blobFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(18px,28px) scale(1.08); } }

/* AUTH */
.screen { position: fixed; inset: 0; z-index: 20; display: flex; align-items: center; justify-content: center; transition: opacity .35s, transform .35s; }
.screen.hidden { opacity: 0; pointer-events: none; transform: scale(.97); }
#auth-screen { flex-direction: column; padding: 20px; }
.auth-card { background: white; border: 1.5px solid var(--border); border-radius: 28px; padding: 40px 38px; width: 100%; max-width: 420px; box-shadow: 0 8px 48px rgba(124,58,237,.12); animation: fadeUp .5s ease both; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
.auth-logo { display: flex; align-items: center; gap: 10px; justify-content: center; margin-bottom: 28px; }
.auth-logo-mark { width: 44px; height: 44px; border-radius: 15px; background: linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--grad-c)); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); color: white; font-size: 1.2rem; font-weight: 800; box-shadow: 0 4px 18px rgba(124,58,237,.35); }
.auth-logo-name { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--grad-c)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.auth-tabs { display: flex; background: var(--bg); border-radius: 14px; padding: 4px; margin-bottom: 26px; gap: 4px; }
.auth-tab { flex: 1; padding: 9px; border: none; background: none; border-radius: 11px; font-family: var(--font-body); font-size: .85rem; font-weight: 600; color: var(--text-light); cursor: pointer; transition: all .2s; }
.auth-tab.active { background: white; color: var(--violet); box-shadow: 0 2px 10px rgba(124,58,237,.12); }
.auth-form { display: flex; flex-direction: column; gap: 14px; }
.auth-form.hidden { display: none; }
.field-label { font-size: .78rem; font-weight: 600; color: var(--text-mid); margin-bottom: 6px; display: block; }
.field-input { width: 100%; padding: 12px 16px; border-radius: 14px; border: 1.5px solid var(--border); background: var(--bg); font-family: var(--font-body); font-size: .9rem; color: var(--text); outline: none; transition: border-color .2s, box-shadow .2s; }
.field-input:focus { border-color: var(--violet-light); box-shadow: 0 0 0 3px rgba(124,58,237,.09); }
.field-input::placeholder { color: var(--text-light); }
.auth-error { font-size: .78rem; color: var(--red); font-weight: 500; min-height: 18px; text-align: center; }
.btn-primary { width: 100%; padding: 13px; border: none; border-radius: 16px; background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); color: white; font-family: var(--font-head); font-size: .95rem; font-weight: 700; cursor: pointer; transition: all .2s; box-shadow: 0 4px 18px rgba(124,58,237,.35); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(124,58,237,.45); }
.divider { display: flex; align-items: center; gap: 12px; font-size: .75rem; color: var(--text-light); font-weight: 500; margin: 4px 0; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.btn-try { width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: 16px; background: white; color: var(--text-mid); font-family: var(--font-head); font-size: .88rem; font-weight: 700; cursor: pointer; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-try:hover { border-color: var(--violet-light); color: var(--violet); box-shadow: 0 4px 18px rgba(124,58,237,.1); transform: translateY(-1px); }
.try-badge { background: linear-gradient(135deg, var(--grad-b), var(--grad-c)); color: white; font-size: .65rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; }

/* ── CHAT LAYOUT ── */
#chat-screen { position: fixed; inset: 0; z-index: 10; display: flex; transition: opacity .35s; }
#chat-screen.hidden { opacity: 0; pointer-events: none; }

/* ── SIDEBAR ── */
#sidebar {
  width: var(--sidebar-w); height: 100vh; flex-shrink: 0;
  background: white; border-right: 1.5px solid var(--border);
  display: flex; flex-direction: column;
  transform: translateX(0); transition: transform .3s cubic-bezier(.4,0,.2,1), width .3s;
  position: relative; z-index: 15; overflow: hidden;
}

#sidebar.collapsed {
  transform: translateX(calc(-1 * var(--sidebar-w)));
  width: 0;
}

.sidebar-header {
  padding: 18px 16px 14px;
  border-bottom: 1.5px solid var(--border);
  display: flex; align-items: center; gap: 10px; flex-shrink: 0;
}

.sidebar-logo-mark {
  width: 32px; height: 32px; border-radius: 10px;
  background: linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--grad-c));
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-head); color: white; font-size: .85rem; font-weight: 800;
  flex-shrink: 0;
}

.sidebar-logo-name {
  font-family: var(--font-head); font-size: 1rem; font-weight: 800;
  background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.btn-new-chat {
  margin: 14px 12px 10px;
  padding: 11px 16px; border: none; border-radius: 14px;
  background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
  color: white; font-family: var(--font-head); font-size: .82rem; font-weight: 700;
  cursor: pointer; transition: all .2s; display: flex; align-items: center;
  justify-content: center; gap: 8px;
  box-shadow: 0 3px 14px rgba(124,58,237,.35); flex-shrink: 0;
}

.btn-new-chat:hover { transform: translateY(-1px); box-shadow: 0 5px 20px rgba(124,58,237,.45); }
.btn-new-chat svg { width: 15px; height: 15px; }

.sidebar-section-label {
  font-size: .65rem; font-weight: 700; color: var(--text-light);
  letter-spacing: .08em; text-transform: uppercase;
  padding: 8px 16px 4px; flex-shrink: 0;
}

#chat-history-list {
  flex: 1; overflow-y: auto; padding: 4px 8px;
  scrollbar-width: thin; scrollbar-color: var(--border) transparent;
}

#chat-history-list::-webkit-scrollbar { width: 3px; }
#chat-history-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

.history-item {
  padding: 10px 12px; border-radius: 12px; cursor: pointer;
  transition: all .18s; display: flex; align-items: center; gap: 10px;
  margin-bottom: 2px; position: relative;
}

.history-item:hover { background: var(--bg); }
.history-item.active { background: rgba(124,58,237,.08); }

.history-item-icon { font-size: .9rem; flex-shrink: 0; opacity: .7; }

.history-item-text {
  flex: 1; min-width: 0;
}

.history-item-title {
  font-size: .8rem; font-weight: 600; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.history-item.active .history-item-title { color: var(--violet); }

.history-item-date {
  font-size: .65rem; color: var(--text-light); margin-top: 2px; font-weight: 500;
}

.history-item-del {
  width: 22px; height: 22px; border-radius: 6px; border: none; background: none;
  color: var(--text-light); cursor: pointer; display: none; align-items: center;
  justify-content: center; font-size: .75rem; transition: all .15s; flex-shrink: 0;
}

.history-item:hover .history-item-del { display: flex; }
.history-item-del:hover { background: rgba(239,68,68,.1); color: var(--red); }

.sidebar-empty {
  padding: 24px 16px; text-align: center;
  font-size: .8rem; color: var(--text-light); line-height: 1.6;
}

.sidebar-footer {
  padding: 12px; border-top: 1.5px solid var(--border); flex-shrink: 0;
}

.sidebar-user {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 14px;
  background: var(--bg); border: 1.5px solid var(--border);
}

.sidebar-user-av {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, var(--grad-a), var(--grad-b));
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; font-weight: 700; color: white;
}

.sidebar-user-name { font-size: .8rem; font-weight: 600; color: var(--text); flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.btn-sidebar-logout {
  width: 28px; height: 28px; border-radius: 8px; border: none; background: none;
  color: var(--text-light); cursor: pointer; display: flex; align-items: center;
  justify-content: center; transition: all .15s; font-size: .8rem;
}
.btn-sidebar-logout:hover { background: rgba(239,68,68,.1); color: var(--red); }

/* ── MAIN PANEL ── */
#main-panel {
  flex: 1; display: flex; flex-direction: column; min-width: 0;
  position: relative; z-index: 10;
}

header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px 13px;
  border-bottom: 1.5px solid var(--border);
  flex-shrink: 0; background: rgba(250,248,255,.85); backdrop-filter: blur(10px);
}

.header-left { display: flex; align-items: center; gap: 12px; }

/* Toggle sidebar button */
.btn-toggle-sidebar {
  width: 36px; height: 36px; border-radius: 11px; border: 1.5px solid var(--border);
  background: white; cursor: pointer; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 4px; transition: all .2s;
  box-shadow: 0 2px 8px rgba(0,0,0,.05);
}
.btn-toggle-sidebar:hover { border-color: var(--violet-light); box-shadow: 0 2px 12px rgba(124,58,237,.15); }
.btn-toggle-sidebar span { display: block; width: 14px; height: 1.5px; background: var(--text-mid); border-radius: 2px; transition: all .2s; }

.logo { display: flex; align-items: center; gap: 9px; }
.logo-mark { width: 34px; height: 34px; border-radius: 11px; background: linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--grad-c)); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); color: white; font-size: .9rem; font-weight: 800; animation: logoPulse 3s ease-in-out infinite; }
@keyframes logoPulse { 0%,100% { box-shadow: 0 4px 14px rgba(124,58,237,.35); } 50% { box-shadow: 0 4px 22px rgba(236,72,153,.5); } }
.logo-name { font-family: var(--font-head); font-size: 1.1rem; font-weight: 800; background: linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--grad-c)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

.header-right { display: flex; align-items: center; gap: 10px; }
#timer-pill { display: none; align-items: center; gap: 6px; background: rgba(239,68,68,.08); border: 1.5px solid rgba(239,68,68,.2); border-radius: 20px; padding: 5px 13px; font-size: .75rem; font-weight: 700; color: var(--red); animation: timerPulse 1s ease-in-out infinite; }
#timer-pill.show { display: flex; }
@keyframes timerPulse { 0%,100% { opacity: 1; } 50% { opacity: .7; } }
.status-badge { display: flex; align-items: center; gap: 6px; background: rgba(124,58,237,.07); border: 1.5px solid rgba(124,58,237,.15); border-radius: 20px; padding: 5px 13px; font-size: .72rem; font-weight: 600; color: var(--violet); }
.status-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 7px rgba(34,197,94,.7); animation: pdot 2s ease-in-out infinite; }
@keyframes pdot { 0%,100% { transform: scale(1); } 50% { transform: scale(1.35); } }
.btn-logout { padding: 6px 14px; border: 1.5px solid var(--border); border-radius: 20px; background: white; font-family: var(--font-body); font-size: .72rem; font-weight: 600; color: var(--text-mid); cursor: pointer; transition: all .2s; }
.btn-logout:hover { border-color: var(--violet-light); color: var(--violet); }

/* CHAT WINDOW */
#chat-window { flex: 1; overflow-y: auto; padding: 28px 20px 12px; display: flex; flex-direction: column; gap: 16px; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
#chat-window::-webkit-scrollbar { width: 4px; }
#chat-window::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

#welcome { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; gap: 16px; padding-bottom: 40px; animation: fadeUp .5s ease both; }
.welcome-orb { width: 76px; height: 76px; border-radius: 26px; background: linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--grad-c)); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 36px rgba(124,58,237,.38); font-family: var(--font-head); color: white; font-size: 2rem; font-weight: 800; }
#welcome h1 { font-family: var(--font-head); font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, var(--grad-a), var(--grad-b), var(--grad-c)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
#welcome p { font-size: .9rem; color: var(--text-mid); max-width: 360px; line-height: 1.7; }
.chips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 500px; margin-top: 6px; }
.chip { background: white; border: 1.5px solid var(--border); border-radius: 18px; padding: 12px 16px; font-size: .82rem; color: var(--text-mid); cursor: pointer; text-align: left; transition: all .2s; font-family: var(--font-body); font-weight: 500; line-height: 1.4; box-shadow: 0 2px 8px rgba(0,0,0,.04); }
.chip:hover { border-color: var(--violet-light); color: var(--violet); box-shadow: 0 4px 18px rgba(124,58,237,.13); transform: translateY(-2px); }

.msg { display: flex; gap: 11px; align-items: flex-end; animation: msgIn .3s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes msgIn { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.msg.user { flex-direction: row-reverse; }
.av { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: .68rem; font-weight: 700; }
.msg.ai .av { background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); color: white; box-shadow: 0 3px 10px rgba(124,58,237,.3); }
.msg.user .av { background: linear-gradient(135deg, #f97316, #fbbf24); color: white; box-shadow: 0 3px 10px rgba(249,115,22,.3); }
.bubble-wrap { display: flex; flex-direction: column; max-width: 72%; }
.bubble { padding: 13px 18px; border-radius: 22px; font-size: .91rem; line-height: 1.65; font-weight: 400; word-break: break-word; }
.msg.ai .bubble { background: white; border: 1.5px solid var(--border); color: var(--text); border-bottom-left-radius: 6px; box-shadow: 0 2px 14px rgba(0,0,0,.06); }
.msg.user .bubble { background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); color: white; border-bottom-right-radius: 6px; box-shadow: 0 4px 20px rgba(124,58,237,.35); }
.msg-time { font-size: .62rem; color: var(--text-light); margin-top: 5px; font-weight: 500; }
.msg.user .msg-time { text-align: right; }

#typing { display: none; gap: 11px; align-items: flex-end; }
#typing.show { display: flex; }
.typing-bubble { background: white; border: 1.5px solid var(--border); border-radius: 22px; border-bottom-left-radius: 6px; padding: 15px 18px; display: flex; align-items: center; gap: 5px; box-shadow: 0 2px 14px rgba(0,0,0,.06); }
.td { width: 7px; height: 7px; border-radius: 50%; background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); animation: tdB 1.1s ease-in-out infinite; }
.td:nth-child(2) { animation-delay: .18s; } .td:nth-child(3) { animation-delay: .36s; }
@keyframes tdB { 0%,60%,100% { transform: translateY(0) scale(.8); opacity:.3; } 30% { transform: translateY(-6px) scale(1); opacity:1; } }

#input-area { padding: 12px 20px 22px; flex-shrink: 0; }
.input-card { background: white; border: 1.5px solid var(--border); border-radius: 22px; padding: 12px 12px 12px 20px; display: flex; align-items: flex-end; gap: 10px; box-shadow: 0 4px 24px rgba(0,0,0,.07); transition: border-color .2s, box-shadow .2s; }
.input-card:focus-within { border-color: var(--violet-light); box-shadow: 0 4px 32px rgba(124,58,237,.14); }
.input-card.disabled { opacity: .5; pointer-events: none; }
#user-input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-family: var(--font-body); font-size: .92rem; font-weight: 400; resize: none; max-height: 120px; line-height: 1.55; scrollbar-width: thin; }
#user-input::placeholder { color: var(--text-light); }
#send-btn { width: 40px; height: 40px; border-radius: 14px; flex-shrink: 0; background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; transition: all .2s; box-shadow: 0 3px 14px rgba(124,58,237,.4); }
#send-btn:hover { transform: scale(1.08); box-shadow: 0 5px 20px rgba(124,58,237,.55); }
#send-btn:active { transform: scale(.96); }
#send-btn svg { width: 15px; height: 15px; }
.input-footer { display: flex; justify-content: space-between; padding: 7px 4px 0; }
.input-hint { font-size: .63rem; color: var(--text-light); font-weight: 500; }
#char-count { font-size: .63rem; color: var(--text-light); font-weight: 500; }

/* overlay for mobile sidebar */
#sidebar-overlay { display: none; position: fixed; inset: 0; z-index: 14; background: rgba(30,16,48,.3); backdrop-filter: blur(2px); }
#sidebar-overlay.show { display: block; }

/* TRIAL EXPIRED */
#expired-overlay { display: none; position: fixed; inset: 0; z-index: 50; background: rgba(250,248,255,.88); backdrop-filter: blur(12px); align-items: center; justify-content: center; }
#expired-overlay.show { display: flex; }
.expired-card { background: white; border: 1.5px solid var(--border); border-radius: 28px; padding: 44px 40px; text-align: center; max-width: 400px; width: 90%; box-shadow: 0 12px 56px rgba(124,58,237,.16); animation: fadeUp .4s ease both; }
.expired-icon { font-size: 3rem; margin-bottom: 16px; }
.expired-card h2 { font-family: var(--font-head); font-size: 1.6rem; font-weight: 800; background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
.expired-card p { font-size: .88rem; color: var(--text-mid); line-height: 1.7; margin-bottom: 24px; }
.hidden { display: none !important; }

@media (max-width: 640px) {
  #sidebar { position: fixed; top: 0; left: 0; bottom: 0; z-index: 16; }
  #sidebar.collapsed { transform: translateX(calc(-1 * var(--sidebar-w))); width: var(--sidebar-w); }
}

/* ── ADMIN POPUP ── */
#admin-popup-overlay{position:fixed;inset:0;z-index:100;background:rgba(30,16,48,.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .3s ease both}
#admin-popup-overlay.hidden{display:none}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.admin-popup-card{background:white;border:1.5px solid var(--border);border-radius:26px;padding:36px 34px;max-width:420px;width:100%;box-shadow:0 16px 60px rgba(124,58,237,.18);animation:fadeUp .35s ease both;text-align:center;position:relative}
.admin-popup-icon{font-size:2.6rem;margin-bottom:14px}
.admin-popup-title{font-family:var(--font-head);font-size:1.4rem;font-weight:800;margin-bottom:10px}
.admin-popup-msg{font-size:.88rem;color:var(--text-mid);line-height:1.7;margin-bottom:24px}
.admin-popup-card.info .admin-popup-title{background:linear-gradient(135deg,#06b6d4,#0284c7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.admin-popup-card.success .admin-popup-title{background:linear-gradient(135deg,#22c55e,#16a34a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.admin-popup-card.warning .admin-popup-title{background:linear-gradient(135deg,#f59e0b,#d97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.admin-popup-card.error .admin-popup-title{background:linear-gradient(135deg,#ef4444,#dc2626);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.btn-close-popup{padding:11px 32px;border:none;border-radius:14px;background:linear-gradient(135deg,var(--grad-a),var(--grad-b));color:white;font-family:var(--font-head);font-size:.9rem;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(124,58,237,.35);transition:all .2s}
.btn-close-popup:hover{transform:translateY(-1px);box-shadow:0 6px 22px rgba(124,58,237,.5)}

/* ── ADMIN POPUP ── */
#admin-popup {
  display: none; position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
  z-index: 999; min-width: 300px; max-width: 520px; width: 90%;
  border-radius: 18px; padding: 16px 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,.18);
  animation: popupIn .4s cubic-bezier(.34,1.56,.64,1) both;
  display: none; align-items: flex-start; gap: 12px;
}
#admin-popup.show { display: flex; }
@keyframes popupIn { from { opacity:0; transform:translateX(-50%) translateY(-16px) scale(.95); } to { opacity:1; transform:translateX(-50%) translateY(0) scale(1); } }
#admin-popup.pop-info    { background:#ede9ff; border: 1.5px solid #c4b5fd; }
#admin-popup.pop-success { background:#dcfce7; border: 1.5px solid #86efac; }
#admin-popup.pop-warning { background:#fef9c3; border: 1.5px solid #fde047; }
#admin-popup.pop-error   { background:#fee2e2; border: 1.5px solid #fca5a5; }
.popup-body { flex: 1; }
.popup-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 1px; }
.popup-title { font-family: var(--font-head); font-size: .82rem; font-weight: 700; margin-bottom: 3px; }
#admin-popup.pop-info    .popup-title { color: #5b21b6; }
#admin-popup.pop-success .popup-title { color: #15803d; }
#admin-popup.pop-warning .popup-title { color: #a16207; }
#admin-popup.pop-error   .popup-title { color: #b91c1c; }
.popup-text { font-size: .86rem; line-height: 1.5; }
#admin-popup.pop-info    .popup-text { color: #4c1d95; }
#admin-popup.pop-success .popup-text { color: #166534; }
#admin-popup.pop-warning .popup-text { color: #854d0e; }
#admin-popup.pop-error   .popup-text { color: #991b1b; }
.popup-close { background: none; border: none; cursor: pointer; font-size: 1rem; opacity: .6; transition: opacity .15s; padding: 2px; flex-shrink: 0; }
.popup-close:hover { opacity: 1; }

/* MEMORY BUTTON */
.btn-memory{padding:6px 14px;border:1.5px solid rgba(124,58,237,.25);border-radius:20px;background:rgba(124,58,237,.07);font-family:var(--font-body);font-size:.72rem;font-weight:600;color:var(--violet);cursor:pointer;transition:all .2s}
.btn-memory:hover{background:rgba(124,58,237,.14);border-color:var(--violet-light)}

/* MEMORY PANEL */
#memory-panel{position:fixed;top:0;right:0;bottom:0;width:360px;max-width:90vw;background:white;border-left:1.5px solid var(--border);z-index:60;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);box-shadow:-8px 0 40px rgba(124,58,237,.1)}
#memory-panel.open{transform:translateX(0)}
.memory-header{padding:18px 20px;border-bottom:1.5px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.memory-title{font-family:var(--font-head);font-size:1rem;font-weight:800;background:linear-gradient(135deg,var(--grad-a),var(--grad-b));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.memory-close{width:32px;height:32px;border-radius:10px;border:1.5px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-mid);transition:all .15s}
.memory-close:hover{background:var(--bg);color:var(--text)}
.memory-add{padding:14px 16px;border-bottom:1.5px solid var(--border);flex-shrink:0}
.memory-input-row{display:flex;gap:8px}
.memory-input{flex:1;padding:9px 14px;border-radius:12px;border:1.5px solid var(--border);background:var(--bg);font-family:var(--font-body);font-size:.85rem;color:var(--text);outline:none;transition:border-color .2s}
.memory-input:focus{border-color:var(--violet-light)}
.memory-input::placeholder{color:var(--text-light)}
.btn-add-mem{padding:9px 14px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--grad-a),var(--grad-b));color:white;font-family:var(--font-head);font-size:.8rem;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .2s}
.btn-add-mem:hover{transform:translateY(-1px)}
.memory-hint{font-size:.7rem;color:var(--text-light);margin-top:8px;line-height:1.5}
.memory-list{flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin;scrollbar-color:var(--border) transparent}
.memory-item{display:flex;align-items:flex-start;gap:10px;padding:11px 14px;background:var(--bg);border:1.5px solid var(--border);border-radius:14px;animation:fadeUp .25s ease both}
.memory-item-text{flex:1;font-size:.84rem;color:var(--text);line-height:1.5}
.memory-item-date{font-size:.65rem;color:var(--text-light);margin-top:3px}
.btn-del-mem{width:24px;height:24px;border-radius:7px;border:none;background:none;color:var(--text-light);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.75rem;transition:all .15s;flex-shrink:0}
.btn-del-mem:hover{background:rgba(239,68,68,.1);color:var(--red)}
.memory-empty{text-align:center;padding:40px 20px;color:var(--text-light);font-size:.84rem;line-height:1.7}
.memory-footer{padding:12px 16px;border-top:1.5px solid var(--border);flex-shrink:0}
.btn-clear-mem{width:100%;padding:10px;border-radius:12px;border:1.5px solid rgba(239,68,68,.2);background:rgba(239,68,68,.05);color:var(--red);font-family:var(--font-body);font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s}
.btn-clear-mem:hover{background:rgba(239,68,68,.12)}
#memory-overlay{display:none;position:fixed;inset:0;z-index:59;background:rgba(30,16,48,.2);backdrop-filter:blur(2px)}
#memory-overlay.show{display:block}

/* IMAGE MESSAGES */
.img-bubble { padding: 6px; background: white; border: 1.5px solid var(--border); border-radius: 20px; border-bottom-left-radius: 6px; box-shadow: 0 2px 14px rgba(0,0,0,.08); overflow: hidden; max-width: 360px; }
.img-bubble img { width: 100%; border-radius: 14px; display: block; cursor: pointer; transition: transform .2s; }
.img-bubble img:hover { transform: scale(1.02); }
.img-caption { font-size: .72rem; color: var(--text-light); padding: 6px 8px 2px; }
.img-lightbox { display: none; position: fixed; inset: 0; z-index: 200; background: rgba(10,6,20,.85); backdrop-filter: blur(8px); align-items: center; justify-content: center; padding: 20px; }
.img-lightbox.show { display: flex; }
.img-lightbox img { max-width: 90vw; max-height: 88vh; border-radius: 18px; box-shadow: 0 16px 80px rgba(0,0,0,.6); }
.img-lightbox-close { position: fixed; top: 20px; right: 24px; background: rgba(255,255,255,.15); border: none; color: white; font-size: 1.4rem; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; }
.img-lightbox-close:hover { background: rgba(255,255,255,.25); }

/* UPLOAD & DEEP SEARCH BUTTONS */
.btn-upload { width: 34px; height: 34px; border-radius: 10px; border: 1.5px solid var(--border); background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-mid); transition: all .2s; flex-shrink: 0; }
.btn-upload:hover { border-color: var(--violet-light); color: var(--violet); }
.btn-upload svg { width: 15px; height: 15px; }
.btn-deep { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 20px; border: 1.5px solid var(--border); background: white; font-family: var(--font-body); font-size: .72rem; font-weight: 700; color: var(--text-mid); cursor: pointer; transition: all .2s; flex-shrink: 0; }
.btn-deep:hover { border-color: var(--violet-light); color: var(--violet); background: rgba(124,58,237,.04); }
.btn-deep.active { border-color: var(--violet); color: var(--violet); background: rgba(124,58,237,.08); }
.btn-deep-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text-light); transition: background .2s; }
.btn-deep.active .btn-deep-dot { background: var(--violet); box-shadow: 0 0 6px rgba(124,58,237,.6); animation: pdot 1.5s ease-in-out infinite; }
.input-actions { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }

/* IMAGE PREVIEW */
#img-preview-wrap { display: none; padding: 8px 20px 0; }
#img-preview-wrap.show { display: flex; align-items: center; gap: 10px; }
.img-preview-thumb { width: 56px; height: 56px; border-radius: 12px; object-fit: cover; border: 1.5px solid var(--border); }
.img-preview-remove { width: 22px; height: 22px; border-radius: 50%; border: none; background: rgba(239,68,68,.1); color: var(--red); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: .75rem; transition: all .15s; }
.img-preview-remove:hover { background: rgba(239,68,68,.2); }
.img-preview-label { font-size: .75rem; color: var(--text-mid); }

/* DEEP SEARCH BUBBLE */
.deep-bubble { background: white; border: 1.5px solid var(--border); border-radius: 22px; border-bottom-left-radius: 6px; padding: 18px 22px; box-shadow: 0 2px 14px rgba(0,0,0,.06); max-width: 85%; }
.deep-bubble h1,.deep-bubble h2,.deep-bubble h3 { font-family: var(--font-head); margin: 14px 0 6px; }
.deep-bubble h1 { font-size: 1.1rem; font-weight: 800; background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.deep-bubble h2 { font-size: .95rem; font-weight: 700; color: var(--violet); border-bottom: 1px solid var(--border); padding-bottom: 4px; }
.deep-bubble h3 { font-size: .88rem; font-weight: 700; color: var(--text); }
.deep-bubble p { font-size: .88rem; line-height: 1.7; color: var(--text); margin: 6px 0; }
.deep-bubble ul,.deep-bubble ol { padding-left: 20px; margin: 6px 0; }
.deep-bubble li { font-size: .88rem; line-height: 1.7; color: var(--text); margin: 3px 0; }
.deep-bubble strong { font-weight: 700; color: var(--text); }
.deep-badge { display: inline-flex; align-items: center; gap: 5px; font-size: .68rem; font-weight: 700; color: var(--violet); background: rgba(124,58,237,.08); border: 1px solid rgba(124,58,237,.2); border-radius: 20px; padding: 2px 10px; margin-bottom: 10px; }

/* ── WEATHER CARD ── */
.weather-card {
  max-width: 440px; border-radius: 26px; overflow: hidden; color: white;
  box-shadow: 0 20px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(139,92,246,.15);
  font-family: var(--font-body); position: relative;
}
.wc-hero {
  background: linear-gradient(145deg, #0d0520 0%, #130a2e 30%, #0a1830 70%, #060d1f 100%);
  padding: 22px 22px 20px; position: relative; overflow: hidden;
}
.wc-hero::before {
  content: ''; position: absolute; inset: 0; opacity: .5;
  background: radial-gradient(ellipse 80% 60% at 90% 0%, rgba(139,92,246,.35) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 10% 100%, rgba(236,72,153,.2) 0%, transparent 60%);
}
.wc-hero::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 28px 28px;
}
.wc-top-row { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; position:relative; z-index:1; }
.wc-location { font-size: .7rem; font-weight: 700; color: rgba(255,255,255,.55); letter-spacing: .08em; text-transform: uppercase; display: flex; align-items: center; gap: 5px; }
.wc-location svg { opacity: .6; flex-shrink: 0; }
.wc-badge { font-size: .58rem; font-weight: 800; color: rgba(196,167,255,.9); letter-spacing: .07em; text-transform: uppercase; background: rgba(139,92,246,.2); border: 1px solid rgba(139,92,246,.35); padding: 3px 10px; border-radius: 20px; }
.wc-main { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; }
.wc-temp-block { flex: 1; }
.wc-temp { font-size: 5.5rem; font-weight: 900; line-height: .85; letter-spacing: -.05em; background: linear-gradient(160deg, #ffffff 40%, rgba(196,167,255,.6) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline-block; }
.wc-temp-unit { font-size: 2rem; font-weight: 300; color: rgba(255,255,255,.35); vertical-align: super; font-family: var(--font-body); }
.wc-feels { font-size: .72rem; color: rgba(255,255,255,.38); margin-top: 8px; letter-spacing: .02em; }
.wc-desc-text { font-size: .82rem; color: rgba(255,255,255,.7); font-weight: 600; margin-top: 3px; }
.wc-right { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.wc-icon { font-size: 5rem; line-height: 1; filter: drop-shadow(0 6px 20px rgba(0,0,0,.5)); animation: weatherFloat 4s ease-in-out infinite; }
@keyframes weatherFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.wc-body { background: linear-gradient(180deg, #0a0f1e 0%, #0d1525 100%); padding: 16px 18px 18px; }
.wc-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
.wc-stat { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 16px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; transition: background .2s; }
.wc-stat:hover { background: rgba(139,92,246,.1); border-color: rgba(139,92,246,.2); }
.wc-stat-icon { font-size: 1.3rem; flex-shrink: 0; }
.wc-stat-label { font-size: .6rem; color: rgba(255,255,255,.35); font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }
.wc-stat-val { font-size: .9rem; color: rgba(255,255,255,.95); font-weight: 800; margin-top: 2px; }
.wc-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(139,92,246,.25), transparent); margin: 4px 0 14px; }
.wc-forecast-label { font-size: .6rem; font-weight: 800; color: rgba(139,92,246,.7); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px; }
.wc-forecast { display: flex; gap: 7px; overflow-x: auto; padding-bottom: 3px; scrollbar-width: none; }
.wc-forecast::-webkit-scrollbar { display: none; }
.wc-day { flex: 1; min-width: 52px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.06); border-radius: 16px; padding: 11px 4px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 6px; transition: all .2s; cursor: default; }
.wc-day:hover { background: rgba(139,92,246,.12); border-color: rgba(139,92,246,.25); }
.wc-day.today { background: linear-gradient(135deg, rgba(139,92,246,.2), rgba(236,72,153,.12)); border-color: rgba(139,92,246,.4); box-shadow: 0 0 20px rgba(139,92,246,.15); }
.wc-day-name { font-size: .6rem; font-weight: 800; color: rgba(255,255,255,.4); text-transform: uppercase; letter-spacing: .05em; }
.wc-day.today .wc-day-name { color: rgba(196,167,255,.95); }
.wc-day-icon { font-size: 1.4rem; }
.wc-day-high { font-size: .84rem; font-weight: 800; color: white; }
.wc-day-low { font-size: .68rem; color: rgba(255,255,255,.3); font-weight: 600; }
.wc-open-maps { display:flex; align-items:center; justify-content:center; gap:7px; margin-top:14px; padding:10px; border-radius:14px; border:1px solid rgba(139,92,246,.2); background:rgba(139,92,246,.07); color:rgba(196,167,255,.7); font-size:.72rem; font-weight:700; text-decoration:none; transition:all .2s; letter-spacing:.02em; }
.wc-open-maps:hover { background:rgba(139,92,246,.18); color:rgba(196,167,255,1); border-color:rgba(139,92,246,.45); }

/* MAP CARD */
.map-card { background: white; border: 1.5px solid var(--border); border-radius: 24px; overflow: hidden; max-width: 440px; box-shadow: 0 8px 32px rgba(0,0,0,.1); }
.map-card-header { padding: 14px 16px 12px; background: linear-gradient(135deg, rgba(124,58,237,.06), rgba(236,72,153,.03)); border-bottom: 1px solid var(--border); display:flex; align-items:center; gap:12px; }
.map-card-icon { width:40px; height:40px; border-radius:12px; background:linear-gradient(135deg,#7c3aed,#ec4899); display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; box-shadow:0 4px 14px rgba(124,58,237,.3); }
.map-card-title { font-family:var(--font-head); font-size:.9rem; font-weight:800; color:var(--text); }
.map-card-sub { font-size:.7rem; color:var(--text-light); margin-top:2px; display:flex; align-items:center; gap:4px; }
.map-iframe-wrap { position:relative; width:100%; height:240px; background:#f0edf8; }
.map-iframe-wrap iframe { width:100%; height:100%; border:none; display:block; }
.map-card-footer { padding:11px 14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; background: rgba(124,58,237,.02); border-top: 1px solid var(--border); }
.map-open-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 18px; border-radius:12px; background:linear-gradient(135deg,#7c3aed,#ec4899); color:white; font-family:var(--font-head); font-size:.76rem; font-weight:700; text-decoration:none; transition:all .2s; box-shadow:0 3px 12px rgba(124,58,237,.3); }
.map-open-btn:hover { transform:translateY(-1px); box-shadow:0 5px 18px rgba(124,58,237,.4); }
.map-hint { font-size:.68rem; color:var(--text-light); }

/* ── VIEW OTHER AIs BUTTON ── */
.btn-other-ais {
  width: calc(100% - 20px); margin: 6px 10px 4px;
  padding: 10px 14px; border-radius: 14px;
  border: 1.5px solid rgba(124,58,237,.28);
  background: rgba(124,58,237,.08);
  color: var(--violet-light); font-family: var(--font-body);
  font-size: .8rem; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; gap: 8px; transition: all .2s;
}
.btn-other-ais:hover { background: rgba(124,58,237,.16); border-color: rgba(124,58,237,.55); transform: translateY(-1px); }

/* ── AI TOOLS MODAL ── */
#ai-modal { display:none; position:fixed; inset:0; z-index:90; background:rgba(10,6,20,.78); backdrop-filter:blur(8px); align-items:center; justify-content:center; padding:16px; }
#ai-modal.show { display:flex; }
.aim-card { background:var(--card); border:1.5px solid var(--border); border-radius:24px; width:100%; max-width:580px; max-height:90vh; overflow:hidden; display:flex; flex-direction:column; animation:fadeUp .3s ease both; }
.aim-head { padding:20px 24px 0; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
.aim-title { font-family:var(--font-head); font-size:1.1rem; font-weight:800; background:linear-gradient(135deg,var(--grad-a),var(--grad-b)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.aim-close { width:32px; height:32px; border-radius:50%; border:1.5px solid var(--border); background:none; color:var(--text-mid); cursor:pointer; font-size:.9rem; display:flex; align-items:center; justify-content:center; transition:all .2s; }
.aim-close:hover { background:var(--surface); color:var(--text); }
.aim-tabs { display:flex; gap:6px; padding:14px 24px 0; flex-shrink:0; overflow-x:auto; }
.aim-tab { padding:7px 16px; border-radius:20px; border:1.5px solid var(--border); background:none; font-family:var(--font-body); font-size:.77rem; font-weight:700; color:var(--text-mid); cursor:pointer; white-space:nowrap; transition:all .2s; flex-shrink:0; }
.aim-tab.active { background:linear-gradient(135deg,var(--grad-a),var(--grad-b)); border-color:transparent; color:white; }
.aim-body { overflow-y:auto; padding:16px 24px 24px; flex:1; }
.aim-panel { display:none; }
.aim-panel.show { display:block; }

/* OTHER AIs GRID */
.other-ais-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:4px; }
@media(max-width:480px){.other-ais-grid{grid-template-columns:1fr;}}
.other-ai-card { border:1.5px solid var(--border); border-radius:16px; padding:16px 14px; background:var(--surface); cursor:pointer; text-decoration:none; display:flex; flex-direction:column; gap:8px; transition:all .22s; }
.other-ai-card:hover { border-color:rgba(124,58,237,.45); background:rgba(124,58,237,.05); transform:translateY(-2px); box-shadow:0 6px 24px rgba(124,58,237,.1); }
.oac-logo { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; flex-shrink:0; }
.oac-name { font-family:var(--font-head); font-size:.9rem; font-weight:800; color:var(--text); }
.oac-desc { font-size:.73rem; color:var(--text-mid); line-height:1.5; }
.oac-tag { display:inline-block; font-size:.63rem; font-weight:700; padding:2px 9px; border-radius:20px; margin-top:2px; }

/* HUMANIZER */
.hum-wrap { display:flex; flex-direction:column; gap:14px; margin-top:4px; }
.hum-label { font-size:.78rem; font-weight:700; color:var(--text-mid); margin-bottom:5px; }
.hum-ta { width:100%; min-height:120px; border-radius:14px; border:1.5px solid var(--border); background:var(--surface); color:var(--text); font-family:var(--font-body); font-size:.84rem; padding:12px 14px; resize:vertical; outline:none; transition:border-color .2s; box-sizing:border-box; }
.hum-ta:focus { border-color:var(--violet-light); }
.hum-opts { display:flex; gap:7px; flex-wrap:wrap; }
.hum-opt { padding:6px 14px; border-radius:20px; border:1.5px solid var(--border); background:none; font-family:var(--font-body); font-size:.75rem; font-weight:700; color:var(--text-mid); cursor:pointer; transition:all .2s; }
.hum-opt.sel { background:linear-gradient(135deg,var(--grad-a),var(--grad-b)); border-color:transparent; color:white; }
.btn-humanize { padding:11px 22px; border-radius:14px; border:none; background:linear-gradient(135deg,var(--grad-a),var(--grad-b)); color:white; font-family:var(--font-head); font-size:.85rem; font-weight:700; cursor:pointer; transition:all .2s; box-shadow:0 4px 16px rgba(124,58,237,.3); align-self:flex-start; }
.btn-humanize:hover { transform:translateY(-1px); box-shadow:0 6px 22px rgba(124,58,237,.4); }
.btn-humanize:disabled { opacity:.6; cursor:not-allowed; transform:none; }
.hum-result-wrap { display:none; }
.hum-result-wrap.show { display:flex; flex-direction:column; gap:8px; }
.hum-result { border-radius:14px; border:1.5px solid rgba(124,58,237,.25); background:rgba(124,58,237,.05); padding:14px; font-size:.84rem; color:var(--text); line-height:1.75; white-space:pre-wrap; }
.hum-copy { align-self:flex-start; padding:7px 16px; border-radius:10px; border:1.5px solid var(--border); background:none; color:var(--text-mid); font-family:var(--font-body); font-size:.75rem; font-weight:600; cursor:pointer; transition:all .2s; }
.hum-copy:hover { border-color:var(--violet-light); color:var(--violet); }

/* ── LANDING PAGE ── */
#landing-screen { position: fixed; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg); overflow: hidden; }
#landing-screen.hidden { display: none; }

/* animated orbs */
.landing-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; animation: orbFloat 8s ease-in-out infinite; }
.landing-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(124,58,237,.22) 0%, transparent 70%); top: -100px; left: -100px; animation-delay: 0s; }
.landing-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(236,72,153,.18) 0%, transparent 70%); bottom: -80px; right: -80px; animation-delay: -4s; }
.landing-orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(99,102,241,.15) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: -2s; }
@keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(.97)} }

/* grid lines bg */
.landing-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(124,58,237,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.06) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }

/* content */
.landing-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px; max-width: 700px; }
.landing-badge { display: inline-flex; align-items: center; gap: 7px; padding: 6px 16px; border-radius: 20px; border: 1px solid rgba(124,58,237,.3); background: rgba(124,58,237,.08); font-size: .75rem; font-weight: 700; color: var(--violet-light); margin-bottom: 28px; letter-spacing: .04em; }
.landing-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--violet); box-shadow: 0 0 8px var(--violet); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.8)} }
.landing-h1 { font-family: var(--font-head); font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 900; line-height: 1.1; letter-spacing: -.03em; color: var(--text); margin-bottom: 20px; }
.landing-h1 .grad { background: linear-gradient(135deg, var(--grad-a) 0%, var(--grad-b) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.landing-sub { font-size: clamp(.95rem, 2vw, 1.12rem); color: var(--text-mid); line-height: 1.7; max-width: 520px; margin-bottom: 40px; }
.landing-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.landing-btn-primary { padding: 14px 32px; border-radius: 16px; border: none; background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); color: white; font-family: var(--font-head); font-size: 1rem; font-weight: 700; cursor: pointer; transition: all .25s; box-shadow: 0 6px 28px rgba(124,58,237,.4); }
.landing-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(124,58,237,.5); }
.landing-btn-outline { padding: 14px 32px; border-radius: 16px; border: 1.5px solid var(--border); background: white; color: var(--text); font-family: var(--font-head); font-size: 1rem; font-weight: 700; cursor: pointer; transition: all .25s; }
.landing-btn-outline:hover { border-color: var(--violet-light); color: var(--violet); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(124,58,237,.1); }
.landing-features { display: flex; gap: 28px; margin-top: 52px; flex-wrap: wrap; justify-content: center; }
.landing-feat { display: flex; align-items: center; gap: 7px; font-size: .78rem; color: var(--text-mid); font-weight: 600; }
.landing-feat-icon { font-size: 1rem; }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
<div class="mesh"></div>
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<div class="blob blob-3"></div>

<!-- AUTH SCREEN -->
<div id="landing-screen">
  <!-- Particle stars -->
  <canvas id="landing-canvas" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;"></canvas>

  <!-- Top nav -->
  <nav style="position:absolute;top:0;left:0;right:0;padding:20px 40px;display:flex;align-items:center;justify-content:space-between;z-index:3;">
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-weight:900;color:white;font-size:.9rem;">V</div>
      <span style="font-family:var(--font-head);font-weight:800;font-size:1rem;color:var(--text);">Viora AI</span>
    </div>
    <button onclick="showAuth('login')" style="padding:8px 20px;border-radius:12px;border:1.5px solid var(--border);background:white;font-family:var(--font-body);font-size:.82rem;font-weight:700;color:var(--text-mid);cursor:pointer;transition:all .2s;" onmouseenter="this.style.borderColor='#7c3aed';this.style.color='#7c3aed'" onmouseleave="this.style.borderColor='var(--border)';this.style.color='var(--text-mid)'">Log in</button>
  </nav>

  <!-- Main content -->
  <div class="landing-content">
    <!-- Glowing ring behind V -->
    <div style="position:relative;margin-bottom:32px;">
      <div style="position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.3) 0%,transparent 70%);animation:orbFloat 4s ease-in-out infinite;"></div>
      <div style="width:80px;height:80px;border-radius:24px;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-size:2.2rem;font-weight:900;color:white;box-shadow:0 16px 48px rgba(124,58,237,.5);position:relative;">V</div>
    </div>

    <h1 class="landing-h1" style="font-size:clamp(2.6rem,7vw,4.4rem);">Meet <span class="grad">Viora.</span><br>Think smarter.</h1>
    <p class="landing-sub">The AI that writes, creates, remembers, and reasons —<br>all from a single conversation.</p>

    <div class="landing-btns">
      <button class="landing-btn-primary" onclick="showAuth('signup')" style="font-size:1rem;padding:15px 36px;border-radius:18px;display:flex;align-items:center;gap:10px;">
        <span>Start for free</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <button class="landing-btn-outline" onclick="showAuth('login')" style="font-size:1rem;padding:15px 36px;border-radius:18px;">Log in</button>
    </div>


  </div>

  <!-- Bottom tagline -->
  <div style="position:absolute;bottom:24px;font-size:.72rem;color:var(--text-light);letter-spacing:.04em;">Built with ❤️ · Viora AI</div>
</div>

<div class="screen" id="auth-screen" style="display:none;">
  <div class="auth-card">
    <div class="auth-logo">
      <div class="auth-logo-mark">V</div>
      <span class="auth-logo-name">Viora AI</span>
    </div>
    <div class="auth-tabs">
      <button class="auth-tab active" onclick="switchTab('login')">Log In</button>
      <button class="auth-tab" onclick="switchTab('signup')">Sign Up</button>
    </div>
    <div class="auth-form" id="login-form">
      <div><label class="field-label">Email</label><input class="field-input" type="email" id="login-email" placeholder="you@example.com" /></div>
      <div><label class="field-label">Password</label><input class="field-input" type="password" id="login-password" placeholder="••••••••" /></div>
      <div class="auth-error" id="login-error"></div>
      <button class="btn-primary" onclick="doLogin()">Log In →</button>
      <div class="divider">or</div>
      <button class="btn-try" onclick="startTrial()">⚡ Try for free <span class="try-badge">5 min</span></button>
    </div>
    <div class="auth-form hidden" id="signup-form">
      <div><label class="field-label">Your Name</label><input class="field-input" type="text" id="signup-name" placeholder="Jane Doe" /></div>
      <div><label class="field-label">Email</label><input class="field-input" type="email" id="signup-email" placeholder="you@example.com" /></div>
      <div><label class="field-label">Password</label><input class="field-input" type="password" id="signup-password" placeholder="Min. 6 characters" /></div>
      <div class="auth-error" id="signup-error"></div>
      <button class="btn-primary" onclick="doSignup()">Create Account →</button>
      <div class="divider">or</div>
      <button class="btn-try" onclick="startTrial()">⚡ Try for free <span class="try-badge">5 min</span></button>
    </div>
  </div>
</div>

<!-- CHAT SCREEN -->
<div id="chat-screen" class="hidden">
  <!-- Sidebar overlay (mobile) -->
  <div id="sidebar-overlay" onclick="toggleSidebar()"></div>

  <!-- SIDEBAR -->
  <div id="sidebar" class="collapsed">
    <div class="sidebar-header">
      <div class="sidebar-logo-mark">V</div>
      <span class="sidebar-logo-name">Viora AI</span>
    </div>
    <button class="btn-new-chat" onclick="newChat()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      New Chat
    </button>
    <div class="sidebar-section-label">Recent Chats</div>
    <div id="chat-history-list">
      <div class="sidebar-empty" id="history-empty">No chats yet.<br>Start a conversation!</div>
    </div>
    <div style="padding:0 0 4px;display:flex;flex-direction:column;gap:6px;">
      <button class="btn-other-ais" id="sidebar-memory-btn" onclick="toggleMemoryPanel()" style="display:none;">🧠 Memory</button>
      <button class="btn-other-ais" onclick="openAiModal()">🤖 View other AIs</button>
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="sidebar-user-av" id="sidebar-av">U</div>
        <span class="sidebar-user-name" id="sidebar-username">User</span>
        <button class="btn-sidebar-logout" onclick="doLogout()" title="Log out">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- MAIN PANEL -->
  <div id="main-panel">
    <header>
      <div class="header-left">
        <button class="btn-toggle-sidebar" onclick="toggleSidebar()" title="Toggle sidebar">
          <span></span><span></span><span></span>
        </button>
        <div class="logo">
          <div class="logo-mark">V</div>
          <span class="logo-name">Viora AI</span>
        </div>
      </div>
      <div class="header-right">
        <div id="timer-pill"><span>⏱</span><span id="timer-display">5:00</span></div>
        <div class="status-badge"><div class="status-dot"></div><span id="user-label">Online</span></div>
        <button class="btn-memory" id="btn-memory" onclick="toggleMemoryPanel()" title="My Memory" style="display:none">🧠 Memory</button>
        <button class="btn-logout" id="header-logout-btn" onclick="doLogout()">Log out</button>
      </div>
    </header>

    <div id="chat-window">
      <div id="welcome">
        <div class="welcome-orb">V</div>
        <h1>Hey, I'm Viora ✦</h1>
        <p id="welcome-sub">Your AI assistant — ask me anything.</p>
        <div class="chips-grid">
          <button class="chip" onclick="quickSend(this)">✍️ Write a short story opening</button>
          <button class="chip" onclick="quickSend(this)">💡 Give me a creative business idea</button>
          <button class="chip" onclick="quickSend(this)">🐍 Explain Python list comprehensions</button>
          <button class="chip" onclick="quickSend(this)">🎯 Best productivity tips?</button>
        </div>
      </div>
      <div id="typing">
        <div class="av" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:.68rem;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">V</div>
        <div class="typing-bubble"><div class="td"></div><div class="td"></div><div class="td"></div></div>
      </div>
    </div>

    <div id="input-area">
      <div id="img-preview-wrap">
        <img id="img-preview-thumb" class="img-preview-thumb" src="" alt="preview" />
        <div>
          <div class="img-preview-label">Image attached</div>
          <button class="img-preview-remove" onclick="removeImage()">✕</button>
        </div>
      </div>
      <div class="input-card" id="input-card">
        <div class="input-actions">
          <button class="btn-upload" onclick="document.getElementById('img-file-input').click()" title="Upload image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </button>
          <button class="btn-deep" id="btn-deep" onclick="toggleDeepSearch()" title="Deep Search mode">
            <div class="btn-deep-dot"></div>Deep
          </button>
        </div>
        <textarea id="user-input" rows="1" placeholder="Ask Viora anything…" maxlength="4000"></textarea>
        <button id="send-btn" onclick="sendMessage()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <div class="input-footer">
        <span class="input-hint" id="input-hint-text">Enter to send · Shift+Enter for new line</span>
        <span id="char-count">0 / 4000</span>
      </div>
    </div>
    <input type="file" id="img-file-input" accept="image/*" style="display:none" onchange="handleImageUpload(event)" />
  </div>
</div>

<!-- TRIAL EXPIRED -->
<div id="expired-overlay">
  <div class="expired-card">
    <div class="expired-icon">⏰</div>
    <h2>Trial Ended</h2>
    <p>Your 5-minute free trial is up! Sign up for a free account to keep chatting with Viora.</p>
    <button class="btn-primary" onclick="goToSignup()" style="margin-bottom:12px;">Create Free Account →</button>
    <button class="btn-try" onclick="doLogout()">Back to Login</button>
  </div>
</div>

<script>
// ── Session (kept in localStorage for persistence across refreshes) ──
const SESSION_KEY = 'viora_session';
const CHAT_STATE_KEY = 'viora_chat_state';
const getSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } };
const saveSession = s => localStorage.setItem(SESSION_KEY, JSON.stringify(s));
const getChatState = () => { try { return JSON.parse(localStorage.getItem(CHAT_STATE_KEY) || 'null'); } catch { return null; } };
const saveChatState = s => localStorage.setItem(CHAT_STATE_KEY, JSON.stringify(s));
const clearChatState = () => localStorage.removeItem(CHAT_STATE_KEY);

// ── State ──
let currentChatId = null;
let history = [];
let busy = false;
let trialSeconds = 300;
let timerInterval = null;
let sidebarOpen = false;

// ── Auth ──
function showAuth(tab) {
  document.getElementById('landing-screen').classList.add('hidden');
  document.getElementById('auth-screen').style.display = '';
  switchTab(tab || 'login');
}

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => t.classList.toggle('active', (tab==='login'&&i===0)||(tab==='signup'&&i===1)));
  document.getElementById('login-form').classList.toggle('hidden', tab!=='login');
  document.getElementById('signup-form').classList.toggle('hidden', tab!=='signup');
}

async function doLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pw = document.getElementById('login-password').value;
  const err = document.getElementById('login-error');
  err.textContent = '';
  if (!email || !pw) { err.textContent = 'Please fill in all fields.'; return; }
  err.textContent = 'Logging in…';
  try {
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: pw }) });
    const data = await res.json();
    if (!res.ok) { err.textContent = data.error || 'Login failed.'; return; }
    err.textContent = '';
    saveSession({ email, name: data.name, isTrial: false });
    openChat(data.name, false, email);
  } catch { err.textContent = 'Network error. Try again.'; }
}

async function doSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const pw = document.getElementById('signup-password').value;
  const err = document.getElementById('signup-error');
  err.textContent = '';
  if (!name || !email || !pw) { err.textContent = 'Please fill in all fields.'; return; }
  if (pw.length < 6) { err.textContent = 'Password must be at least 6 characters.'; return; }
  if (!email.includes('@')) { err.textContent = 'Please enter a valid email.'; return; }
  err.textContent = 'Creating account…';
  try {
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password: pw }) });
    const data = await res.json();
    if (!res.ok) { err.textContent = data.error || 'Signup failed.'; return; }
    err.textContent = '';
    saveSession({ email, name: data.name, isTrial: false });
    openChat(data.name, false, email);
  } catch { err.textContent = 'Network error. Try again.'; }
}

async function startTrial() {
  const btns = document.querySelectorAll('.btn-try');
  btns.forEach(b => { b.textContent = 'Checking…'; b.disabled = true; });
  try {
    const res = await fetch('/api/trial-start', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    const data = await res.json();
    if (!data.allowed) {
      const activeForm = document.querySelector('.auth-form:not(.hidden)');
      const errEl = activeForm ? activeForm.querySelector('.auth-error') : document.getElementById('login-error');
      errEl.textContent = '⚠️ Sorry, you have already used your free trial.';
      btns.forEach(b => { b.innerHTML = '⚡ Try for free <span class="try-badge">5 min</span>'; b.disabled = false; });
      return;
    }
  } catch(e) {}
  btns.forEach(b => { b.innerHTML = '⚡ Try for free <span class="try-badge">5 min</span>'; b.disabled = false; });
  saveSession({ name: 'Guest', isTrial: true });
  openChat('Guest', true, null);
}

function doLogout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CHAT_STATE_KEY);
  clearTimer();
  history = []; currentChatId = null;
  clearChatWindow();
  document.getElementById('welcome').style.display = '';
  document.getElementById('expired-overlay').classList.remove('show');
  document.getElementById('chat-screen').classList.add('hidden');
  document.getElementById('btn-memory').style.display = 'none';
  document.getElementById('sidebar-memory-btn').style.display = 'none';
  if (memoryOpen) toggleMemoryPanel();
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('landing-screen').classList.remove('hidden');
  document.getElementById('input-card').classList.remove('disabled');
  document.getElementById('input-hint-text').textContent = 'Enter to send · Shift+Enter for new line';
  if (sidebarOpen) toggleSidebar();
}

function goToSignup() { doLogout(); switchTab('signup'); }

function openChat(name, isTrial, email) {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('chat-screen').classList.remove('hidden');
  document.getElementById('user-label').textContent = name;
  document.getElementById('sidebar-av').textContent = name[0].toUpperCase();
  document.getElementById('sidebar-username').textContent = name;

  if (isTrial) {
    document.getElementById('welcome-sub').textContent = 'You have 5 minutes to explore. Sign up to unlock unlimited access!';
    document.getElementById('header-logout-btn').style.display = '';
    document.querySelector('.btn-toggle-sidebar').style.visibility = 'hidden';
    startTimer();
  } else {
    document.getElementById('welcome-sub').textContent = 'Your AI assistant — ask me anything. Writing, coding, ideas, and more.';
    document.getElementById('btn-memory').style.display = '';
    document.getElementById('sidebar-memory-btn').style.display = '';
    document.getElementById('header-logout-btn').style.display = 'none'; // sidebar has logout
    document.querySelector('.btn-toggle-sidebar').style.visibility = '';
    renderHistory(email);
    // Restore last chat on refresh
    const savedChatId = localStorage.getItem(CHAT_STATE_KEY) ? JSON.parse(localStorage.getItem(CHAT_STATE_KEY))?.chatId : null;
    if (savedChatId) {
      loadChat(savedChatId);
    } else {
      startNewChat();
    }
  }
}

// ── Sidebar ──
function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  document.getElementById('sidebar').classList.toggle('collapsed', !sidebarOpen);
  document.getElementById('sidebar-overlay').classList.toggle('show', sidebarOpen && window.innerWidth < 900);
}

// ── Chat history (B2-backed) ──
async function renderHistory(email) {
  if (!email) return;
  const list = document.getElementById('chat-history-list');
  const empty = document.getElementById('history-empty');
  list.querySelectorAll('.history-item').forEach(el => el.remove());
  try {
    const res = await fetch(`/api/chats?email=${encodeURIComponent(email)}`);
    const chats = await res.json();
    if (!Array.isArray(chats) || chats.length === 0) { empty.style.display = ''; return; }
    empty.style.display = 'none';
    chats.forEach(chat => {
      const item = document.createElement('div');
      item.className = 'history-item' + (chat.id === currentChatId ? ' active' : '');
      item.dataset.id = chat.id;
      item.innerHTML = `
        <span class="history-item-icon">💬</span>
        <div class="history-item-text">
          <div class="history-item-title">${escHtml(chat.title || 'Untitled')}</div>
          <div class="history-item-date">${chat.date || ''}</div>
        </div>
        <button class="history-item-del" onclick="deleteChat(event,'${chat.id}')" title="Delete">✕</button>`;
      item.addEventListener('click', () => loadChat(chat.id));
      list.appendChild(item);
    });
  } catch { empty.style.display = ''; }
}

function newChat() {
  const session = getSession();
  if (!session || session.isTrial) return;
  saveChatIfNeeded();
  startNewChat();
  if (window.innerWidth < 900) toggleSidebar();
}

function startNewChat() {
  currentChatId = 'chat_' + Date.now();
  localStorage.removeItem(CHAT_STATE_KEY);
  history = [];
  clearChatWindow();
  document.getElementById('welcome').style.display = '';
  const session = getSession();
  if (session?.email) renderHistory(session.email);
}

async function saveChatIfNeeded() {
  const session = getSession();
  if (!session?.email || history.length === 0) return;
  const firstUserMsg = history.find(m => m.role === 'user');
  if (!firstUserMsg) return;
  const title = firstUserMsg.content.slice(0, 42) + (firstUserMsg.content.length > 42 ? '…' : '');
  try {
    await fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.email, chatId: currentChatId, title, messages: history })
    });
    // Persist current chat id so refresh restores it
    saveChatState({ chatId: currentChatId });
  } catch (e) { console.warn('Save chat failed:', e); }
}

async function loadChat(id) {
  const session = getSession();
  if (!session?.email) return;
  await saveChatIfNeeded();
  try {
    const res = await fetch(`/api/chats/${id}?email=${encodeURIComponent(session.email)}`);
    if (!res.ok) return;
    const chat = await res.json();
    currentChatId = id;
    localStorage.setItem(CHAT_STATE_KEY, JSON.stringify({ chatId: id }));
    history = [...chat.messages];
    clearChatWindow();
    document.getElementById('welcome').style.display = 'none';
    history.forEach(m => { if (m.role !== 'system') renderMsgFromHistory(m.role === 'user' ? 'user' : 'ai', m.content); });
    renderHistory(session.email);
    if (window.innerWidth < 900) toggleSidebar();
  } catch (e) { console.warn('Load chat failed:', e); }
}

async function deleteChat(e, id) {
  e.stopPropagation();
  const session = getSession();
  if (!session?.email) return;
  try {
    await fetch(`/api/chats/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.email })
    });
  } catch {}
  if (id === currentChatId) startNewChat();
  else renderHistory(session.email);
}

function clearChatWindow() {
  document.getElementById('chat-window').querySelectorAll('.msg').forEach(m => m.remove());
}

function renderMsgFromHistory(role, text) {
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  const session = getSession();
  const initials = session?.name ? session.name[0].toUpperCase() : 'U';
  d.innerHTML = `
    <div class="av">${role === 'ai' ? 'V' : initials}</div>
    <div class="bubble-wrap"><div class="bubble">${escHtml(text)}</div></div>`;
  document.getElementById('chat-window').insertBefore(d, document.getElementById('typing'));
  scrollBot();
}

// ── Timer ──
function startTimer() {
  trialSeconds = 300;
  document.getElementById('timer-pill').classList.add('show');
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    trialSeconds--;
    updateTimerDisplay();
    if (trialSeconds <= 0) { clearTimer(); expireTrial(); }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(trialSeconds / 60), s = trialSeconds % 60;
  document.getElementById('timer-display').textContent = `${m}:${s.toString().padStart(2,'0')}`;
}

function clearTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  document.getElementById('timer-pill').classList.remove('show');
}

function expireTrial() {
  document.getElementById('input-card').classList.add('disabled');
  document.getElementById('input-hint-text').textContent = 'Trial ended — sign up to continue';
  document.getElementById('expired-overlay').classList.add('show');
}

// ── Chat ──
const chatEl = document.getElementById('chat-window');
const welcomeEl = document.getElementById('welcome');
const typingEl = document.getElementById('typing');
const inputEl = document.getElementById('user-input');
const charEl = document.getElementById('char-count');

inputEl.addEventListener('input', () => {
  inputEl.style.height = 'auto';
  inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  charEl.textContent = inputEl.value.length + ' / 4000';
});

inputEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

function scrollBot() { chatEl.scrollTop = chatEl.scrollHeight; }

function renderMarkdown(text) {
  // Simple markdown: bold, italic, code blocks, inline code, line breaks
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/```([\s\S]*?)```/g, '<pre style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px 14px;overflow-x:auto;font-size:.83rem;margin:6px 0;"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:1px 5px;font-size:.85em;">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function addMsg(role, text) {
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  const session = getSession();
  const initials = session?.name ? session.name[0].toUpperCase() : 'U';
  const bubbleContent = role === 'ai' ? renderMarkdown(text) : escHtml(text);
  d.innerHTML = `
    <div class="av">${role === 'ai' ? 'V' : initials}</div>
    <div class="bubble-wrap">
      <div class="bubble">${bubbleContent}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  chatEl.insertBefore(d, typingEl);
  scrollBot();
  return d;
}

function escHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
}

function quickSend(btn) { inputEl.value = btn.textContent.replace(/^\S+\s/,'').trim(); sendMessage(); }


function isImageRequest(text) {
  return /^(draw|generate|create|make|paint|show|imagine|design|render|sketch|illustrate|produce)\s+(me\s+)?(a|an|the|some)?\s*(image|picture|photo|illustration|artwork|painting|portrait|wallpaper|logo|icon|scene|drawing|sketch|visual|poster|banner|avatar|cartoon|realistic|anime|fantasy|pixel|art)?/i.test(text.trim())
    || /^(can you|please|could you).*(draw|generate|create|make|paint|design|render|illustrate)/i.test(text.trim())
    || /\b(generate|create|draw|make|paint|render)\s+(an?|the|some|me|us)?\s*(image|picture|photo|illustration|artwork|painting|portrait)/i.test(text);
}

function addGeneratingMsg() {
  const d = document.createElement('div');
  d.className = 'msg ai';
  d.id = 'generating-msg';
  d.innerHTML = `
    <div class="av" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:.68rem;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">V</div>
    <div class="bubble-wrap">
      <div class="bubble" style="display:flex;align-items:center;gap:12px;padding:14px 18px;">
        <div style="width:20px;height:20px;border:2.5px solid rgba(124,58,237,.25);border-top-color:#7c3aed;border-radius:50%;animation:spin .75s linear infinite;flex-shrink:0;"></div>
        <span style="font-size:.85rem;color:var(--text-mid);">Creating your image…</span>
      </div>
    </div>`;
  chatEl.insertBefore(d, typingEl);
  scrollBot();
}

function removeGeneratingMsg() {
  const el = document.getElementById('generating-msg');
  if (el) el.remove();
}

function addRealImageMsg(prompt, url) {
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const safePrompt = escHtml(prompt.length > 80 ? prompt.slice(0,80)+'…' : prompt);

  const d = document.createElement('div');
  d.className = 'msg ai';

  const av = document.createElement('div');
  av.className = 'av';
  av.style.cssText = 'background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:.68rem;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;';
  av.textContent = 'V';

  const bwrap = document.createElement('div');
  bwrap.className = 'bubble-wrap';

  const bubble = document.createElement('div');
  bubble.className = 'img-bubble';
  bubble.style.cssText = 'padding:8px;max-width:360px;';

  // Skeleton shimmer shown while image loads
  const skeleton = document.createElement('div');
  skeleton.style.cssText = 'width:100%;aspect-ratio:1;border-radius:14px;background:linear-gradient(90deg,var(--surface) 25%,var(--border) 50%,var(--surface) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;';

  const imgEl = document.createElement('img');
  imgEl.alt = safePrompt;
  imgEl.style.cssText = 'width:100%;border-radius:14px;display:none;cursor:pointer;box-shadow:0 4px 24px rgba(0,0,0,.12);';
  let imgRetries = 0;
  const fallbackUrls = [
    url,
    url.replace('model=flux', 'model=flux-schnell'),
    url.replace('model=flux', 'model=turbo').replace('1024&height=1024', '512&height=512'),
  ];
  imgEl.onload = () => { skeleton.remove(); imgEl.style.display = 'block'; scrollBot(); };
  imgEl.onerror = () => {
    imgRetries++;
    if (imgRetries < fallbackUrls.length) {
      setTimeout(() => { imgEl.src = fallbackUrls[imgRetries]; }, 2000);
      skeleton.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:180px;color:var(--text-light);font-size:.78rem;flex-direction:column;gap:8px;"><span style="font-size:1.5rem;">⏳</span>Trying again…</div>';
    } else {
      skeleton.style.background = 'var(--surface)'; skeleton.style.animation = 'none';
      skeleton.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-light);font-size:.8rem;flex-direction:column;gap:8px;padding:40px 0;"><span style="font-size:2rem;">😕</span>Image failed to load.<br>Try a different prompt.</div>';
    }
  };
  imgEl.onclick = () => openLightbox(url);
  imgEl.src = fallbackUrls[0];

  const caption = document.createElement('div');
  caption.className = 'img-caption';
  caption.style.marginTop = '8px';
  caption.textContent = '🎨 ' + (prompt.length > 80 ? prompt.slice(0,80)+'…' : prompt);

  const dlBtn = document.createElement('button');
  dlBtn.textContent = '⬇️ Download image';
  dlBtn.style.cssText = 'margin-top:8px;padding:7px 16px;border-radius:10px;border:1.5px solid var(--border);background:none;color:var(--text-mid);font-family:var(--font-body);font-size:.74rem;font-weight:600;cursor:pointer;transition:all .2s;';
  dlBtn.onmouseenter = () => { dlBtn.style.borderColor='#7c3aed'; dlBtn.style.color='#7c3aed'; };
  dlBtn.onmouseleave = () => { dlBtn.style.borderColor='var(--border)'; dlBtn.style.color='var(--text-mid)'; };
  dlBtn.onclick = () => downloadImg(url);

  const timeEl = document.createElement('div');
  timeEl.className = 'msg-time';
  timeEl.textContent = now;

  bubble.appendChild(skeleton);
  bubble.appendChild(imgEl);
  bubble.appendChild(caption);
  bubble.appendChild(dlBtn);
  bwrap.appendChild(bubble);
  bwrap.appendChild(timeEl);
  d.appendChild(av);
  d.appendChild(bwrap);
  chatEl.insertBefore(d, typingEl);
  scrollBot();
}

function downloadImg(url) {
  fetch(url)
    .then(r => r.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'viora-image.png';
      a.click();
    })
    .catch(() => window.open(url, '_blank'));
}


function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('img-lightbox').classList.add('show');
}

function closeLightbox() {
  document.getElementById('img-lightbox').classList.remove('show');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── AI Tools Modal ──
let aimCurrentTab = 'ais';
let humStyle = 'Casual';

function openAiModal(tab) {
  document.getElementById('ai-modal').classList.add('show');
  switchAimTab(tab || 'tools');
}
function closeAiModal() {
  document.getElementById('ai-modal').classList.remove('show');
}
function switchAimTab(tab) {
  aimCurrentTab = tab;
  document.querySelectorAll('.aim-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.aim-panel').forEach(p => p.classList.remove('show'));
  const tabEl = document.getElementById('aim-tab-' + tab);
  if (tabEl) tabEl.classList.add('active');
  document.getElementById('aim-panel-' + tab).classList.add('show');
}
function selectHumOpt(btn) {
  document.querySelectorAll('.hum-opt').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  humStyle = btn.textContent.trim();
}
async function runHumanizer() {
  const text = document.getElementById('hum-input').value.trim();
  if (!text) return;
  const btn = document.getElementById('btn-humanize');
  btn.disabled = true; btn.textContent = '⏳ Humanizing…';
  
  const styleGuides = {
    'Casual': 'Write like texting a smart friend. Use contractions freely (I\'m, it\'s, don\'t, you\'d). Throw in filler phrases occasionally like "honestly", "kind of", "basically", "I mean". Vary sentence length wildly — some very short. One-word sentences are fine.',
    'Professional': 'Write like a confident human expert, not a corporate bot. Use first-person opinions ("I think", "in my experience"). Avoid buzzwords. Include minor hedges ("usually", "in most cases"). Mix short punchy sentences with longer ones.',
    'Academic': 'Write like a sharp grad student, not an AI. Use field-appropriate vocabulary but vary sentence structure dramatically. Include personal hedges ("arguably", "it seems", "one could suggest"). Avoid suspiciously perfect parallel structure.',
    'Creative': 'Write with real personality — use em dashes, parenthetical asides (like this), fragments for effect. Let ideas meander slightly then snap back. Sound like a human who gets excited about topics.',
    'Conversational': 'Write like a podcast transcript. Start sentences with "And", "But", "So". Use rhetorical questions. Include phrases like "right?", "you know what I mean", "here\'s the thing". Feel free to digress slightly.'
  };

  const systemPrompt = `You are an expert at rewriting AI-generated text so it is completely undetectable by AI detectors like GPTZero, Turnitin, Copyleaks, Winston AI, and Originality.ai.

WHAT AI DETECTORS LOOK FOR (avoid all of these):
- Unnaturally consistent sentence length and rhythm
- Overly formal or "perfect" word choices
- Parallel list structures (First... Second... Third... / Additionally... Furthermore... Moreover...)
- Phrases: "It's important to note", "In conclusion", "In today's world", "This essay will", "Delve into", "Leverage", "Utilize", "Showcase", "It is worth noting", "As an AI", "Certainly!", "Absolutely!"
- Too-smooth transitions between paragraphs
- Predictable topic sentence → evidence → explanation structure
- Suspiciously balanced pros/cons
- Perfect grammar with zero personality

HOW TO REWRITE:
- Break the rhythm constantly — mix very short sentences with longer, wandering ones
- Add ONE real imperfection: a slight digression, a casual aside, or a minor opinion
- Use contractions aggressively
- Replace any "utilize" → "use", "demonstrate" → "show", "facilitate" → "help"
- Kill all transition phrases — just start the next thought
- Add subtle subjectivity ("which is actually kind of fascinating", "and that matters more than people realize")
- Occasionally start a sentence with And, But, or Because
- Style: ${styleGuides[humStyle] || styleGuides['Casual']}

OUTPUT ONLY the rewritten text. No preamble, no explanation, no quotes around it.`;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: systemPrompt,
        messages: [{ role: 'user', content: `Rewrite this so no AI detector can identify it:\n\n${text}` }],
        email: getSession()?.email || null
      })
    });
    // Handle streaming response
    let result = '';
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    const resultEl = document.getElementById('hum-result');
    document.getElementById('hum-result-wrap').classList.add('show');
    resultEl.textContent = '…';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          if (parsed.token) { result += parsed.token; resultEl.textContent = result; }
        } catch {}
      }
    }
    if (!result) result = 'Something went wrong. Try again.';
    resultEl.textContent = result;
  } catch(e) {
    document.getElementById('hum-result').textContent = 'Error: ' + e.message;
    document.getElementById('hum-result-wrap').classList.add('show');
  }
  btn.disabled = false; btn.textContent = '✨ Humanize';
}
function copyHumanized() {
  const text = document.getElementById('hum-result').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.hum-copy');
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy to clipboard', 2000);
  });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAiModal(); });

// ── Deep Search ──
let deepSearchMode = false;

function toggleDeepSearch() {
  deepSearchMode = !deepSearchMode;
  document.getElementById('btn-deep').classList.toggle('active', deepSearchMode);
  document.getElementById('user-input').placeholder = deepSearchMode
    ? 'Deep search: What topic do you want researched?'
    : 'Ask Viora anything…';
}

// ── Image Upload ──
let attachedImage = null; // base64 data URL

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB'); return; }
  const reader = new FileReader();
  reader.onload = () => {
    attachedImage = reader.result; // data:image/...;base64,...
    document.getElementById('img-preview-thumb').src = attachedImage;
    document.getElementById('img-preview-wrap').classList.add('show');
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function removeImage() {
  attachedImage = null;
  document.getElementById('img-preview-wrap').classList.remove('show');
  document.getElementById('img-preview-thumb').src = '';
}

function addDeepSearchMsg(query, text) {
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const d = document.createElement('div');
  d.className = 'msg ai';
  // Convert markdown-style to HTML
  const html = text
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  d.innerHTML = `
    <div class="av" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:.68rem;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">V</div>
    <div class="bubble-wrap" style="max-width:85%">
      <div class="deep-bubble">
        <div class="deep-badge">🔍 Deep Search</div>
        <div>${html}</div>
      </div>
      <div class="msg-time">${now}</div>
    </div>`;
  chatEl.insertBefore(d, typingEl);
  scrollBot();
}

// ── Weather Code to Emoji ──
function weatherEmoji(code) {
  if (code === 113) return '☀️';
  if (code === 116) return '⛅';
  if ([119,122].includes(code)) return '☁️';
  if ([143,248,260].includes(code)) return '🌫️';
  if ([176,263,266,293,296].includes(code)) return '🌦️';
  if ([299,302,305,308].includes(code)) return '🌧️';
  if ([311,314,317,320].includes(code)) return '🌨️';
  if ([323,326,329,332,335,338,368,371,374,377].includes(code)) return '❄️';
  if ([386,389,392,395].includes(code)) return '⛈️';
  if ([200,386].includes(code)) return '🌩️';
  return '🌤️';
}

function addWeatherCard(place, weather) {
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const location = place ? `${place.city || ''}${place.city && place.country ? ', ' : ''}${place.country || ''}` : 'Your Location';
  const mapsUrl = place ? `https://www.google.com/maps/search/weather+${encodeURIComponent(location)}` : '#';

  const forecastHTML = (weather.daily || []).map((d,i) => `
    <div class="wc-day ${i===0?'today':''}">
      <div class="wc-day-name">${i===0?'Now':d.day}</div>
      <div class="wc-day-icon">${weatherEmoji(d.code)}</div>
      <div class="wc-day-high">${d.high}°</div>
      <div class="wc-day-low">${d.low}°</div>
    </div>`).join('');

  const el = document.createElement('div');
  el.className = 'msg ai';
  el.innerHTML = `
    <div class="av" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:.68rem;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">V</div>
    <div class="bubble-wrap">
      <div class="weather-card">
        <div class="wc-hero">
          <div class="wc-top-row">
            <div class="wc-location">
              <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor"><path d="M4.5 0C2.02 0 0 2.02 0 4.5c0 3.38 4.5 6.5 4.5 6.5S9 7.88 9 4.5C9 2.02 6.98 0 4.5 0zm0 6.08a1.58 1.58 0 110-3.16 1.58 1.58 0 010 3.16z"/></svg>
              ${escHtml(location)}
            </div>
            <div class="wc-badge">Viora Weather</div>
          </div>
          <div class="wc-main">
            <div class="wc-temp-block">
              <div><span class="wc-temp">${weather.tempF}</span><span class="wc-temp-unit">°F</span></div>
              <div class="wc-desc-text">${escHtml(weather.desc)}</div>
              <div class="wc-feels">Feels like ${weather.feelsF}°F</div>
            </div>
            <div class="wc-right">
              <div class="wc-icon">${weatherEmoji(weather.code)}</div>
            </div>
          </div>
        </div>
        <div class="wc-body">
          <div class="wc-stats">
            <div class="wc-stat"><span class="wc-stat-icon">💧</span><div><div class="wc-stat-label">Humidity</div><div class="wc-stat-val">${weather.humidity}%</div></div></div>
            <div class="wc-stat"><span class="wc-stat-icon">💨</span><div><div class="wc-stat-label">Wind</div><div class="wc-stat-val">${weather.windMph} mph</div></div></div>
            <div class="wc-stat"><span class="wc-stat-icon">👁️</span><div><div class="wc-stat-label">Visibility</div><div class="wc-stat-val">${weather.visibility} mi</div></div></div>
            <div class="wc-stat"><span class="wc-stat-icon">🌡️</span><div><div class="wc-stat-label">UV Index</div><div class="wc-stat-val">${weather.uvIndex}</div></div></div>
          </div>
          <div class="wc-divider"></div>
          <div class="wc-forecast-label">7-Day Forecast</div>
          <div class="wc-forecast">${forecastHTML}</div>
          <a href="${mapsUrl}" target="_blank" class="wc-open-maps">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            View on Google Maps
          </a>
        </div>
      </div>
      <div class="msg-time">${now}</div>
    </div>`;
  chatEl.insertBefore(el, typingEl);
  scrollBot();
}

function addMapCard(query, coords, place) {
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const locationName = place ? `${place.city || ''}${place.city && place.country ? ', ' : ''}${place.country || ''}` : 'Your Location';

  // Detect place type from query
  const placeMatch = query.match(/restaurant|food|eat|pizza|burger|sushi|cafe|coffee|bar|pub|hospital|pharmacy|drug|doctor|hotel|motel|gas|petrol|station|bank|atm|gym|fitness|park|school|mall|shop|store|market|supermarket|grocery|hair|salon|spa|beach|museum|cinema|movie/i);
  const placeType = placeMatch ? placeMatch[0].toLowerCase() : 'place';
  const placeEmojis = { restaurant:'🍽️', food:'🍔', eat:'🍽️', pizza:'🍕', burger:'🍔', sushi:'🍣', cafe:'☕', coffee:'☕', bar:'🍺', pub:'🍺', hospital:'🏥', pharmacy:'💊', drug:'💊', doctor:'👨‍⚕️', hotel:'🏨', motel:'🏨', gas:'⛽', petrol:'⛽', station:'⛽', bank:'🏦', atm:'🏧', gym:'💪', fitness:'💪', park:'🌳', school:'🏫', mall:'🛍️', shop:'🛒', store:'🛒', market:'🛒', supermarket:'🛒', grocery:'🛒', hair:'💇', salon:'💅', spa:'🧘', beach:'🏖️', museum:'🏛️', cinema:'🎬', movie:'🎬' };
  const emoji = placeEmojis[placeType] || '📍';

  const searchQuery = `${placeType} near ${locationName}`;
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}/@${coords.lat},${coords.lon},14z`;

  // OpenStreetMap embed — free, no API key, no restrictions
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon-.025},${coords.lat-.018},${coords.lon+.025},${coords.lat+.018}&layer=mapnik&marker=${coords.lat},${coords.lon}`;

  const el = document.createElement('div');
  el.className = 'msg ai';
  el.innerHTML = `
    <div class="av" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:.68rem;font-weight:700;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">V</div>
    <div class="bubble-wrap">
      <div class="map-card">
        <div class="map-card-header">
          <div class="map-card-icon">${emoji}</div>
          <div>
            <div class="map-card-title" style="text-transform:capitalize;">${placeType}s near you</div>
            <div class="map-card-sub">
              <svg width="9" height="10" viewBox="0 0 9 11" fill="var(--violet)" style="opacity:.6"><path d="M4.5 0C2.02 0 0 2.02 0 4.5c0 3.38 4.5 6.5 4.5 6.5S9 7.88 9 4.5C9 2.02 6.98 0 4.5 0zm0 6.08a1.58 1.58 0 110-3.16 1.58 1.58 0 010 3.16z"/></svg>
              ${escHtml(locationName)}
            </div>
          </div>
        </div>
        <div class="map-iframe-wrap">
          <iframe
            src="${osmUrl}"
            loading="lazy"
            title="Map near ${escHtml(locationName)}">
          </iframe>
        </div>
        <div class="map-card-footer">
          <span class="map-hint">📌 Your location is marked on the map</span>
          <a href="${mapsUrl}" target="_blank" class="map-open-btn">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Search in Google Maps
          </a>
        </div>
      </div>
      <div class="msg-time">${now}</div>
    </div>`;
  chatEl.insertBefore(el, typingEl);
  scrollBot();
}

function isWeatherQuery(text) {
  return /weather|temperature|forecast|rain|sunny|cloudy|snow|wind|humidity|hot outside|cold outside|degrees/i.test(text);
}

function isLocationQuery(text) {
  return /nearest|closest|near me|nearby|around me|close to me|my location|where am i|current location|find a .*(store|shop|restaurant|pharmacy|hospital|bank|gas|hotel|gym|clinic|school|park|cafe|coffee|supermarket|mall|market)/i.test(text)
    || /what('s| is) my (location|address|city|country|position|coordinates)/i.test(text)
    || /where (am i|do i live|are we)/i.test(text)
    || /(store|shop|restaurant|pharmacy|hospital|bank|gas station|hotel|gym|clinic|cafe|supermarket|mall).*(near|nearby|closest|around)/i.test(text);
}

function getBrowserLocation() {
  return new Promise(resolve => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 6000 }
    );
  });
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text || busy) return;
  if (trialSeconds <= 0 && getSession()?.isTrial) return;

  welcomeEl.style.display = 'none';
  inputEl.value = ''; inputEl.style.height = 'auto'; charEl.textContent = '0 / 4000';

  // Show user message — with image thumbnail if attached
  if (attachedImage) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const session = getSession();
    const initials = session?.name ? session.name[0].toUpperCase() : 'U';
    const d = document.createElement('div');
    d.className = 'msg user';
    d.innerHTML = `<div class="av">${initials}</div><div class="bubble-wrap"><div class="bubble" style="padding:8px"><img src="${attachedImage}" style="max-width:200px;border-radius:12px;display:block;margin-bottom:6px"/>${escHtml(text)}</div><div class="msg-time">${now}</div></div>`;
    chatEl.insertBefore(d, typingEl);
    scrollBot();
  } else {
    addMsg('user', text);
  }

  const imgToSend = attachedImage;
  removeImage();
  history.push({ role: 'user', content: text });

  busy = true;
  typingEl.classList.add('show');
  scrollBot();

  // ── Deep Search ──
  if (deepSearchMode || /^deep search:\s*/i.test(text)) {
    const query = text.replace(/^deep search:\s*/i, '').trim();
    try {
      const res = await fetch('/api/deepsearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, email: getSession()?.email || null })
      });
      const data = await res.json();
      typingEl.classList.remove('show');
      if (data.error) {
        addMsg('ai', '⚠️ ' + data.error);
      } else {
        const reply = data.content?.[0]?.text || '';
        addDeepSearchMsg(query, reply);
        history.push({ role: 'assistant', content: reply });
        await saveChatIfNeeded();
        const session = getSession();
        if (session?.email) renderHistory(session.email);
      }
    } catch (err) {
      typingEl.classList.remove('show');
      addMsg('ai', '⚠️ Deep search error: ' + err.message);
    }
    busy = false;
    inputEl.focus();
    return;
  }

  // ── Image generation (api.airforce — free, no key needed) ──
  if (isImageRequest(text)) {
    try {
      const cleanPrompt = text
        .replace(/^(please|can you|could you)\s+/i, '')
        .replace(/^(draw|generate|create|make|paint|show|imagine|design|render|sketch|illustrate|produce)\s+(me\s+|us\s+)?(a\s+|an\s+|the\s+|some\s+)?/i, '')
        .trim();

      const enhancedPrompt = cleanPrompt + ', highly detailed, photorealistic, 8k, beautiful lighting, sharp focus';
      const seed = Math.floor(Math.random() * 999999);
      // Call Pollinations directly from the browser (no server proxy needed)
      const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

      typingEl.classList.remove('show');
      addGeneratingMsg();

      setTimeout(async () => {
        removeGeneratingMsg();
        addRealImageMsg(text, imgUrl);
        history.push({ role: 'assistant', content: '[Generated image for: "' + text + '"]' });
        await saveChatIfNeeded();
        const session = getSession();
        if (session?.email) renderHistory(session.email);
        busy = false;
        inputEl.focus();
      }, 300);
      return;
    } catch (err) {
      typingEl.classList.remove('show');
      addMsg('ai', '⚠️ Image error: ' + err.message);
    }
    busy = false;
    inputEl.focus();
    return;
  }
  let coords = null;
  if (isWeatherQuery(text) || isLocationQuery(text)) coords = await getBrowserLocation();

  // ── Location / Map query ──
  if (isLocationQuery(text) && coords) {
    try {
      typingEl.classList.remove('show');
      const placeRes = await fetch(`/api/geocode?lat=${coords.lat}&lon=${coords.lon}`).catch(()=>null);
      const placeData = placeRes ? await placeRes.json().catch(()=>null) : null;
      addMapCard(text, coords, placeData);
      // Also get AI to describe the area and give tips
      const locationName = placeData ? `${placeData.city || ''}, ${placeData.country || ''}` : `${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}`;
      const aiHint = `The user is at ${locationName} and asked: "${text}". Give a brief, helpful 1-2 sentence response acknowledging you've shown a map, and suggest they tap pins or "Open in Maps" to find what they need. Be friendly and concise.`;
      const msgDiv = addMsg('ai', '');
      const bubbleEl = msgDiv ? msgDiv.querySelector('.bubble') : null;
      let reply = '';
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: aiHint, messages: [{ role: 'user', content: text }], email: getSession()?.email || null })
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try { const p = JSON.parse(data); if (p.token) { reply += p.token; if (bubbleEl) { bubbleEl.innerHTML = renderMarkdown(reply); scrollBot(); } } } catch {}
        }
      }
      if (!reply) reply = `Here's a map showing ${text.toLowerCase()} near you! Tap any pin or click "Open in Maps" to get directions.`;
      if (bubbleEl) bubbleEl.innerHTML = renderMarkdown(reply);
      history.push({ role: 'assistant', content: '[Map shown] ' + reply });
      await saveChatIfNeeded();
      const session = getSession();
      if (session?.email) renderHistory(session.email);
      busy = false;
      inputEl.focus();
      return;
    } catch(e) { /* fall through */ }
  }

  // ── Weather card ──
  if (isWeatherQuery(text) && coords) {
    try {
      const wres = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`);
      const wdata = await wres.json();
      if (wdata.weather) {
        typingEl.classList.remove('show');
        addWeatherCard(wdata.place, wdata.weather);
        const summary = `${wdata.place?.city || 'Your location'}: ${wdata.weather.tempF}°F, feels like ${wdata.weather.feelsF}°F, ${wdata.weather.desc}, humidity ${wdata.weather.humidity}%, wind ${wdata.weather.windMph} mph.`;
        history.push({ role: 'assistant', content: summary });
        await saveChatIfNeeded();
        const session = getSession();
        if (session?.email) renderHistory(session.email);
        busy = false;
        inputEl.focus();
        return;
      }
    } catch(e) { /* fall through to normal chat */ }
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: 'You are Viora, a friendly, warm and helpful AI assistant. Be clear, concise and encouraging. Avoid excessive markdown unless the user asks for it.',
        messages: history,
        coords,
        email: getSession()?.email || null,
        image: imgToSend || null
      })
    });

    typingEl.classList.remove('show');

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Unknown error' }));
      addMsg('ai', '⚠️ ' + (err.error || 'Request failed'));
      busy = false; inputEl.focus(); return;
    }

    // Stream tokens into a live bubble
    const msgDiv = addMsg('ai', '');
    const bubbleEl = msgDiv ? msgDiv.querySelector('.bubble') : null;
    let reply = '';

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          if (parsed.token) {
            reply += parsed.token;
            if (bubbleEl) { bubbleEl.innerHTML = renderMarkdown(reply); scrollBot(); }
          }
        } catch {}
      }
    }

    if (!reply) reply = 'Hmm, no response. Try again!';
    if (bubbleEl) bubbleEl.innerHTML = renderMarkdown(reply);
    history.push({ role: 'assistant', content: reply });
    await saveChatIfNeeded();
    const session = getSession();
    if (session?.email) renderHistory(session.email);
  } catch (err) {
    typingEl.classList.remove('show');
    addMsg('ai', '⚠️ Connection error: ' + err.message);
  }

  busy = false;
  inputEl.focus();
}


// ── Admin popup polling ──
let lastPopupId = null;
const POPUP_ICONS = { info:'ℹ️', success:'✅', warning:'⚠️', error:'🚨' };
const POPUP_TITLES = { info:'Notice', success:'Update', warning:'Warning', error:'Alert' };

async function pollPopup() {
  try {
    const res = await fetch('/api/popup');
    const popup = await res.json();
    if (popup && popup.id !== lastPopupId) {
      lastPopupId = popup.id;
      showAdminPopup(popup);
    } else if (!popup && lastPopupId) {
      lastPopupId = null;
      dismissPopup();
    }
  } catch {}
}

function showAdminPopup(popup) {
  const el = document.getElementById('admin-popup');
  el.className = `show pop-${popup.type || 'info'}`;
  document.getElementById('popup-icon').textContent = POPUP_ICONS[popup.type] || 'ℹ️';
  document.getElementById('popup-title').textContent = POPUP_TITLES[popup.type] || 'Notice';
  document.getElementById('popup-text').textContent = popup.message;
}

function dismissPopup() {
  const el = document.getElementById('admin-popup');
  el.classList.remove('show');
}

// Poll every 8 seconds when user is logged in
setInterval(() => {
  if (getSession() && !getSession().isTrial) pollPopup();
}, 8000);

// ── Memory Panel ──
let memoryOpen = false;

function toggleMemoryPanel() {
  memoryOpen = !memoryOpen;
  document.getElementById('memory-panel').classList.toggle('open', memoryOpen);
  document.getElementById('memory-overlay').classList.toggle('show', memoryOpen);
  if (memoryOpen) loadMemories();
}

async function loadMemories() {
  const session = getSession();
  if (!session?.email) return;
  try {
    const res = await fetch(`/api/memory?email=${encodeURIComponent(session.email)}`);
    const memories = await res.json();
    renderMemories(memories);
  } catch {}
}

function renderMemories(memories) {
  const list = document.getElementById('memory-list');
  const empty = document.getElementById('memory-empty');
  list.querySelectorAll('.memory-item').forEach(el => el.remove());
  if (!memories || memories.length === 0) { empty.style.display = ''; return; }
  empty.style.display = 'none';
  memories.slice().reverse().forEach(m => {
    const d = document.createElement('div');
    d.className = 'memory-item';
    const date = m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : '';
    d.innerHTML = `
      <div style="flex:1">
        <div class="memory-item-text">${escHtml(m.text)}</div>
        <div class="memory-item-date">${date}</div>
      </div>
      <button class="btn-del-mem" onclick="deleteMemory('${m.id}')" title="Delete">✕</button>`;
    list.appendChild(d);
  });
}

async function addMemory() {
  const session = getSession();
  if (!session?.email) return;
  const input = document.getElementById('memory-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  try {
    await fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.email, text })
    });
    loadMemories();
  } catch {}
}

async function deleteMemory(id) {
  const session = getSession();
  if (!session?.email) return;
  try {
    await fetch(`/api/memory/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.email })
    });
    loadMemories();
  } catch {}
}

async function clearAllMemories() {
  const session = getSession();
  if (!session?.email) return;
  if (!confirm('Clear all memories? Viora will forget everything about you.')) return;
  try {
    await fetch('/api/memory', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.email })
    });
    loadMemories();
  } catch {}
}

window.addEventListener('load', async () => {
  const s = getSession();
  if (!s) {
    // Show landing by default — auth-screen stays hidden
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('landing-screen').classList.remove('hidden');
  }
  if (s) {
    openChat(s.name, s.isTrial, s.email || null);
    checkAdminPopup();
    // Restore last active chat on refresh
    if (s.email && !s.isTrial) {
      // handled in openChat now via localStorage
    }
  }
});

// ── Admin popup check ──
const POPUP_SEEN_KEY = 'viora_popup_seen';

async function checkAdminPopup() {
  try {
    const res   = await fetch('/api/popup');
    const popup = await res.json();
    if (!popup.active || !popup.message) return;

    // Only show if not already dismissed this session
    const seen = sessionStorage.getItem(POPUP_SEEN_KEY);
    if (seen === popup.createdAt) return;

    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '🚨' };
    document.getElementById('admin-popup-icon').textContent  = icons[popup.type] || '📣';
    document.getElementById('admin-popup-title').textContent = popup.title || 'Notice';
    document.getElementById('admin-popup-msg').textContent   = popup.message;
    document.getElementById('admin-popup-card').className    = 'admin-popup-card ' + (popup.type || 'info');
    document.getElementById('admin-popup-overlay').classList.remove('hidden');
    // Store so it doesn't show again this session
    sessionStorage.setItem(POPUP_SEEN_KEY, popup.createdAt || 'shown');
  } catch {}
}

function closeAdminPopup() {
  document.getElementById('admin-popup-overlay').classList.add('hidden');
}

</script>

<!-- ADMIN POPUP -->
<div id="admin-popup-overlay" class="hidden">
  <div class="admin-popup-card" id="admin-popup-card">
    <div class="admin-popup-icon" id="admin-popup-icon">📣</div>
    <div class="admin-popup-title" id="admin-popup-title">Notice</div>
    <div class="admin-popup-msg" id="admin-popup-msg"></div>
    <button class="btn-close-popup" onclick="closeAdminPopup()">Got it</button>
  </div>
</div>


<!-- ADMIN POPUP -->
<div id="admin-popup">
  <span class="popup-icon" id="popup-icon">ℹ️</span>
  <div class="popup-body">
    <div class="popup-title" id="popup-title">Notice</div>
    <div class="popup-text" id="popup-text"></div>
  </div>
  <button class="popup-close" onclick="dismissPopup()">✕</button>
</div>
<!-- MEMORY PANEL -->
<div id="memory-overlay" onclick="toggleMemoryPanel()"></div>
<div id="memory-panel">
  <div class="memory-header">
    <span class="memory-title">🧠 Viora's Memory</span>
    <button class="memory-close" onclick="toggleMemoryPanel()">✕</button>
  </div>
  <div class="memory-add">
    <div class="memory-input-row">
      <input class="memory-input" id="memory-input" type="text" placeholder="e.g. I like spicy food" maxlength="200" onkeydown="if(event.key==='Enter')addMemory()" />
      <button class="btn-add-mem" onclick="addMemory()">+ Add</button>
    </div>
    <div class="memory-hint">💡 You can also type <strong>remember: I love sushi</strong> in chat and Viora will save it automatically.</div>
  </div>
  <div class="memory-list" id="memory-list">
    <div class="memory-empty" id="memory-empty">No memories yet.<br>Add things you want Viora to always know about you!</div>
  </div>
  <div class="memory-footer">
    <button class="btn-clear-mem" onclick="clearAllMemories()">🗑 Clear All Memories</button>
  </div>
</div>

<!-- IMAGE LIGHTBOX -->
<div class="img-lightbox" id="img-lightbox" onclick="closeLightbox()">
  <button class="img-lightbox-close" onclick="closeLightbox()">✕</button>
  <img id="lightbox-img" src="" alt="Generated image" onclick="event.stopPropagation()" />
</div>

<!-- ── AI TOOLS MODAL ── -->
<div id="ai-modal">
  <div class="aim-card">
    <div class="aim-head">
      <div class="aim-title">🤖 Our AI Tools</div>
      <button class="aim-close" onclick="closeAiModal()">✕</button>
    </div>

    <div class="aim-tabs">
      <button class="aim-tab active" id="aim-tab-tools" onclick="switchAimTab('tools')">🤖 Tools</button>
      <button class="aim-tab" id="aim-tab-humanizer" onclick="switchAimTab('humanizer')">✍️ Humanizer</button>
    </div>
    <div class="aim-body">

      <!-- TOOLS GRID -->
      <div id="aim-panel-tools" class="aim-panel show">
        <p style="font-size:.78rem;color:var(--text-mid);margin:0 0 14px;">Viora-powered tools — more coming soon.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="other-ai-card" onclick="switchAimTab('humanizer')" style="cursor:pointer;">
            <div class="oac-logo" style="background:rgba(124,58,237,.12)">✍️</div>
            <div class="oac-name">AI Humanizer</div>
            <div class="oac-desc">Make AI-written text sound natural and human.</div>
            <span class="oac-tag" style="background:rgba(124,58,237,.1);color:var(--violet-light);">Free · Viora</span>
          </div>
          <div class="other-ai-card" style="opacity:.5;cursor:default;">
            <div class="oac-logo" style="background:rgba(124,58,237,.08)">🔜</div>
            <div class="oac-name">Coming Soon</div>
            <div class="oac-desc">More Viora tools are on the way.</div>
            <span class="oac-tag" style="background:rgba(124,58,237,.06);color:var(--text-mid);">Soon</span>
          </div>
        </div>
      </div>

      <div class="aim-panel" id="aim-panel-humanizer">
        <div class="hum-wrap">
          <div>
            <div class="hum-label">Paste AI-generated text</div>
            <textarea class="hum-ta" id="hum-input" placeholder="Paste your AI-written text here…" style="min-height:140px;"></textarea>
          </div>
          <div>
            <div class="hum-label">Writing Style</div>
            <div class="hum-opts">
              <button class="hum-opt sel" onclick="selectHumOpt(this)">Casual</button>
              <button class="hum-opt" onclick="selectHumOpt(this)">Professional</button>
              <button class="hum-opt" onclick="selectHumOpt(this)">Academic</button>
              <button class="hum-opt" onclick="selectHumOpt(this)">Creative</button>
              <button class="hum-opt" onclick="selectHumOpt(this)">Conversational</button>
            </div>
          </div>
          <div style="background:rgba(124,58,237,.05);border:1px solid rgba(124,58,237,.15);border-radius:12px;padding:10px 14px;font-size:.72rem;color:var(--text-mid);line-height:1.6;">
            🛡️ <strong style="color:var(--violet);">Bypass mode active</strong> — targets GPTZero, Turnitin, Copyleaks, Winston AI & Originality.ai
          </div>
          <button class="btn-humanize" id="btn-humanize" onclick="runHumanizer()" style="width:100%;justify-content:center;display:flex;align-items:center;gap:8px;">
            <span>✨</span> Humanize &amp; Bypass Detectors
          </button>
          <div class="hum-result-wrap" id="hum-result-wrap">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <div class="hum-label" style="margin:0;">Result</div>
              <div style="font-size:.68rem;color:#16a34a;font-weight:700;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);border-radius:20px;padding:2px 10px;">✅ Detector-safe</div>
            </div>
            <div class="hum-result" id="hum-result"></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="hum-copy" onclick="copyHumanized()">📋 Copy</button>
              <button class="hum-copy" onclick="runHumanizer()" style="border-color:rgba(124,58,237,.3);color:var(--violet);">🔄 Redo</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<script>
(function(){
  const c = document.getElementById('landing-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let stars = [];
  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 120; i++) {
    stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + .3, a: Math.random(), speed: Math.random() * .004 + .001, twinkle: Math.random() * Math.PI * 2 });
  }
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(s => {
      s.twinkle += s.speed;
      const alpha = s.a * (.5 + .5 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x * c.width, s.y * c.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,140,255,${alpha})`;
      ctx.fill();
    });
    if (document.getElementById('landing-screen') && !document.getElementById('landing-screen').classList.contains('hidden')) {
      requestAnimationFrame(draw);
    }
  }
  draw();
})();
</script>

</body>
</html>
