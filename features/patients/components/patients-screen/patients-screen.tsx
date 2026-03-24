"use client";

import {
  ArrowRightIcon,
  HeartbeatIcon,
  RowsIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { EmptyState } from "@/components/common/feedback/empty-state/empty-state";
import { ErrorState } from "@/components/common/feedback/error-state/error-state";
import { PageHeader } from "@/components/common/layout/page-header/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { getPatientsQueryOptions } from "@/features/patients/api/query";
import { PatientsLoading } from "@/features/patients/components/patients-loading/patients-loading";
import { usePatientViewStore } from "@/features/patients/stores/use-patient-view-store";
import type { Patient } from "@/features/patients/types";
import { formatDate, getInitials } from "@/lib/utils";

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

interface PatientCardProps {
  patient: Patient;
}

const getStatusVariant = (riskLevel: Patient["riskLevel"]) => {
  switch (riskLevel) {
    case "critical":
      return "critical";
    case "high":
      return "warning";
    default:
      return "neutral";
  }
};

const PatientGridCard = ({ patient }: PatientCardProps) => (
  <Card className="h-full">
    <CardHeader className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarFallback>{getInitials(patient.fullName)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle>{patient.fullName}</CardTitle>
            <CardDescription>
              {patient.primaryCondition} · {patient.age} years
            </CardDescription>
          </div>
        </div>
        <Badge variant={getStatusVariant(patient.riskLevel)}>
          {patient.riskLevel}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-none bg-muted/55 p-3">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Program
          </p>
          <p className="mt-2 font-medium text-foreground">
            {patient.careProgram}
          </p>
        </div>
        <div className="rounded-none bg-muted/55 p-3">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Room
          </p>
          <p className="mt-2 font-medium text-foreground">{patient.room}</p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-6">
        {patient.summary}
      </p>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <HeartbeatIcon className="size-4 text-primary" />
        BP {patient.vitals.bloodPressure} · HR {patient.vitals.heartRate} bpm ·
        O₂ {patient.vitals.oxygenSaturation}%
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-xs">
          Updated {formatDate(patient.lastUpdated)}
        </span>
        <Button asChild size="sm" variant="outline">
          <Link href={`/patients/${patient.id}`}>
            View details
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const PatientListRow = ({ patient }: PatientCardProps) => (
  <Card>
    <CardContent className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar className="size-12">
          <AvatarFallback>{getInitials(patient.fullName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-heading font-semibold text-lg tracking-tight">
              {patient.fullName}
            </p>
            <Badge variant={getStatusVariant(patient.riskLevel)}>
              {patient.riskLevel}
            </Badge>
            <Badge variant="neutral">{patient.status}</Badge>
          </div>
          <p className="max-w-xs text-muted-foreground text-sm">
            {patient.primaryCondition} · {patient.careProgram} · {patient.room}
          </p>
        </div>
      </div>
      <div className="grid gap-3 text-muted-foreground text-sm sm:grid-cols-3 lg:min-w-[28rem]">
        <div className="rounded-none bg-muted/55 px-3 py-2">
          <p className="text-xs uppercase tracking-[0.18em]">Doctor</p>
          <p className="mt-1 font-medium text-foreground">
            {patient.assignedDoctor}
          </p>
        </div>
        <div className="rounded-none bg-muted/55 px-3 py-2">
          <p className="text-xs uppercase tracking-[0.18em]">Vitals</p>
          <p className="mt-1 font-medium text-foreground">
            {patient.vitals.bloodPressure} · {patient.vitals.heartRate} bpm
          </p>
        </div>
        <div className="rounded-none bg-muted/55 px-3 py-2">
          <p className="text-xs uppercase tracking-[0.18em]">Updated</p>
          <p className="mt-1 font-medium text-foreground">
            {formatDate(patient.lastUpdated)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Button asChild size="sm" variant="outline">
          <Link href={`/patients/${patient.id}`}>
            View details
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);
