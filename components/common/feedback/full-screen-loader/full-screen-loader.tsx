import { LoadingSpinner } from "@/components/common/feedback/loading-spinner/loading-spinner";

interface FullScreenLoaderProps {
  description?: string;
  title?: string;
}

/**
 * Displays a branded full-screen loading state for route and session transitions.
 *
 * @param description - Optional supporting copy shown below the heading
 * @param title - Optional heading describing the current loading work
 */
export const FullScreenLoader = ({
  description = "Please wait while we prepare the next view.",
  title = "Loading",
}: FullScreenLoaderProps) => (
  <div className="flex min-h-screen items-center justify-center px-6 py-12">
    <div className="w-full max-w-sm text-center">
      <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/12 text-primary">
        <LoadingSpinner className="size-6" />
      </div>
      <h1 className="font-heading font-semibold text-2xl tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-muted-foreground text-sm leading-6">
        {description}
      </p>
    </div>
  </div>
);
