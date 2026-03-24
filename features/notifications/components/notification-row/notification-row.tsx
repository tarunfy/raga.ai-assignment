import { Badge } from "@/components/ui/badge/badge";
import { NOTIFICATION_TONE_LABEL } from "@/features/notifications/constants";
import type { AppNotification } from "@/features/notifications/types";
import { getToneBadgeVariant, getToneIcon } from "@/features/notifications/utils";
import { cn, formatRelativeTime } from "@/lib/utils";

interface NotificationRowProps {
  notification: AppNotification;
  onOpen: (notification: AppNotification) => void;
}

/**
 * Renders a single notification entry inside the bell dropdown list.
 */
export const NotificationRow = ({
  notification,
  onOpen,
}: NotificationRowProps) => {
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
          {NOTIFICATION_TONE_LABEL[notification.tone]}
        </Badge>
        <span className="text-[0.6875rem] text-muted-foreground">
          {formatRelativeTime(notification.createdAt)}
        </span>
      </div>
    </button>
  );
};
