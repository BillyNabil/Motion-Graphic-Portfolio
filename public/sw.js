// Service Worker for Offline Support
const CACHE_NAME = 'billynabil-portfolio-v1';
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/dancing evernight.webp',
  '/comp 2.webp',
  '/billz png.png',
  '/vgen-logo.png',
  '/video bg.webm'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to cache resources:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache successful responses
            if (event.request.url.startsWith(self.location.origin)) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          }
        ).catch(() => {
          // Offline fallback for HTML pages
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/');
          }
          
          // For images, return a placeholder or cached version
          if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
            return new Response(
              `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                 <rect width="100%" height="100%" fill="#1a1a1a"/>
                 <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial">
                   Image unavailable offline
                 </text>
               </svg>`,
              { 
                headers: { 'Content-Type': 'image/svg+xml' }
              }
            );
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for form submissions (if needed)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications (if implemented)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Billynabil Portfolio',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Billynabil Portfolio', options)
  );
});

// Helper function for background sync
async function doBackgroundSync() {
  // Implement any background sync logic here
  console.log('Background sync completed');
}

// Message handling for communication with main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
