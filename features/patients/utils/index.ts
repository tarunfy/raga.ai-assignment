import type { Patient } from "@/features/patients/types";

/**
 * Returns the badge variant matching a patient's risk level on the roster.
 *
 * @param riskLevel - The patient risk classification
 */
export const getStatusVariant = (riskLevel: Patient["riskLevel"]) => {
  switch (riskLevel) {
    case "critical":
      return "critical";
    case "high":
      return "warning";
    default:
      return "neutral";
  }
};

/**
 * Returns the badge variant matching a patient's risk level on the detail page.
 *
 * @param riskLevel - The patient risk classification
 */
export const getRiskVariant = (
  riskLevel: "critical" | "high" | "moderate"
) => {
  switch (riskLevel) {
    case "critical":
      return "critical";
    case "high":
      return "warning";
    default:
      return "neutral";
  }
};
