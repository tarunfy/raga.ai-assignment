"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
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
import { getAnalyticsReportQueryOptions } from "@/features/analytics/api/query";
import { AnalyticsLoading } from "@/features/analytics/components/analytics-loading/analytics-loading";
import { AnalyticsSummaryCard } from "@/features/analytics/components/analytics-summary-card/analytics-summary-card";
import { CaseMixLegendItem } from "@/features/analytics/components/case-mix-legend-item/case-mix-legend-item";
import { PIE_CHART_COLORS } from "@/features/analytics/constants";

/**
 * Renders the analytics page with deeper operational and capacity insights.
 */
export const AnalyticsScreen = () => {
  const { data, error, isError, isLoading, refetch } = useQuery(
    getAnalyticsReportQueryOptions()
  );

  if (isLoading) {
    return <AnalyticsLoading />;
  }

  if (isError) {
    return (
      <ErrorState
        description={
          error instanceof Error
            ? error.message
            : "The analytics report could not be loaded."
        }
        onRetry={() => {
          refetch().catch(() => undefined);
        }}
      />
    );
  }

  if (!data || data.summary.length === 0) {
    return (
      <EmptyState
        description="Analytics data is currently unavailable."
        title="No analytics report available"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        description="Review the bigger picture behind care operations, patient movement, and department performance."
        eyebrow="Insights"
        title="Analytics overview"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {data.summary.map((card) => (
          <AnalyticsSummaryCard card={card} key={card.id} />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Weekly admissions and discharges</CardTitle>
            <CardDescription>
              A rolling comparison of patient inflow and outflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[23rem]">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={data.weeklyAdmissions}>
                <CartesianGrid
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeDasharray="4 4"
                />
                <XAxis axisLine={false} dataKey="week" tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
                    borderRadius: "18px",
                  }}
                />
                <Line
                  dataKey="admissions"
                  dot={false}
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  type="monotone"
                />
                <Line
                  dataKey="discharges"
                  dot={false}
                  stroke="var(--color-chart-2)"
                  strokeWidth={3}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Case mix</CardTitle>
            <CardDescription>
              Distribution of active patient complexity across the hospital.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[23rem]">
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie
                  data={data.caseMix}
                  dataKey="value"
                  innerRadius={64}
                  outerRadius={102}
                  paddingAngle={3}
                >
                  {data.caseMix.map((entry, index) => (
                    <Cell
                      fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                      key={entry.name}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
                    borderRadius: "18px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {data.caseMix.map((entry, index) => (
                <CaseMixLegendItem
                  color={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                  entry={entry}
                  key={entry.name}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Department recovery rate</CardTitle>
            <CardDescription>
              Outcome quality across the primary treatment areas.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[23rem]">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={data.recoveryRate}>
                <CartesianGrid
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeDasharray="4 4"
                />
                <XAxis axisLine={false} dataKey="department" tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
                    borderRadius: "18px",
                  }}
                />
                <Bar
                  dataKey="rate"
                  fill="var(--color-chart-2)"
                  radius={[16, 16, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Occupancy versus staffed beds</CardTitle>
            <CardDescription>
              Capacity planning visibility over the last six months.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[23rem]">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={data.occupancyTrend}>
                <CartesianGrid
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeDasharray="4 4"
                />
                <XAxis axisLine={false} dataKey="month" tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
                    borderRadius: "18px",
                  }}
                />
                <Line
                  dataKey="occupancy"
                  dot={false}
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  type="monotone"
                />
                <Line
                  dataKey="staffedBeds"
                  dot={false}
                  stroke="var(--color-chart-4)"
                  strokeWidth={3}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
