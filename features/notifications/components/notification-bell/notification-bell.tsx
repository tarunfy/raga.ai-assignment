"use client";

import {
  BellIcon,
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu";
import { useNotificationCenter } from "@/features/notifications/hooks/use-notification-center";
import type {
  AppNotification,
  NotificationTone,
} from "@/features/notifications/types";
import { cn, formatRelativeTime } from "@/lib/utils";

const notificationToneLabel: Record<NotificationTone, string> = {
  danger: "Danger",
  normal: "Normal",
  success: "Success",
};

/**
 * Returns the badge variant that should represent the notification tone.
 *
 * @param tone - The semantic notification tone
 */
const getToneBadgeVariant = (tone: NotificationTone) => {
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
const getToneIcon = (tone: NotificationTone) => {
  switch (tone) {
    case "danger":
      return WarningCircleIcon;
    case "success":
      return CheckCircleIcon;
    default:
      return InfoIcon;
  }
};

interface NotificationRowProps {
  notification: AppNotification;
  onOpen: (notification: AppNotification) => void;
}

const NotificationRow = ({ notification, onOpen }: NotificationRowProps) => {
  const ToneIcon = getToneIcon(notification.tone);

  return (
    <button
      className={cn(
        "w-full border-border border-b px-4 py-3 text-left transition hover:bg-muted/50",
        notification.isRead ? "" : "bg-muted/30"
      )}
      onClick={() => onOpen(notification)}
      type="button"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <ToneIcon className="size-4 text-primary" />
            <p className="truncate font-medium text-foreground text-sm">
              {notification.title}
            </p>
          </div>
          <p className="text-muted-foreground text-xs leading-5">
            {notification.body}
          </p>
        </div>
        {notification.isRead ? null : (
          <span className="mt-1 size-2 rounded-full bg-destructive" />
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Badge variant={getToneBadgeVariant(notification.tone)}>
          {notificationToneLabel[notification.tone]}
        </Badge>
        <span className="text-[11px] text-muted-foreground">
          {formatRelativeTime(notification.createdAt)}
        </span>
      </div>
    </button>
  );
};

/**
 * Renders the in-app notification center trigger and dropdown list.
 */
export const NotificationBell = () => {
  const router = useRouter();
  const {
    enableNotifications,
    hasUnread,
    isSupported,
    markAllAsRead,
    markAsRead,
    notifications,
    permission,
    unreadCount,
  } = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenNotification = (notification: AppNotification) => {
    markAsRead(notification.id);
    setIsOpen(false);
    router.push(notification.route);
  };

  const handleMarkAllAsRead = () => {
    if (!hasUnread) {
      return;
    }

    markAllAsRead();
    toast.success("All notifications marked as read.");
  };

  const handleEnableNotifications = async () => {
    await enableNotifications();
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open notifications"
          className="relative"
          size="icon-sm"
          variant="ghost"
        >
          <BellIcon className="size-4" />
          {hasUnread ? (
            <span className="absolute top-1.5 right-1.5 size-2 animate-pulse rounded-full bg-destructive" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[22rem] min-w-[22rem] p-0"
        sideOffset={10}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-heading font-semibold text-sm">Notifications</p>
            <p className="text-muted-foreground text-xs">
              {unreadCount} unread
            </p>
          </div>
          {hasUnread ? (
            <Button onClick={handleMarkAllAsRead} size="xs" variant="ghost">
              Mark all read
            </Button>
          ) : null}
        </div>
        <DropdownMenuSeparator />
        {permission !== "granted" && isSupported ? (
          <>
            <div className="space-y-3 px-4 py-3">
              <div className="space-y-1">
                <p className="font-medium text-foreground text-sm">
                  Enable browser alerts
                </p>
                <p className="text-muted-foreground text-xs leading-5">
                  In-app notifications already work. Enable browser permission
                  to also receive service-worker alerts automatically.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={handleEnableNotifications}
                size="sm"
                variant="outline"
              >
                Enable notifications
              </Button>
            </div>
            <DropdownMenuSeparator />
          </>
        ) : null}
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="font-medium text-foreground text-sm">
              No notifications yet
            </p>
            <p className="mt-2 text-muted-foreground text-xs leading-5">
              Automatic care alerts will appear here as soon as new mock events
              are dispatched.
            </p>
          </div>
        ) : (
          <div className="max-h-[24rem] overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onOpen={handleOpenNotification}
              />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
