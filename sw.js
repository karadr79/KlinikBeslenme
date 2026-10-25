/* Klinik Beslenme Rehberi — service worker */
const CACHE = 'kbr-v1.6';
const CORE = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png',
  './fonts/archivo-latin-ext-wdth-normal.woff2', './fonts/archivo-latin-wdth-normal.woff2', './fonts/fonts.css', './fonts/public-sans-latin-400-normal.woff2', './fonts/public-sans-latin-500-normal.woff2', './fonts/public-sans-latin-600-normal.woff2', './fonts/public-sans-latin-700-normal.woff2', './fonts/public-sans-latin-ext-400-normal.woff2', './fonts/public-sans-latin-ext-500-normal.woff2', './fonts/public-sans-latin-ext-600-normal.woff2', './fonts/public-sans-latin-ext-700-normal.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Sayfa: önce ağ (güncelleme gelsin), yoksa önbellek
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req.url, {cache: 'no-store'}).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; })));
});
