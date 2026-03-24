import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import type { NotificationTone } from "@/features/notifications/types";

/**
 * Returns the badge variant that should represent the notification tone.
 *
 * @param tone - The semantic notification tone
 */
export const getToneBadgeVariant = (tone: NotificationTone) => {
  switch (tone) {
    case "danger":
      return "critical";
    case "success":
      return "success";
    default:
      return "neutral";
  }
};

/**
 * Returns the icon used for a notification tone in the bell dropdown.
 *
 * @param tone - The semantic notification tone
 */
export const getToneIcon = (tone: NotificationTone) => {
  switch (tone) {
    case "danger":
      return WarningCircleIcon;
    case "success":
      return CheckCircleIcon;
    default:
      return InfoIcon;
  }
};
