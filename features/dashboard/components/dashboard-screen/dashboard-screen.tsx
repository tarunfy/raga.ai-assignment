"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EmptyState } from "@/components/common/feedback/empty-state/empty-state";
import { ErrorState } from "@/components/common/feedback/error-state/error-state";
import { PageHeader } from "@/components/common/layout/page-header/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { getDashboardOverviewQueryOptions } from "@/features/dashboard/api/query";
import { AssignmentCard } from "@/features/dashboard/components/assignment-card/assignment-card";
import { DashboardLoading } from "@/features/dashboard/components/dashboard-loading/dashboard-loading";
import { DepartmentCapacityCard } from "@/features/dashboard/components/department-capacity-card/department-capacity-card";
import { MetricCard } from "@/features/dashboard/components/metric-card/metric-card";
import { DEPARTMENT_CAPACITY_COLORS } from "@/features/dashboard/constants";

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
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
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
            {data.departmentLoad.map((department, index) => (
              <DepartmentCapacityCard
                chartColor={
                  DEPARTMENT_CAPACITY_COLORS[
                    index % DEPARTMENT_CAPACITY_COLORS.length
                  ]
                }
                department={department}
                key={department.department}
              />
            ))}
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
              <AssignmentCard assignment={assignment} key={assignment.id} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
