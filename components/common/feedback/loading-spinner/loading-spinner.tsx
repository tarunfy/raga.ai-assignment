import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

/**
 * Renders a compact spinner for inline loading states.
 *
 * @param className - Optional class names for sizing and coloring
 */
export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
  <span
    aria-hidden="true"
    className={cn(
      "inline-flex size-4 animate-spin rounded-full border-2 border-current border-t-transparent",
      className
    )}
  />
);
