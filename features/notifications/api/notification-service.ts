import type { LocalNotificationPayload } from "@/features/notifications/types";

const notificationServiceWorkerPath = "/notification-sw.js";

/**
 * Returns whether the current browser supports service-worker notifications.
 */
export const isNotificationSupported = () =>
  typeof window !== "undefined" &&
  "Notification" in window &&
  "serviceWorker" in navigator;

/**
 * Returns the current browser notification permission state.
 */
export const getNotificationPermission = (): NotificationPermission => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }

  return Notification.permission;
};

/**
 * Registers the local notification service worker when the environment supports it.
 */
export const registerNotificationServiceWorker = () => {
  if (!isNotificationSupported()) {
    return null;
  }

  return navigator.serviceWorker.register(notificationServiceWorkerPath);
};

/**
 * Requests browser notification permission from the user.
 */
export const requestNotificationPermission = () => {
  if (!isNotificationSupported()) {
    return "denied" as const;
  }

  return Notification.requestPermission();
};

/**
 * Shows a local notification through the registered service worker.
 *
 * @param payload - The notification content and navigation target
 */
export const showLocalNotification = async (
  payload: LocalNotificationPayload
) => {
  if (!isNotificationSupported()) {
    throw new Error("Notifications are not supported in this browser.");
  }

  if (Notification.permission !== "granted") {
    throw new Error("Notification permission has not been granted.");
  }

  const registration = await registerNotificationServiceWorker();

  if (!registration) {
    throw new Error("The notification service worker could not be registered.");
  }

  await registration.showNotification(payload.title, {
    body: payload.body,
    data: {
      route: payload.route,
      tone: payload.tone,
    },
    requireInteraction: payload.tone === "danger",
    tag: payload.tag,
  });
};
