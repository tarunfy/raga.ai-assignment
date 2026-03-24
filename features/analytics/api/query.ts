import { queryOptions } from "@tanstack/react-query";
import { getAnalyticsReport } from "@/features/analytics/api/analytics-api";

export const analyticsQueryKeys = {
  report: () => ["analytics", "report"] as const,
};

/**
 * Query options for the analytics insights report.
 */
export const getAnalyticsReportQueryOptions = () =>
  queryOptions({
    queryFn: getAnalyticsReport,
    queryKey: analyticsQueryKeys.report(),
  });
