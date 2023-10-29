import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const precacheManifest = [
  { url: '/index.html', revision: '1.0.0' },
  { url: '/main.js', revision: '1.0.0' },
  { url: '/styles.css', revision: '1.0.0' },
  { url: '/favicon.ico', revision: '1.0.0' },
];

precacheAndRoute(precacheManifest);

const cacheName = 'ahj-v2';

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys
          .filter((key) => key.startsWith('ahj-') && key !== cacheName)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

const cacheablePlugin = new CacheableResponsePlugin({
  statuses: [200],
  headers: {
    'Content-Type': ['application/javascript', 'text/css', 'text/html'],
  },
});

const jsStrategy = new CacheFirst({
  cacheName: 'js',
  plugins: [cacheablePlugin],
  matchOptions: {
    ignoreVary: true,
  },
});

const cssStrategy = new CacheFirst({
  cacheName: 'css',
  plugins: [cacheablePlugin],

  matchOptions: {
    ignoreVary: true,
  },
});

const htmlStrategy = new CacheFirst({
  cacheName: 'html',
  plugins: [cacheablePlugin],
  matchOptions: {
    ignoreVary: true,
  },
});

const apiStrategy = new NetworkFirst({
  cacheName: 'api',
  plugins: [cacheablePlugin],
  matchOptions: {
    ignoreVary: true,
  },
});

registerRoute(/\/news/, apiStrategy);

registerRoute(/\.css$/, cssStrategy);

registerRoute(/\.js$/, jsStrategy);

registerRoute(/index\.html$/, htmlStrategy);

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});

export default cacheName;
