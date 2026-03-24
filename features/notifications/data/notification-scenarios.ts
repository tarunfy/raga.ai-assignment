import type { NotificationScenario } from "@/features/notifications/types";

interface AutomaticNotificationScenario extends NotificationScenario {
  delayMs: number;
}

/**
 * Mock notifications that are dispatched automatically after the protected shell loads.
 */
export const automaticNotificationScenarios: AutomaticNotificationScenario[] = [
  {
    body: "Amara Patel has been assigned to your cardiac monitoring queue.",
    delayMs: 4000,
    id: "assigned-patient",
    route: "/patients/pt-1001",
    title: "New patient assigned",
    tone: "normal",
  },
  {
    body: "Lucia Moreno has a critical neurology lab update that needs review.",
    delayMs: 9000,
    id: "critical-lab",
    route: "/patients/pt-1007",
    title: "Critical lab update",
    tone: "danger",
  },
];

/**
 * Manual fallback scenario reviewers can trigger from the dashboard notification card.
 */
export const manualNotificationScenario: NotificationScenario = {
  body: "Mateo Silva's post-op care plan was approved and shared with the team.",
  id: "care-plan-approved",
  route: "/patients/pt-1004",
  title: "Care plan approved",
  tone: "success",
};
