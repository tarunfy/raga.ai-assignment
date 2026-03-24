import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import type { DashboardMetric } from "@/features/dashboard/types";
import { formatCompactNumber } from "@/lib/utils";

interface MetricCardProps {
  metric: DashboardMetric;
}

/**
 * Renders a single KPI card inside the dashboard metrics grid.
 */
export const MetricCard = ({ metric }: MetricCardProps) => {
  const isPositive = metric.trend === "up";
  const TrendIcon = isPositive ? TrendUpIcon : TrendDownIcon;

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="neutral">{metric.label}</Badge>
          <div className="flex size-10 items-center justify-center rounded-none bg-primary/10 text-primary">
            <TrendIcon className="size-5" />
          </div>
        </div>
        <div>
          <CardTitle className="text-3xl">
            {metric.label === "Team utilization"
              ? `${metric.value}%`
              : formatCompactNumber(metric.value)}
          </CardTitle>
          <CardDescription>{metric.detail}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-sm">
          <Badge variant={isPositive ? "success" : "warning"}>
            {isPositive ? "+" : "-"}
            {metric.change}%
          </Badge>
          <span className="text-muted-foreground">week-over-week</span>
        </div>
      </CardContent>
    </Card>
  );
};
