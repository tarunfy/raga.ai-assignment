import type { Metadata } from "next";
import { PatientDetailScreen } from "@/features/patients/components/patient-detail-screen/patient-detail-screen";

export const metadata: Metadata = {
  title: "Patient profile",
};

interface PatientDetailPageProps {
  params: Promise<{
    patientId: string;
  }>;
}

const PatientDetailPage = async ({ params }: PatientDetailPageProps) => {
  const { patientId } = await params;

  return <PatientDetailScreen patientId={patientId} />;
};

export default PatientDetailPage;
