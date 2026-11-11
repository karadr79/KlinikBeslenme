/* Klinik Beslenme Rehberi — service worker */
const CACHE = 'kbr-v1.17';
const CORE = ['./fonts.css', './ortak.css', './ortak.js', './atkinson-hyperlegible-mono-latin-400-normal.woff2', './atkinson-hyperlegible-mono-latin-600-normal.woff2', './atkinson-hyperlegible-mono-latin-ext-400-normal.woff2', './atkinson-hyperlegible-mono-latin-ext-600-normal.woff2', './atkinson-hyperlegible-next-latin-400-normal.woff2', './atkinson-hyperlegible-next-latin-500-normal.woff2', './atkinson-hyperlegible-next-latin-700-normal.woff2', './atkinson-hyperlegible-next-latin-800-normal.woff2', './atkinson-hyperlegible-next-latin-ext-400-normal.woff2', './atkinson-hyperlegible-next-latin-ext-500-normal.woff2', './atkinson-hyperlegible-next-latin-ext-700-normal.woff2', './atkinson-hyperlegible-next-latin-ext-800-normal.woff2', './', './index.html', './manifest.webmanifest', './disaktar.js','./hareket.js','./hareket.css',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png','./icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k.startsWith('kbr-')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
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
