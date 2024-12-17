const cacheName = "Heptagram064-heptagram064.io-1.0";
const contentToCache = [
    "Build/50038b88797c6b96fe9f7a9aa2e8b84a.loader.js",
    "Build/81e224c9112cfeb0c84e70f552fc5546.framework.js",
    "Build/82c4b5b81e81c8cbd2623856b0e66bd7.data",
    "Build/5e8e3943328720b96f631fa2e9e044e0.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
