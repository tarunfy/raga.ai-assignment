import patientsData from "@/features/patients/data/patients.json";
import { type Patient, patientsSchema } from "@/features/patients/types";
import { sleep } from "@/lib/utils/sleep";

/**
 * Returns the mocked patient roster after a realistic loading delay.
 */
export const getPatients = async (): Promise<Patient[]> => {
  await sleep(1050);

  return patientsSchema.parse(patientsData);
};

/**
 * Returns a single patient record when the supplied identifier exists.
 *
 * @param patientId - The patient identifier from the route
 */
export const getPatientById = async (
  patientId: string
): Promise<Patient | null> => {
  const patients = await getPatients();

  return patients.find((patient) => patient.id === patientId) ?? null;
};
