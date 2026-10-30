// Offline shell: lets the app reload with no signal once it has been opened online.
// Bump V when you want every device to drop old cached files.
const V = 'vbs-v1';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const same = u.origin === location.origin;
  const sdk = u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/');
  if (!same && !sdk) return;                       // never touch database traffic
  if (sdk) {                                       // SDK files never change per version: cache first
    e.respondWith(caches.match(r).then(h => h || fetch(r).then(res => {
      const copy = res.clone(); caches.open(V).then(c => c.put(r, copy)); return res;
    })));
    return;
  }
  // app files: network first (so updates arrive), cache as the offline fallback
  e.respondWith(
    fetch(r).then(res => {
      const copy = res.clone(); caches.open(V).then(c => c.put(r, copy)); return res;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(h => h || caches.match('./index.html')))
  );
});
