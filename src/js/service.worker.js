import { precacheAndRoute } from 'workbox-precaching'; // eslint-disable-line import/no-extraneous-dependencies
import { CacheFirst } from 'workbox-strategies'; // eslint-disable-line import/no-extraneous-dependencies
import { registerRoute } from 'workbox-routing'; // eslint-disable-line import/no-extraneous-dependencies
import { CacheableResponsePlugin } from 'workbox-cacheable-response'; // eslint-disable-line import/no-extraneous-dependencies

const precacheManifest = [
  { url: 'index.html', revision: '1.0.0' },
  { url: '/main.js', revision: '1.0.0' },
  { url: 'favicon.ico', revision: '1.0.0' },
  // { url: '/', revision: '1.0.0' },
];

console.log('ways', precacheManifest);

/* eslint-disable */
precacheAndRoute(precacheManifest);

self.addEventListener('activate', (evt) => {
  evt.waitUntil((async () => {
    const cacheKeys = await caches.keys();
    await Promise.all(
      cacheKeys
        .filter((key) => key.startsWith('ahj-') && key !== cacheName)
        .map((key) => caches.delete(key)),
    );
    await self.clients.claim();
  })());
});

const cacheablePlugin = new CacheableResponsePlugin({
  statuses: [200], // Укажите статусы ответов, которые хотите кэшировать
  headers: {
    'Content-Type': 'application/javascript', // Заголовок для кэширования JS
    'Content-Type': 'text/css', // Заголовок для кэширования CSS
    'Content-Type': 'text/html', // Заголовок для кэширования HTML
  },
});

const jsStrategy = new CacheFirst({
  cacheName: 'js',
  plugins: [
    cacheablePlugin,
  ],
});

const cssStrategy = new CacheFirst({
  cacheName: 'css',
  plugins: [
    cacheablePlugin,
  ],
});

const htmlStrategy = new CacheFirst({
  cacheName: 'html',
  plugins: [
    cacheablePlugin,
  ],
});

registerRoute(
  /\.css$/,
  cssStrategy,
);

registerRoute(
  /\.js$/,
  jsStrategy,
);

registerRoute(
  /index\.html$/,
  htmlStrategy,
);

self.addEventListener('fetch', (evt) => {
  const requestUrl = new URL(evt.request.url);
  if (requestUrl.pathname.startsWith('/news')) {
    return;
  }

  evt.respondWith(
    caches.match(evt.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('cachedResponse', cachedResponse)
        return cachedResponse;
      }
      return fetch(evt.request);
    }),
  );
});
