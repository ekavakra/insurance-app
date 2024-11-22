// service-worker.js

const CACHE_NAME = "insurance-app-cache-v1";
const urlsToCache = [
  "../../index.html",
  "../../dist/css/output.css",
  "/manifest.json",
  "/index.html",
  "/about.html",
  "/contact.html",
  "/dashboard.html",
  "/manage-nominee.html",
  "/nominee-confirmation.html",
  "/icons/insurance-app-192x192.png",
  "/icons/insurance-app-512x512.png"
  // Add more files as needed to ensure core functionality works offline
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

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
