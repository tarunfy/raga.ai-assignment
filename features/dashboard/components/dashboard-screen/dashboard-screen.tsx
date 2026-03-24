"use client";

import {
  ArrowRightIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
import { getDashboardOverviewQueryOptions } from "@/features/dashboard/api/query";
import { DashboardLoading } from "@/features/dashboard/components/dashboard-loading/dashboard-loading";
import { DEPARTMENT_CAPACITY_COLORS } from "@/features/dashboard/constants";
import { getAssignmentVariant } from "@/features/dashboard/utils";
import { formatCompactNumber, formatDateTime } from "@/lib/utils";

/**
 * Renders the main dashboard with KPIs, charts, assignments, and notification controls.
 */
export const DashboardScreen = () => {
  const { data, error, isError, isLoading, refetch } = useQuery(
    getDashboardOverviewQueryOptions()
  );

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError) {
    return (
      <ErrorState
        description={
          error instanceof Error
            ? error.message
            : "The dashboard data could not be loaded."
        }
        onRetry={() => {
          refetch().catch(() => undefined);
        }}
      />
    );
  }

  if (!data || data.metrics.length === 0) {
    return (
      <EmptyState
        description="There is no dashboard data available right now."
        title="No operational data yet"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        description="Track operational momentum, care-team performance, and critical patient activity from a single executive-style view."
        eyebrow="Overview"
        title="Daily care operations"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => {
          const isPositive = metric.trend === "up";
          const TrendIcon = isPositive ? TrendUpIcon : TrendDownIcon;

          return (
            <Card key={metric.id}>
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="neutral">{metric.label}</Badge>
                  <div className="flex size-10 items-center justify-center rounded-none bg-primary/10 text-primary">
                    <TrendIcon className="size-5" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-3xl">
                    {metric.label === "Team utilization"
                      ? `${metric.value}%`
                      : formatCompactNumber(metric.value)}
                  </CardTitle>
                  <CardDescription>{metric.detail}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant={isPositive ? "success" : "warning"}>
                    {isPositive ? "+" : "-"}
                    {metric.change}%
                  </Badge>
                  <span className="text-muted-foreground">week-over-week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Admissions and discharges</CardTitle>
            <CardDescription>
              Daily throughput across the active care network.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-92">
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart data={data.careTrend}>
                <defs>
                  <linearGradient
                    id="admissionsGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                  <linearGradient
                    id="dischargesGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeDasharray="4 4"
                />
                <XAxis axisLine={false} dataKey="day" tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
                    borderRadius: "18px",
                  }}
                />
                <Area
                  dataKey="admissions"
                  fill="url(#admissionsGradient)"
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  type="monotone"
                />
                <Area
                  dataKey="discharges"
                  fill="url(#dischargesGradient)"
                  stroke="var(--color-chart-2)"
                  strokeWidth={3}
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Department capacity</CardTitle>
            <CardDescription>
              Occupied beds compared with staffed capacity.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {data.departmentLoad.map((department, index) => {
              const utilization = Math.round(
                (department.occupancy / department.capacity) * 100
              );
              const chartColor =
                DEPARTMENT_CAPACITY_COLORS[
                  index % DEPARTMENT_CAPACITY_COLORS.length
                ];

              return (
                <div
                  className="flex flex-col gap-4 border border-border/70 bg-background/70 p-4"
                  key={department.department}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-heading font-semibold text-base tracking-tight">
                        {department.department}
                      </p>
                      <Badge className="rounded">
                        <p className="font-heading font-semibold text-sm tracking-tight">
                          {utilization}%
                        </p>
                      </Badge>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {department.occupancy} occupied of {department.capacity}{" "}
                      staffed beds
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 shrink-0">
                      <ResponsiveContainer
                        className="flex justify-center"
                        height="100%"
                        width="100%"
                      >
                        <RadialBarChart
                          cx="50%"
                          cy="50%"
                          data={[{ utilization }]}
                          endAngle={-270}
                          innerRadius="72%"
                          outerRadius="100%"
                          startAngle={90}
                        >
                          <PolarAngleAxis
                            axisLine={false}
                            dataKey="utilization"
                            domain={[0, 100]}
                            tick={false}
                            type="number"
                          />
                          <RadialBar
                            background={{ fill: "var(--color-muted)" }}
                            cornerRadius={999}
                            dataKey="utilization"
                            fill={chartColor}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Latest assignments</CardTitle>
            <CardDescription>
              High-priority patient updates routed to the care team today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentAssignments.map((assignment) => (
              <div
                className="rounded-none border border-border/70 bg-background/85 p-4"
                key={assignment.id}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading font-semibold text-lg tracking-tight">
                        {assignment.patientName}
                      </h2>
                      <Badge
                        variant={getAssignmentVariant(assignment.priority)}
                      >
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
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
