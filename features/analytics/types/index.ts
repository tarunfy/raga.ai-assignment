import { z } from "zod/v3";

export const analyticsSummaryCardSchema = z.object({
  id: z.string(),
  label: z.string(),
  trend: z.string(),
  value: z.string(),
});

export const weeklyAdmissionsPointSchema = z.object({
  admissions: z.number(),
  discharges: z.number(),
  week: z.string(),
});

export const recoveryRatePointSchema = z.object({
  department: z.string(),
  rate: z.number(),
});

export const caseMixPointSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const occupancyPointSchema = z.object({
  month: z.string(),
  occupancy: z.number(),
  staffedBeds: z.number(),
});

export const analyticsReportSchema = z.object({
  caseMix: z.array(caseMixPointSchema),
  occupancyTrend: z.array(occupancyPointSchema),
  recoveryRate: z.array(recoveryRatePointSchema),
  summary: z.array(analyticsSummaryCardSchema),
  weeklyAdmissions: z.array(weeklyAdmissionsPointSchema),
});

/**
 * Analytics report data used by the dedicated insights page.
 */
export type AnalyticsReport = z.infer<typeof analyticsReportSchema>;

/**
 * Single summary KPI card in the analytics overview.
 */
export type AnalyticsSummaryCardData = z.infer<
  typeof analyticsSummaryCardSchema
>;

/**
 * Case-mix distribution entry used in the pie chart and legend.
 */
export type CaseMixPoint = z.infer<typeof caseMixPointSchema>;
