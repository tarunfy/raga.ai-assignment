import { Skeleton } from "@/components/ui/skeleton/skeleton";

const patientSkeletonIds = [
  "patient-one",
  "patient-two",
  "patient-three",
  "patient-four",
  "patient-five",
  "patient-six",
];

/**
 * Patient list loading skeleton shown while the roster query resolves.
 */
export const PatientsLoading = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-5 w-full max-w-2xl" />
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {patientSkeletonIds.map((skeletonId) => (
        <Skeleton className="h-[17rem] rounded-none" key={skeletonId} />
      ))}
    </div>
  </div>
);
