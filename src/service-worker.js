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

workbox.routing.registerRoute(
  /^https:\/\/kit-free\.fontawesome\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: "fontawesome",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
);

const queue = new workbox.backgroundSync.Queue("failedAddedTodos");

self.addEventListener("fetch", event => {
  // Clone the request to ensure it's save to read when
  // adding to the Queue.
  const promiseChain = fetch(event.request.clone()).catch(err => {
    return queue.pushRequest({ request: event.request });
  });

  event.waitUntil(promiseChain);
});
