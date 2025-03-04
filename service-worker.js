const CACHE_NAME = 'suma-pwa-cache-v2';
const urlsToCache = [
    '/',  // Raíz del sitio
    '/index.html',  // Página principal
    '/estilos.css',  // Estilos CSS
    '/app.js',  // Archivo de JavaScript
    '/funciones.js',  // Archivo de JavaScript
    '/manifest.json',  // Archivo del manifiesto
    '/icons/icon-192x192.png',  // Icono de 192x192
    '/icons/icon-512x512.png',  // Icono de 512x512
    '/webfonts/fa-brands-400.ttf',  // Fuente de marca
    '/webfonts/fa-brands-400.woff2',  // Fuente de marca (woff2)
    '/webfonts/fa-regular-400.ttf',  // Fuente regular
    '/webfonts/fa-regular-400.woff2',  // Fuente regular (woff2)
    '/webfonts/fa-solid-900.ttf',  // Fuente sólida
    '/webfonts/fa-solid-900.woff2',  // Fuente sólida (woff2)
    '/webfonts/fa-v4compatibility.ttf',  // Fuente de compatibilidad v4
    '/webfonts/fa-v4compatibility.woff2'  // Fuente de compatibilidad v4 (woff2)
];


// Activación y limpieza de caché anterior
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
