const CACHE_NAME = "estoque-delifrio-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./firebase-config.js",
    "./manifest.json",
    "./icon.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
