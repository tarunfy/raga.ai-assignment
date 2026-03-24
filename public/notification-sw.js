self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const route = event.notification.data?.route ?? "/dashboard";

  event.waitUntil(
    self.clients
      .matchAll({ includeUncontrolled: true, type: "window" })
      .then((clients) => {
        for (const client of clients) {
          if ("focus" in client) {
            return client.navigate(route).then((nextClient) => {
              if (nextClient) {
                return nextClient.focus();
              }

              return client.focus();
            });
          }
        }

        return self.clients.openWindow(route);
      })
  );
});
