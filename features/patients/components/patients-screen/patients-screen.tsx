"use client";

import { RowsIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/common/feedback/empty-state/empty-state";
import { ErrorState } from "@/components/common/feedback/error-state/error-state";
import { PageHeader } from "@/components/common/layout/page-header/page-header";
import { Button } from "@/components/ui/button/button";
import { getPatientsQueryOptions } from "@/features/patients/api/query";
import { PatientGridCard } from "@/features/patients/components/patient-grid-card/patient-grid-card";
import { PatientListRow } from "@/features/patients/components/patient-list-row/patient-list-row";
import { PatientsLoading } from "@/features/patients/components/patients-loading/patients-loading";
import { usePatientViewStore } from "@/features/patients/stores/use-patient-view-store";

/**
 * Renders the patient roster with grid and list layouts backed by persisted view state.
 */
export const PatientsScreen = () => {
  const { data, error, isError, isLoading, refetch } = useQuery(
    getPatientsQueryOptions()
  );
  const { setView, view } = usePatientViewStore();

  if (isLoading) {
    return <PatientsLoading />;
  }

  if (isError) {
    return (
      <ErrorState
        description={
          error instanceof Error
            ? error.message
            : "The patient roster could not be loaded."
        }
        onRetry={() => {
          refetch().catch(() => undefined);
        }}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        description="The patient roster is empty right now."
        title="No patients available"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <div className="flex items-center gap-2 rounded-none border border-border/70 bg-card/70 p-1">
            <Button
              onClick={() => setView("grid")}
              size="sm"
              variant={view === "grid" ? "default" : "ghost"}
            >
              <SquaresFourIcon className="size-4" />
              Grid
            </Button>
            <Button
              onClick={() => setView("list")}
              size="sm"
              variant={view === "list" ? "default" : "ghost"}
            >
              <RowsIcon className="size-4" />
              List
            </Button>
          </div>
        }
        description="Browse the patient roster, switch between layouts, and open individual profiles for deeper treatment context."
        eyebrow="Patients"
        title="Patient directory"
      />
      {view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map((patient) => (
            <PatientGridCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((patient) => (
            <PatientListRow key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};
