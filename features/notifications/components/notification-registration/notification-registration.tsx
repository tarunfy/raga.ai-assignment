"use client";

import { useEffect } from "react";
import { registerNotificationServiceWorker } from "@/features/notifications/api/notification-service";

/**
 * Registers the local notification service worker when the app boots in the browser.
 */
export const NotificationRegistration = () => {
  useEffect(() => {
    const registration = registerNotificationServiceWorker();

    if (registration) {
      registration.catch(() => undefined);
    }
  }, []);

  return null;
};
