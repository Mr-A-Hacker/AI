const CACHE = 'viora-v2';
const STATIC = ['/', '/manifest.json', '/V.png', '/icon-192.png', '/icon-512.png'];
let lastSeenPopupId = null;

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.pathname.startsWith('/api/') || url.pathname === '/') {
    e.respondWith(fetch(e.request).then(res => {
      if (url.pathname === '/') caches.open(CACHE).then(c => c.put(e.request, res.clone()));
      return res;
    }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) return cached;
    return fetch(e.request).then(res => {
      if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
      return res;
    }).catch(() => cached);
  }));
});

// Page tells SW to show a notification (called when polling detects popup)
self.addEventListener('message', e => {
  if (e.data?.type === 'SHOW_NOTIFICATION') {
    const { title, body, popupId } = e.data;
    if (lastSeenPopupId === popupId) return;
    lastSeenPopupId = popupId;
    self.registration.showNotification(title || 'Viora AI', {
      body: body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'viora-popup-' + popupId,
      renotify: true,
      data: { url: '/' }
    });
  }
});

// Background sync (fires when app is in background/closed on supported browsers)
self.addEventListener('sync', e => {
  if (e.tag === 'check-popup') e.waitUntil(checkAndNotify());
});

// Periodic background sync (PWA on Chrome — min ~1hr)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'check-viora-popup') e.waitUntil(checkAndNotify());
});

// Tap notification → open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.includes(self.location.origin)) { c.focus(); return; } }
    return clients.openWindow('/');
  }));
});

async function checkAndNotify() {
  try {
    const res = await fetch('/api/popup');
    if (!res.ok) return;
    const popup = await res.json();
    if (!popup?.id || lastSeenPopupId === popup.id) return;
    lastSeenPopupId = popup.id;
    await self.registration.showNotification('📢 Viora — New Message', {
      body: popup.message,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'viora-popup-' + popup.id,
      renotify: true,
      data: { url: '/' }
    });
  } catch {}
}
