import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge/badge";
import type { DepartmentLoad } from "@/features/dashboard/types";

interface DepartmentCapacityCardProps {
  chartColor: string;
  department: DepartmentLoad;
}

/**
 * Renders a single department occupancy tile with a radial utilization gauge.
 */
export const DepartmentCapacityCard = ({
  chartColor,
  department,
}: DepartmentCapacityCardProps) => {
  const utilization = Math.round(
    (department.occupancy / department.capacity) * 100
  );

  return (
    <div className="flex flex-col gap-4 border border-border/70 bg-background/70 p-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-heading font-semibold text-base tracking-tight">
            {department.department}
          </p>
          <Badge className="rounded">
            <p className="font-heading font-semibold text-sm tracking-tight">
              {utilization}%
            </p>
          </Badge>
        </div>
        <p className="mt-1 text-muted-foreground text-sm">
          {department.occupancy} occupied of {department.capacity} staffed beds
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 shrink-0">
          <ResponsiveContainer
            className="flex justify-center"
            height="100%"
            width="100%"
          >
            <RadialBarChart
              cx="50%"
              cy="50%"
              data={[{ utilization }]}
              endAngle={-270}
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
            >
              <PolarAngleAxis
                axisLine={false}
                dataKey="utilization"
                domain={[0, 100]}
                tick={false}
                type="number"
              />
              <RadialBar
                background={{ fill: "var(--color-muted)" }}
                cornerRadius={999}
                dataKey="utilization"
                fill={chartColor}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
