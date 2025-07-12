
// Service worker for push notifications

self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'favicon.ico',
    badge: 'favicon.ico'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
