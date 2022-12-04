console.log('service worker up!')

self.addEventListener('install', e =>{
    console.log('service worker installed!')
    const cacheProm = caches.open('cache-v1')
        .then(cache => {
            return cache.addAll([   
                '/',             
                'index.html',
                'css/style.css',
                'main.js',
                'app.js',
                'src/Cute_woman_chef_holding_cloche_food_tray_hand_drawn_logo_cartoon_art_illustration.jpg',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js'
                
            ])
            
        });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});
