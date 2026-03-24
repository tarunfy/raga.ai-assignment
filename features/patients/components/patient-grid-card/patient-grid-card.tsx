import {
  ArrowRightIcon,
  HeartbeatIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
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
import type { Patient } from "@/features/patients/types";
import { getStatusVariant } from "@/features/patients/utils";
import { formatDate, getInitials } from "@/lib/utils";

interface PatientGridCardProps {
  patient: Patient;
}

/**
 * Renders a single patient as a grid card in the roster view.
 */
export const PatientGridCard = ({ patient }: PatientGridCardProps) => (
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
