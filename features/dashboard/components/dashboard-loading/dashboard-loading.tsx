import { Skeleton } from "@/components/ui/skeleton/skeleton";

const dashboardMetricSkeletonIds = [
  "metric-active",
  "metric-alerts",
  "metric-appointments",
  "metric-utilization",
];

/**
 * Dashboard loading skeleton shown while query data is resolving.
 */
export const DashboardLoading = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-5 w-full max-w-2xl" />
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dashboardMetricSkeletonIds.map((skeletonId) => (
        <Skeleton className="h-40 rounded-none" key={skeletonId} />
      ))}
    </div>
    <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <Skeleton className="h-96 rounded-none" />
      <Skeleton className="h-96 rounded-none" />
    </div>
    <div className="w-full">
      <Skeleton className="h-80 rounded-none" />
    </div>
  </div>
);
