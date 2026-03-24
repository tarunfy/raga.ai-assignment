import type { Metadata } from "next";
import { DashboardScreen } from "@/features/dashboard/components/dashboard-screen/dashboard-screen";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => <DashboardScreen />;

export default DashboardPage;
