import type { PatientCareNote } from "@/features/patients/types";
import { formatDateTime } from "@/lib/utils";

interface CareNoteCardProps {
  note: PatientCareNote;
}

/**
 * Renders a single care note entry inside the patient detail view.
 */
export const CareNoteCard = ({ note }: CareNoteCardProps) => (
  <div className="rounded-none border border-border/70 bg-background/85 p-3">
    <div className="flex items-center justify-between gap-3">
      <p className="font-semibold text-foreground text-sm">{note.author}</p>
      <span className="text-muted-foreground text-xs">
        {formatDateTime(note.recordedAt)}
      </span>
    </div>
    <p className="mt-2 text-muted-foreground text-sm leading-6">
      {note.content}
    </p>
  </div>
);
