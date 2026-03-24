import type { Metadata } from "next";
import { AnalyticsScreen } from "@/features/analytics/components/analytics-screen/analytics-screen";

export const metadata: Metadata = {
  title: "Analytics",
};

const AnalyticsPage = () => <AnalyticsScreen />;

export default AnalyticsPage;
