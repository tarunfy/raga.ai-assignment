import { queryOptions } from "@tanstack/react-query";
import { getDashboardOverview } from "@/features/dashboard/api/dashboard-api";

export const dashboardQueryKeys = {
  overview: () => ["dashboard", "overview"] as const,
};

/**
 * Query options for the dashboard overview payload.
 */
export const getDashboardOverviewQueryOptions = () =>
  queryOptions({
    queryFn: getDashboardOverview,
    queryKey: dashboardQueryKeys.overview(),
  });
