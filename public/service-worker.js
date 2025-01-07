const CACHE_NAME = 'scoreboard-app-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';
const urlsToCache = [
    '/',
    '/views/AchievementsPage.js',
    '/views/GamesPage.js',
    '/views/HomePage.js',
    '/views/NewGamePage.js',
    '/images/FlashscoreLogo.png',
    '/images/insignia_Elite.png',
    '/images/insignia_Experienced.png',
    '/images/insignia_Intermediate.png',
    '/images/insignia_Legend.png',
    '/images/insignia_Newbie.png',
    '/images/insignia_Rookie.png',
    '/images/Janne.jpg',
    '/images/Oskari.jpg',
    '/images/Lauri.jpg',
    '/images/Eero.jpg'
  ];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      }).then(() => {
      }).catch((error) => {
        console.error('Failed to cache resources:', error);
      })
    );
  });

self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }).then(() => {
        self.clients.claim();
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/games')) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(event.request)
            .then((response) => {
              if (response.ok) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
            .catch(() => {
              return cache.match(event.request);
            });
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  });
