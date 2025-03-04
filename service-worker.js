const CACHE_NAME = 'suma-pwa-cache-v3';
const urlsToCache = [
    '/',  // Raíz del sitio
    '/index.html',  // Página principal
    '/estilos.css',  // Estilos CSS
    '/all.css',  // Estilos CSS
    '/app.js',  // Archivo de JavaScript
    '/funciones.js',  // Archivo de JavaScript
    '/manifest.json',  // Archivo del manifiesto
    '/icons/icon-192x192.png',  // Icono de 192x192
    '/icons/icon-512x512.png',  // Icono de 512x512
    'webfonts/fa-brands-400.ttf',  // Fuente de marca
    'webfonts/fa-brands-400.woff2',  // Fuente de marca (woff2)
    'webfonts/fa-regular-400.ttf',  // Fuente regular
    'webfonts/fa-regular-400.woff2',  // Fuente regular (woff2)
    'webfonts/fa-solid-900.ttf',  // Fuente sólida
    'webfonts/fa-solid-900.woff2',  // Fuente sólida (woff2)
    'webfonts/fa-v4compatibility.ttf',  // Fuente de compatibilidad v4
    'webfonts/fa-v4compatibility.woff2'  // Fuente de compatibilidad v4 (woff2)
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();  // Forzar que el Service Worker se active inmediatamente
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);  // Almacenar los archivos en caché
        })
    );
});

// Activación y limpieza de caché anterior
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);  // Eliminar caché antiguo
                    }
                })
            );
        })
    );
});

// Interceptación de las solicitudes (Fetch)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Si ya existe una respuesta en caché, devuelvela
            if (cachedResponse) {
                // Aquí puedes agregar lógica para verificar si la caché está desactualizada y actualizarla
                const fetchRequest = event.request.clone();
                
                // Realizamos la solicitud en segundo plano
                fetch(fetchRequest).then((networkResponse) => {
                    // Si la solicitud es exitosa, actualizamos la caché con el contenido más reciente
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                });

                return cachedResponse;  // Retornamos el contenido de la caché
            }

            // Si no existe en caché, realizamos la solicitud normalmente
            return fetch(event.request);
        })
    );
});

