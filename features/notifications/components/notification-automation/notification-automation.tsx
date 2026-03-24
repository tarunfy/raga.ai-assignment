"use client";

import { useEffect } from "react";
import { automaticNotificationScenarios } from "@/features/notifications/data/notification-scenarios";
import { useNotificationCenter } from "@/features/notifications/hooks/use-notification-center";

const notificationSessionKey = "notification-automation-started";

/**
 * Starts the mock automatic notification flow once per browser session.
 */
export const NotificationAutomation = () => {
  const { triggerNotification } = useNotificationCenter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (window.sessionStorage.getItem(notificationSessionKey) === "true") {
      return undefined;
    }

    window.sessionStorage.setItem(notificationSessionKey, "true");

    const timeoutIds = automaticNotificationScenarios.map((scenario) =>
      window.setTimeout(() => {
        triggerNotification(scenario).catch(() => undefined);
      }, scenario.delayMs)
    );

    return () => {
      for (const timeoutId of timeoutIds) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [triggerNotification]);

  return null;
};
