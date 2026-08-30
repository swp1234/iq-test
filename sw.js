const CACHE_NAME = "iq-puzzle-v5";
const APP_ROOT = new URL("./", self.location.href);
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/i18n.js",
  "./js/questions.js",
  "./manifest.json",
  "./icon-192.svg",
  "./icon-512.svg",
  ...[
    "ko",
    "en",
    "ja",
    "zh",
    "hi",
    "ru",
    "es",
    "pt",
    "id",
    "tr",
    "de",
    "fr",
  ].map((language) => `./js/locales/${language}.json`),
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    requestUrl.origin !== self.location.origin ||
    !requestUrl.pathname.startsWith(APP_ROOT.pathname)
  )
    return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok)
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, response.clone()));
        return response;
      })
      .catch(
        async () =>
          (await caches.match(event.request)) || caches.match("./index.html"),
      ),
  );
});
