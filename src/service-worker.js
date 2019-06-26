/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

workbox.setConfig({
  debug: true
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);

self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event =>
  event.waitUntil(self.clients.claim())
);

workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());

console.log("SW");
workbox.routing.registerRoute(
  /.*\/todos/,
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 4,
    cacheName: "api",
    cacheableResponse: { statuses: [0, 200] }
  })
);

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL("/index.html")
);
