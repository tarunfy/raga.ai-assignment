import { Badge } from "@/components/ui/badge/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import type { AnalyticsSummaryCardData } from "@/features/analytics/types";

interface AnalyticsSummaryCardProps {
  card: AnalyticsSummaryCardData;
}

/**
 * Renders a single KPI summary card at the top of the analytics page.
 */
export const AnalyticsSummaryCard = ({ card }: AnalyticsSummaryCardProps) => (
  <Card>
    <CardHeader>
      <Badge className="w-fit" variant="neutral">
        {card.label}
      </Badge>
      <CardTitle className="text-3xl">{card.value}</CardTitle>
      <CardDescription>{card.trend}</CardDescription>
    </CardHeader>
  </Card>
);
