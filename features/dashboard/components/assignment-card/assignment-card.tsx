import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import type { RecentAssignment } from "@/features/dashboard/types";
import { getAssignmentVariant } from "@/features/dashboard/utils";
import { formatDateTime } from "@/lib/utils";

interface AssignmentCardProps {
  assignment: RecentAssignment;
}

/**
 * Renders a single care-team assignment row in the dashboard feed.
 */
export const AssignmentCard = ({ assignment }: AssignmentCardProps) => (
  <div className="rounded-none border border-border/70 bg-background/85 p-4">
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading font-semibold text-lg tracking-tight">
            {assignment.patientName}
          </h2>
          <Badge variant={getAssignmentVariant(assignment.priority)}>
            {assignment.priority}
          </Badge>
        </div>
        <p className="font-medium text-primary text-sm">
          {assignment.program}
        </p>
        <p className="text-muted-foreground text-sm leading-6">
          {assignment.summary}
        </p>
      </div>
      <Button asChild className="shrink-0" variant="outline">
        <Link href={`/patients/${assignment.patientId}`}>
          View profile
          <ArrowRightIcon className="size-4" />
        </Link>
      </Button>
    </div>
    <div className="mt-4 flex flex-wrap gap-3 text-muted-foreground text-xs">
      <span>Assigned to {assignment.assignedTo}</span>
      <span>{formatDateTime(assignment.updatedAt)}</span>
    </div>
  </div>
);
