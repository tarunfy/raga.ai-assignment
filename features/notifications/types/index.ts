/**
 * Supported notification tones used across the in-app center and Sonner.
 */
export type NotificationTone = "danger" | "normal" | "success";

/**
 * Shared notification scenario shape used by mock events and manual tests.
 */
export interface NotificationScenario {
  body: string;
  id: string;
  route: string;
  title: string;
  tone: NotificationTone;
}

/**
 * Persisted application notification stored inside the in-app notification center.
 */
export interface AppNotification extends NotificationScenario {
  createdAt: string;
  isRead: boolean;
}

/**
 * Payload forwarded to the browser notification service.
 */
export interface LocalNotificationPayload {
  body: string;
  route: string;
  tag: string;
  title: string;
  tone: NotificationTone;
}
