import dashboardOverviewData from "@/features/dashboard/data/dashboard-overview.json";
import {
  type DashboardOverview,
  dashboardOverviewSchema,
} from "@/features/dashboard/types";
import { sleep } from "@/lib/utils/sleep";

/**
 * Returns mocked dashboard data after a short delay to mimic a production API.
 */
export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  await sleep(950);

  return dashboardOverviewSchema.parse(dashboardOverviewData);
};
