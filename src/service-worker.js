/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

workbox.setConfig({
  debug: true
});

self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event =>
  event.waitUntil(self.clients.claim())
);

workbox.routing.registerRoute("/", workbox.strategies.NetworkFirst());

console.log("SW");
workbox.routing.registerRoute(
  /.*\/todos\/.*/,
  workbox.strategies.StaleWhileRevalidate({
    cacheName: "api",
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: { statuses: [0, 200] }
  })
);
