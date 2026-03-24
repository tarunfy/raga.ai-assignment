import type { PatientMedication } from "@/features/patients/types";

interface MedicationCardProps {
  medication: PatientMedication;
}

/**
 * Renders a single medication entry inside the patient detail view.
 */
export const MedicationCard = ({ medication }: MedicationCardProps) => (
  <div className="rounded-none border border-border/70 bg-muted/55 p-3">
    <p className="font-medium text-foreground">{medication.name}</p>
    <p className="mt-1 text-muted-foreground text-sm">
      {medication.dosage} · {medication.schedule}
    </p>
  </div>
);
