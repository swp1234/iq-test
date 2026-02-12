/* =================================================================
   Service Worker - Offline Support & Caching
   ================================================================= */

const CACHE_NAME = 'iq-test-v2';
const ASSETS_TO_CACHE = [
    '/iq-test/',
    '/iq-test/index.html',
    '/iq-test/css/style.css',
    '/iq-test/js/app.js',
    '/iq-test/js/i18n.js',
    '/iq-test/js/questions.js',
    '/iq-test/js/locales/ko.json',
    '/iq-test/js/locales/en.json',
    '/iq-test/js/locales/ja.json',
    '/iq-test/js/locales/zh.json',
    '/iq-test/js/locales/hi.json',
    '/iq-test/js/locales/ru.json',
    '/iq-test/js/locales/es.json',
    '/iq-test/js/locales/pt.json',
    '/iq-test/js/locales/id.json',
    '/iq-test/js/locales/tr.json',
    '/iq-test/js/locales/de.json',
    '/iq-test/js/locales/fr.json',
    '/iq-test/icon-192.svg',
    '/iq-test/icon-512.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external URLs (analytics, ads, etc.)
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request)
                    .then((cached) => cached || caches.match('/iq-test/index.html'));
            })
    );
});

// Background Sync (Future use for analytics)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-analytics') {
        event.waitUntil(
            // Sync analytics data when back online
            Promise.resolve()
        );
    }
});

// Push notifications (Future use)
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/iq-test/icon-192.svg',
        badge: '/iq-test/icon-192.svg',
        vibrate: [200, 100, 200],
        tag: 'iq-test-notification',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/iq-test/');
            }
        })
    );
});
