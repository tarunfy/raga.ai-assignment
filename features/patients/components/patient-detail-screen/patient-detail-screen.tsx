"use client";

import {
  ArrowLeftIcon,
  HeartbeatIcon,
  PillIcon,
  StethoscopeIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { EmptyState } from "@/components/common/feedback/empty-state/empty-state";
import { ErrorState } from "@/components/common/feedback/error-state/error-state";
import { PageHeader } from "@/components/common/layout/page-header/page-header";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { getPatientByIdQueryOptions } from "@/features/patients/api/query";
import { CareNoteCard } from "@/features/patients/components/care-note-card/care-note-card";
import { InfoTile } from "@/features/patients/components/info-tile/info-tile";
import { MedicationCard } from "@/features/patients/components/medication-card/medication-card";
import { PatientDetailLoading } from "@/features/patients/components/patient-detail-loading/patient-detail-loading";
import { TimelineEventCard } from "@/features/patients/components/timeline-event-card/timeline-event-card";
import { getRiskVariant } from "@/features/patients/utils";
import { formatDate } from "@/lib/utils";

interface PatientDetailScreenProps {
  patientId: string;
}

/**
 * Renders the patient details page requested in the assignment.
 *
 * @param patientId - The patient identifier from the dynamic route
 */
export const PatientDetailScreen = ({
  patientId,
}: PatientDetailScreenProps) => {
  const { data, error, isError, isLoading, refetch } = useQuery(
    getPatientByIdQueryOptions(patientId)
  );

  if (isLoading) {
    return <PatientDetailLoading />;
  }

  if (isError) {
    return (
      <ErrorState
        description={
          error instanceof Error
            ? error.message
            : "The patient profile could not be loaded."
        }
        onRetry={() => {
          refetch().catch(() => undefined);
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        actionLabel="Back to patients"
        description="We could not find a patient matching that identifier."
        onAction={() => {
          window.location.href = "/patients";
        }}
        title="Patient not found"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <Button asChild variant="outline">
            <Link href="/patients">
              <ArrowLeftIcon className="size-4" />
              Back to roster
            </Link>
          </Button>
        }
        description={data.summary}
        eyebrow="Patient details"
        title={data.fullName}
      />
      <div className="flex flex-wrap gap-2">
        <Badge variant={getRiskVariant(data.riskLevel)}>{data.riskLevel}</Badge>
        <Badge variant="neutral">{data.status}</Badge>
        <Badge variant="default">{data.careProgram}</Badge>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Clinical summary</CardTitle>
            <CardDescription>
              Primary care context, responsible doctor, and latest status.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <InfoTile label="Primary condition" value={data.primaryCondition} />
            <InfoTile label="Assigned doctor" value={data.assignedDoctor} />
            <InfoTile
              label="Location"
              value={`${data.location} · ${data.room}`}
            />
            <InfoTile label="Admitted" value={formatDate(data.admissionDate)} />
            <InfoTile label="Email" value={data.email} />
            <InfoTile label="Phone" value={data.phone} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartbeatIcon className="size-5 text-primary" />
              Latest vitals
            </CardTitle>
            <CardDescription>
              Most recent values captured in the active care plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <InfoTile
              label="Blood pressure"
              value={data.vitals.bloodPressure}
            />
            <InfoTile
              label="Heart rate"
              value={`${data.vitals.heartRate} bpm`}
            />
            <InfoTile
              label="Oxygen saturation"
              value={`${data.vitals.oxygenSaturation}%`}
            />
            <InfoTile
              label="Temperature"
              value={`${data.vitals.temperature.toFixed(1)}°F`}
            />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PillIcon className="size-5 text-primary" />
              Medications
            </CardTitle>
            <CardDescription>Current medication schedule.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.medications.map((medication) => (
              <MedicationCard key={medication.name} medication={medication} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StethoscopeIcon className="size-5 text-primary" />
              Care notes
            </CardTitle>
            <CardDescription>
              The latest multidisciplinary updates for this patient.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.careNotes.map((note) => (
              <CareNoteCard key={note.id} note={note} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Care timeline</CardTitle>
            <CardDescription>
              Important milestones in the current treatment path.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.visitTimeline.map((event) => (
              <TimelineEventCard event={event} key={event.id} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
