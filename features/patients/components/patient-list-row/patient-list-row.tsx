import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card/card";
import type { Patient } from "@/features/patients/types";
import { getStatusVariant } from "@/features/patients/utils";
import { formatDate, getInitials } from "@/lib/utils";

interface PatientListRowProps {
  patient: Patient;
}

/**
 * Renders a single patient as a horizontal row in the roster list view.
 */
export const PatientListRow = ({ patient }: PatientListRowProps) => (
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
