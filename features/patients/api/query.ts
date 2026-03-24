import { queryOptions } from "@tanstack/react-query";
import {
  getPatientById,
  getPatients,
} from "@/features/patients/api/patients-api";

export const patientsQueryKeys = {
  detail: (patientId: string) => ["patients", "detail", patientId] as const,
  list: () => ["patients", "list"] as const,
};

/**
 * Query options for the patient roster.
 */
export const getPatientsQueryOptions = () =>
  queryOptions({
    queryFn: getPatients,
    queryKey: patientsQueryKeys.list(),
  });

/**
 * Query options for a single patient profile.
 *
 * @param patientId - The patient identifier from the route
 */
export const getPatientByIdQueryOptions = (patientId: string) =>
  queryOptions({
    queryFn: () => getPatientById(patientId),
    queryKey: patientsQueryKeys.detail(patientId),
  });
