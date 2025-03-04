if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/bitacora/service-worker.js', {
        scope: '/bitacora/'  // Asegúrate de que el scope sea la misma carpeta o subcarpeta donde está el service-worker.js
    }).then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration);
    }).catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
    });
}

