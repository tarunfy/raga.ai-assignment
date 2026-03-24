export const getAssignmentVariant = (
  priority: "critical" | "high" | "monitoring"
) => {
  if (priority === "critical") {
    return "critical";
  }

  if (priority === "high") {
    return "warning";
  }

  return "neutral";
};
