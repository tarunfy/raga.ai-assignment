import { z } from "zod/v3";

export const patientVitalsSchema = z.object({
  bloodPressure: z.string(),
  heartRate: z.number(),
  oxygenSaturation: z.number(),
  temperature: z.number(),
});

export const patientMedicationSchema = z.object({
  dosage: z.string(),
  name: z.string(),
  schedule: z.string(),
});

export const patientCareNoteSchema = z.object({
  author: z.string(),
  content: z.string(),
  id: z.string(),
  recordedAt: z.string(),
});

export const patientVisitEventSchema = z.object({
  date: z.string(),
  description: z.string(),
  id: z.string(),
  title: z.string(),
});

export const patientSchema = z.object({
  admissionDate: z.string(),
  age: z.number(),
  assignedDoctor: z.string(),
  careNotes: z.array(patientCareNoteSchema),
  careProgram: z.string(),
  email: z.string(),
  fullName: z.string(),
  gender: z.string(),
  id: z.string(),
  lastUpdated: z.string(),
  location: z.string(),
  medications: z.array(patientMedicationSchema),
  phone: z.string(),
  primaryCondition: z.string(),
  riskLevel: z.enum(["critical", "high", "moderate"]),
  room: z.string(),
  status: z.enum(["active", "monitoring", "stable"]),
  summary: z.string(),
  visitTimeline: z.array(patientVisitEventSchema),
  vitals: patientVitalsSchema,
});

export const patientsSchema = z.array(patientSchema);

/**
 * Patient record used across the listing and detail experiences.
 */
export type Patient = z.infer<typeof patientSchema>;

/**
 * Single medication entry within a patient record.
 */
export type PatientMedication = z.infer<typeof patientMedicationSchema>;

/**
 * Multidisciplinary care note attached to a patient.
 */
export type PatientCareNote = z.infer<typeof patientCareNoteSchema>;

/**
 * Timeline milestone in a patient's treatment path.
 */
export type PatientVisitEvent = z.infer<typeof patientVisitEventSchema>;

/**
 * Supported visual layouts for the patient roster.
 */
export type PatientView = "grid" | "list";
