import type { Metadata } from "next";
import { PatientsScreen } from "@/features/patients/components/patients-screen/patients-screen";

export const metadata: Metadata = {
  title: "Patients",
};

const PatientsPage = () => <PatientsScreen />;

export default PatientsPage;
