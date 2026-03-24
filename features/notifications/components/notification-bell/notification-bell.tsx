"use client";

import { BellIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu";
import { NotificationRow } from "@/features/notifications/components/notification-row/notification-row";
import { useNotificationCenter } from "@/features/notifications/hooks/use-notification-center";
import type { AppNotification } from "@/features/notifications/types";

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
