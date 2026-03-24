import { Skeleton } from "@/components/ui/skeleton/skeleton";

const patientDetailSkeletonIds = ["detail-a", "detail-b", "detail-c"];

/**
 * Patient detail loading skeleton shown while an individual profile resolves.
 */
export const PatientDetailLoading = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-5 w-full max-w-2xl" />
    </div>
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <Skeleton className="h-[22rem] rounded-none" />
      <Skeleton className="h-[22rem] rounded-none" />
    </div>
    <div className="grid gap-4 lg:grid-cols-3">
      {patientDetailSkeletonIds.map((skeletonId) => (
        <Skeleton className="h-[15rem] rounded-none" key={skeletonId} />
      ))}
    </div>
  </div>
);
