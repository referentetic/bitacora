const CACHE_NAME = 'bitacora-pwa-cache-v2';
const urlsToCache = [
    '/bitacora/',  // Asegúrate de que esta ruta sea correcta y se refiera a la página principal
    '/bitacora/index.html',
    '/bitacora/estilos.css',
    '/bitacora/app.js',
    '/bitacora/funciones.js',
    '/bitacora/manifest.json',
    '/bitacora/icons/icon-192x192.png',
    '/bitacora/icons/icon-512x512.png',
    '/bitacora/webfonts/fa-brands-400.ttf',
    '/bitacora/webfonts/fa-brands-400.woff2',
    '/bitacora/webfonts/fa-regular-400.ttf',
    '/bitacora/webfonts/fa-regular-400.woff2',
    '/bitacora/webfonts/fa-solid-900.ttf',
    '/bitacora/webfonts/fa-solid-900.woff2',
    '/bitacora/webfonts/fa-v4compatibility.ttf',
    '/bitacora/webfonts/fa-v4compatibility.woff2'
];


// Instalación y caché de archivos
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Almacenando archivos en caché');
            return cache.addAll(urlsToCache); // Almacena los archivos al instalar
        })
    );
});

// Activación y limpieza de caché antiguo
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Service Worker: Eliminando caché antiguo: ${cacheName}`);
                        return caches.delete(cacheName);  // Elimina las versiones anteriores del caché
                    }
                })
            );
        })
    );
});

// Gestión de las solicitudes (fetch)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Si hay una respuesta en caché, la devuelve
            return cachedResponse || fetch(event.request).then((response) => {
                // Almacena la respuesta obtenida por fetch en caché para futuras solicitudes
                if (event.request.url.includes('/icons/')) {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response); // Almacena los iconos en caché
                    });
                }
                return response;
            });
        })
    );
});
