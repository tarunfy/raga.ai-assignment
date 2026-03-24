import type { ReactNode } from "react";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card/card";

interface EmptyStateProps {
  actionLabel?: string;
  children?: ReactNode;
  description: string;
  onAction?: () => void;
  title: string;
}

/**
 * Displays a reusable empty state with optional recovery action.
 *
 * @param actionLabel - Optional label for the recovery button
 * @param children - Optional custom content rendered below the text
 * @param description - Supporting empty-state copy
 * @param onAction - Optional callback for the recovery action
 * @param title - Main empty-state heading
 */
export const EmptyState = ({
  actionLabel,
  children,
  description,
  onAction,
  title,
}: EmptyStateProps) => (
  <Card className="border-dashed bg-card/80">
    <CardContent className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="font-semibold text-lg">0</span>
      </div>
      <div className="space-y-2">
        <h2 className="font-heading font-semibold text-xl tracking-tight">
          {title}
        </h2>
        <p className="max-w-md text-muted-foreground text-sm leading-6">
          {description}
        </p>
      </div>
      {children}
      {actionLabel && onAction ? (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      ) : null}
    </CardContent>
  </Card>
);
