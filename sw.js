// Service Worker — Chifa Pedidos
// Permite que las notificaciones lleguen aunque la pestaña esté en segundo plano.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  // Por si acaso se recibe un push nativo en el futuro
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || '🔔 Nuevo pedido', {
      body: data.body || '',
      icon: data.icon || '',
      badge: data.badge || '',
      tag: data.tag || 'pedido'
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({type:'window', includeUncontrolled:true}).then(clients => {
      const c = clients.find(c => c.url.includes('cocina'));
      if(c) return c.focus();
      return self.clients.openWindow('cocina.html');
    })
  );
});
