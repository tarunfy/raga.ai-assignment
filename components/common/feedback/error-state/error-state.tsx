import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card/card";

interface ErrorStateProps {
  actionLabel?: string;
  description?: string;
  onRetry?: () => void;
  title?: string;
}

/**
 * Displays a consistent recoverable error state for feature screens.
 *
 * @param actionLabel - Optional label for the retry action
 * @param description - Supporting error copy
 * @param onRetry - Optional retry callback
 * @param title - Optional heading describing the error state
 */
export const ErrorState = ({
  actionLabel = "Try again",
  description = "Something went wrong while loading this section. Please retry.",
  onRetry,
  title = "We hit an unexpected problem",
}: ErrorStateProps) => (
  <Card className="border-destructive/20 bg-card/90">
    <CardContent className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <WarningCircleIcon className="size-7" />
      </div>
      <div className="space-y-2">
        <h2 className="font-heading font-semibold text-xl tracking-tight">
          {title}
        </h2>
        <p className="max-w-md text-muted-foreground text-sm leading-6">
          {description}
        </p>
      </div>
      {onRetry ? (
        <Button onClick={onRetry} variant="outline">
          {actionLabel}
        </Button>
      ) : null}
    </CardContent>
  </Card>
);
