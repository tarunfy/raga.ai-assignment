import { z } from "zod/v3";

export const dashboardMetricSchema = z.object({
  change: z.number(),
  detail: z.string(),
  id: z.string(),
  label: z.string(),
  trend: z.enum(["down", "up"]),
  value: z.number(),
});

export const careTrendPointSchema = z.object({
  admissions: z.number(),
  critical: z.number(),
  day: z.string(),
  discharges: z.number(),
});

export const departmentLoadSchema = z.object({
  capacity: z.number(),
  department: z.string(),
  occupancy: z.number(),
});

export const recentAssignmentSchema = z.object({
  assignedTo: z.string(),
  id: z.string(),
  patientId: z.string(),
  patientName: z.string(),
  priority: z.enum(["critical", "high", "monitoring"]),
  program: z.string(),
  summary: z.string(),
  updatedAt: z.string(),
});

export const dashboardOverviewSchema = z.object({
  careTrend: z.array(careTrendPointSchema),
  departmentLoad: z.array(departmentLoadSchema),
  metrics: z.array(dashboardMetricSchema),
  recentAssignments: z.array(recentAssignmentSchema),
});

/**
 * Dashboard overview data returned to the main operational screen.
 */
export type DashboardOverview = z.infer<typeof dashboardOverviewSchema>;
