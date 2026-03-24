"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getNotificationPermission,
  isNotificationSupported,
  requestNotificationPermission,
  showLocalNotification,
} from "@/features/notifications/api/notification-service";
import { useNotificationStore } from "@/features/notifications/stores/use-notification-store";
import type {
  AppNotification,
  NotificationScenario,
} from "@/features/notifications/types";

interface TriggerNotificationOptions {
  notifyInBrowser?: boolean;
  showToast?: boolean;
}

const getNotificationId = (scenarioId: string) =>
  `${scenarioId}-${Date.now()}-${Math.round(Math.random() * 1000)}`;

/**
 * Dispatches the matching Sonner toast for the provided notification tone.
 *
 * @param notification - The notification that should be surfaced as a toast
 */
const showNotificationToast = (notification: NotificationScenario) => {
  const toastOptions = {
    description: notification.body,
  };

  switch (notification.tone) {
    case "danger":
      toast.error(notification.title, toastOptions);
      break;
    case "success":
      toast.success(notification.title, toastOptions);
      break;
    default:
      toast.message(notification.title, toastOptions);
      break;
  }
};

/**
 * Manages notification center state, permission, and browser notification delivery.
 */
export const useNotificationCenter = () => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const notifications = useNotificationStore((state) => state.items);
  const [permission, setPermission] = useState<NotificationPermission>(
    getNotificationPermission()
  );
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    setPermission(getNotificationPermission());
  }, []);

  const enableNotifications = useCallback(async () => {
    const nextPermission = await requestNotificationPermission();

    setPermission(nextPermission);

    if (nextPermission === "granted") {
      toast.success("Browser notifications enabled.");
      return nextPermission;
    }

    if (nextPermission === "denied") {
      toast.error(
        "Notification access was denied. Update your browser settings to enable it."
      );
      return nextPermission;
    }

    toast.message("Notification permission request was dismissed.");

    return nextPermission;
  }, []);

  const triggerNotification = useCallback(
    async (
      scenario: NotificationScenario,
      options: TriggerNotificationOptions = {}
    ) => {
      const nextNotification: AppNotification = {
        ...scenario,
        createdAt: new Date().toISOString(),
        id: getNotificationId(scenario.id),
        isRead: false,
      };

      addNotification(nextNotification);

      if (options.showToast) {
        showNotificationToast(nextNotification);
      }

      if (
        options.notifyInBrowser !== false &&
        isNotificationSupported() &&
        permission === "granted"
      ) {
        await showLocalNotification({
          body: nextNotification.body,
          route: nextNotification.route,
          tag: nextNotification.id,
          title: nextNotification.title,
          tone: nextNotification.tone,
        });
      }

      return nextNotification;
    },
    [addNotification, permission]
  );

  return {
    enableNotifications,
    hasUnread: unreadCount > 0,
    isSupported: isNotificationSupported(),
    markAllAsRead,
    markAsRead,
    notifications,
    permission,
    triggerNotification,
    unreadCount,
  };
};
