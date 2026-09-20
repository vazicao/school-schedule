/* Moj Raspored — service worker.
 *
 * Goals: pages open instantly, and the last schedule you looked at still opens
 * with no connection. Deliberately small; no libraries.
 *
 *  - HTML pages:     network-first, so you always get the current schedule when
 *                    online. Falls back to the last cached copy when offline, or
 *                    when the network takes longer than NETWORK_TIMEOUT_MS.
 *  - /_next/static/* and /icons/*: cache-first (content-hashed, so immutable).
 *  - Google Fonts:   stale-while-revalidate.
 *  - Everything else (analytics, textbook cover images from other sites) is
 *    left to the browser.
 *
 * The page cache and asset cache are deliberately NOT wiped on every deploy: a
 * cached page needs the JS chunks it was built with, and those live in the
 * asset cache. If the caching strategy itself ever changes, bump CACHE_VERSION.
 */
const CACHE_VERSION = "v1";
const PAGES = `pages-${CACHE_VERSION}`;
const ASSETS = `assets-${CACHE_VERSION}`;
const MAX_ASSETS = 200; // oldest entries are dropped beyond this
const NETWORK_TIMEOUT_MS = 3000;

const OFFLINE_HTML = `<!doctype html>
<html lang="sr-Latn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Moj Raspored</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center;
         justify-content: center; text-align: center; padding: 24px;
         background: #cdfff1; color: #002e22;
         font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
  h1 { font-size: 24px; margin: 0 0 8px; }
  p  { font-size: 16px; margin: 0; opacity: .75; }
</style>
</head>
<body>
  <main>
    <h1>Nema internet veze</h1>
    <p>Otvorite Moj Raspored kada ste na mreži.</p>
  </main>
</body>
</html>`;

self.addEventListener("install", () => {
  // Take over as soon as installed; there's no per-deploy state to migrate.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PAGES, ASSETS]);
      for (const key of await caches.keys()) {
        if (!keep.has(key)) await caches.delete(key);
      }
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (url.origin === self.location.origin) {
    if (
      url.pathname.startsWith("/_next/static/") ||
      url.pathname.startsWith("/icons/")
    ) {
      event.respondWith(cacheFirst(request));
    }
    return;
  }

  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function handleNavigation(request) {
  const cache = await caches.open(PAGES);
  const cached = await cache.match(request.url, { ignoreSearch: true });

  const network = fetch(request).then(async (response) => {
    // Only keep real, successful pages — not redirects or errors.
    if (response.ok && response.type === "basic" && !response.redirected) {
      await cache.put(request.url, response.clone());
    }
    return response;
  });

  if (!cached) {
    return network.catch(() => offlinePage());
  }

  // We have a copy: prefer the fresh page, but don't make anyone wait on a bad
  // connection. (If the network is just slow, it still finishes and refreshes
  // the cache for next time.)
  return Promise.race([
    network.catch(() => cached),
    new Promise((resolve) =>
      setTimeout(() => resolve(cached), NETWORK_TIMEOUT_MS),
    ),
  ]);
}

function offlinePage() {
  return new Response(OFFLINE_HTML, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(request);
  if (hit) return hit;

  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    await trim(cache);
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      // Cross-origin no-cors font requests come back opaque; that's fine to keep.
      if (response.ok || response.type === "opaque")
        cache.put(request, response.clone());
      return response;
    })
    .catch(() => hit);
  return hit || network;
}

async function trim(cache) {
  const keys = await cache.keys(); // insertion order: oldest first
  for (let i = 0; i < keys.length - MAX_ASSETS; i++) {
    await cache.delete(keys[i]);
  }
}
