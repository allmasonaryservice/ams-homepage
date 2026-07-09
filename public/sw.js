const CACHE = 'ams-seq-v6';
const SEQ_DESKTOP = '/images/sequence-desktop-webp/';
const SEQ_MOBILE  = '/images/sequence-mobile-webp/';

function pad(n) { return String(n).padStart(3, '0'); }

function allFrameUrls() {
  const urls = [];
  for (let i = 1; i <= 105; i++) {
    urls.push(`${SEQ_DESKTOP}frame-${pad(i)}.webp?v=2`);
    urls.push(`${SEQ_MOBILE}frame-${pad(i)}.webp?v=2`);
  }
  return urls;
}

// On install: cache frame 1 of both versions immediately (LCP)
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        `${SEQ_DESKTOP}frame-001.webp?v=2`,
        `${SEQ_MOBILE}frame-001.webp?v=2`,
      ])
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for sequence images, network-first for everything else
self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  if (url.includes('/images/sequence-desktop-webp/') || url.includes('/images/sequence-mobile-webp/')) {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(res => {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }
  // Network-first for everything else
});

// Message from page: cache remaining frames in background
self.addEventListener('message', (e) => {
  if (e.data?.type !== 'CACHE_FRAMES') return;
  const { urls } = e.data;
  caches.open(CACHE).then(cache => {
    let i = 0;
    function next() {
      if (i >= urls.length) return;
      const url = urls[i++];
      cache.match(url).then(hit => {
        if (!hit) fetch(url).then(res => { if (res.ok) cache.put(url, res.clone()); }).catch(() => {});
        setTimeout(next, 20); // throttle: 1 frame per 20ms → won't saturate network
      });
    }
    next();
  });
});
