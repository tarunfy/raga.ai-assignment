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
import { PatientDetailLoading } from "@/features/patients/components/patient-detail-loading/patient-detail-loading";
import { formatDate, formatDateTime } from "@/lib/utils";

interface PatientDetailScreenProps {
  patientId: string;
}

const getRiskVariant = (riskLevel: "critical" | "high" | "moderate") => {
  switch (riskLevel) {
    case "critical":
      return "critical";
    case "high":
      return "warning";
    default:
      return "neutral";
  }
};

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
              <div
                className="rounded-none border border-border/70 bg-muted/55 p-3"
                key={medication.name}
              >
                <p className="font-medium text-foreground">{medication.name}</p>
                <p className="mt-1 text-muted-foreground text-sm">
                  {medication.dosage} · {medication.schedule}
                </p>
              </div>
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
              <div
                className="rounded-none border border-border/70 bg-background/85 p-3"
                key={note.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground text-sm">
                    {note.author}
                  </p>
                  <span className="text-muted-foreground text-xs">
                    {formatDateTime(note.recordedAt)}
                  </span>
                </div>
                <p className="mt-2 text-muted-foreground text-sm leading-6">
                  {note.content}
                </p>
              </div>
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
              <div className="rounded-none bg-muted/55 p-3" key={event.id}>
                <p className="font-semibold text-foreground text-sm">
                  {event.title}
                </p>
                <p className="mt-1 text-muted-foreground text-sm leading-6">
                  {event.description}
                </p>
                <p className="mt-2 text-muted-foreground text-xs">
                  {formatDateTime(event.date)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface InfoTileProps {
  label: string;
  value: string;
}

const InfoTile = ({ label, value }: InfoTileProps) => (
  <div className="rounded-none border border-border/70 bg-muted/55 p-4">
    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.18em]">
      {label}
    </p>
    <p className="mt-2 font-medium text-foreground text-sm leading-6">
      {value}
    </p>
  </div>
);
