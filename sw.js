/**
 * Service Worker - Portal do Morador Reserva dos Pássaros
 * Permite funcionamento offline, carregamento instantâneo e instalação como PWA.
 */

const CACHE_NAME = 'reserva-passaros-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './js/tailwind-config.js',
    './js/app.js',
    './icons/icon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// Instalação do Service Worker e gravação inicial em cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Estratégia de busca: Cache com fallback de rede
self.addEventListener('fetch', (event) => {
    // Intercepta apenas requisições HTTP/HTTPS locais
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                // Não armazena em cache chamadas de extensões ou externas de CDN dinâmicas falhas
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            }).catch(() => {
                // Fallback offline caso perca conexão
                return caches.match('./index.html');
            });
        })
    );
});
