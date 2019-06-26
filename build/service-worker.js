importScripts("/precache-manifest.9e7c0b97066486a7b9d94dc6e5a98617.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

workbox.setConfig({
  debug: true
});

self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event =>
  event.waitUntil(self.clients.claim())
);

workbox.routing.registerRoute("/", workbox.strategies.networkFirst());

console.log("SW");
workbox.routing.registerRoute(
  /.*\/todos\/.*/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "api",
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: { statuses: [0, 200] }
  })
);

