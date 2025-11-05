"use client";

import { TrendingUp, ChevronDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getDesignationStats } from "@/utils/analytics";
import { useUserStore } from "@/store/userStore";

export const description = "A bar chart showing users by designation";

const chartConfig = {
  count: {
    label: "Total Users",
    color: "var(--chart-1)",
  },
  male: {
    label: "Male",
    color: "var(--chart-2)",
  },
  female: {
    label: "Female",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function DesignationChart() {
  const { users } = useUserStore();
  const [chartData, setChartData] = useState<
    Array<{ designation: string; count: number; male: number; female: number }>
  >([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stats = getDesignationStats(users);
    setChartData(stats);
  }, [users]);

  const totalUsers = users.length;
  const totalDesignations = chartData.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users by Designation</CardTitle>
        <CardDescription>
          Distribution of users across different job roles and designations
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Slightly smaller chart */}
        <div className="w-full overflow-x-auto">
          <ChartContainer config={chartConfig} className="h-[260px]">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="designation"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) =>
                  value.length > 15
                    ? value
                        .split(" ")
                        .map((word: any) => word[0])
                        .join("") + "."
                    : value
                }
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
                name="Total Users"
              />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Collapsible Designation Breakdown */}
        <Collapsible open={open} onOpenChange={setOpen} className="mt-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium">
            Designation Breakdown
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 grid gap-2">
            {chartData.map((item) => (
              <div
                key={item.designation}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate flex-1">{item.designation}</span>
                <div className="flex items-center gap-4 ml-4">
                  <span className="text-muted-foreground min-w-[60px] text-right">
                    {item.count} users
                  </span>
                  <div className="flex gap-2 text-xs">
                    <span className="text-blue-600">♂{item.male}</span>
                    <span className="text-pink-600">♀{item.female}</span>
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total {totalUsers} users across {totalDesignations} designations
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing distribution of users by their job roles and gender
        </div>
      </CardFooter>
    </Card>
  );
}
