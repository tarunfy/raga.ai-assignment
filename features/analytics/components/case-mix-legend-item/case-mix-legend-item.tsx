import type { CaseMixPoint } from "@/features/analytics/types";

interface CaseMixLegendItemProps {
  color: string;
  entry: CaseMixPoint;
}

/**
 * Renders a single legend row beneath the case-mix pie chart.
 */
export const CaseMixLegendItem = ({
  color,
  entry,
}: CaseMixLegendItemProps) => (
  <div className="flex items-center justify-between rounded-none bg-muted/55 px-3 py-2 text-sm">
    <div className="flex items-center gap-2">
      <span
        className="size-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{entry.name}</span>
    </div>
    <span className="font-semibold">{entry.value}%</span>
  </div>
);
