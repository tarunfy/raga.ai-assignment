import type { PatientVisitEvent } from "@/features/patients/types";
import { formatDateTime } from "@/lib/utils";

interface TimelineEventCardProps {
  event: PatientVisitEvent;
}

/**
 * Renders a single milestone in the patient care timeline.
 */
export const TimelineEventCard = ({ event }: TimelineEventCardProps) => (
  <div className="rounded-none bg-muted/55 p-3">
    <p className="font-semibold text-foreground text-sm">{event.title}</p>
    <p className="mt-1 text-muted-foreground text-sm leading-6">
      {event.description}
    </p>
    <p className="mt-2 text-muted-foreground text-xs">
      {formatDateTime(event.date)}
    </p>
  </div>
);
