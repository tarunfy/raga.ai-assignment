import analyticsReportData from "@/features/analytics/data/analytics-report.json";
import {
  type AnalyticsReport,
  analyticsReportSchema,
} from "@/features/analytics/types";
import { sleep } from "@/lib/utils/sleep";

/**
 * Returns mocked analytics report data after a realistic API delay.
 */
export const getAnalyticsReport = async (): Promise<AnalyticsReport> => {
  await sleep(1100);

  return analyticsReportSchema.parse(analyticsReportData);
};
