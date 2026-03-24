import { Skeleton } from "@/components/ui/skeleton/skeleton";

const analyticsSummarySkeletonIds = [
  "summary-admissions",
  "summary-risk",
  "summary-compliance",
];

/**
 * Analytics loading skeleton shown while the report query resolves.
 */
export const AnalyticsLoading = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-5 w-full max-w-2xl" />
    </div>
    <div className="grid gap-4 lg:grid-cols-3">
      {analyticsSummarySkeletonIds.map((skeletonId) => (
        <Skeleton className="h-32 rounded-none" key={skeletonId} />
      ))}
    </div>
    <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
      <Skeleton className="h-[23rem] rounded-none" />
      <Skeleton className="h-[23rem] rounded-none" />
    </div>
    <Skeleton className="h-[23rem] rounded-none" />
  </div>
);
