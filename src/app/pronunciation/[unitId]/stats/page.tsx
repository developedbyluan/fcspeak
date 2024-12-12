"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const runtime = "edge";

export default function StatsPage() {
  const pathname = usePathname();
  const unitId = pathname.split("/")[2];
  const [chartData, setChartData] = useState<
    {
      id: number;
      date: string;
      reps: number;
      repsContent: [number][];
      duration: number;
    }[]
  >([]);
  const [continueMeta, setContinueMeta] = useState<{
    course: string;
    title: string;
  }>({ course: "", title: "" });

  useEffect(() => {
    const logsName = `${unitId}-pronunciation-course-logs`;
    const getLocalStorage = () => {
      const pronunciationCourseUnitObject = JSON.parse(
        localStorage.getItem(logsName) || "{}"
      );
      if (!pronunciationCourseUnitObject[unitId]) return;
      const logs = pronunciationCourseUnitObject[unitId].logs;
      const stats = logs.map(
        (
          log: {
            [key: number]: {
              date: string;
              dateName: string;
              reps: [number][];
            };
          },
          index: number
        ) => {
          return {
            id: index + 1,
            date: log[index + 1].date,
            reps: log[index + 1].reps.length,
            repsContent: log[index + 1].reps,
            duration: 0,
          };
        }
      );
      setChartData(stats);
    };

    const getContinueData = () => {
      try {
        const continueData = localStorage.getItem(
          `continue-training-history`
        );
        if (!continueData) return;
        const continueDataObject = JSON.parse(continueData);
        console.log("continueDataObject", continueDataObject);
        setContinueMeta(continueDataObject[unitId].meta);
      } catch (error) {
        console.error("Error getting continue data", (error as Error).message);
      }
    };

    getContinueData();
    getLocalStorage();
  }, [unitId]);

  const chartConfig = {
    reps: {
      label: "Reps",
      color: "hsl(var(--chart-1))",
    },
    duration: {
      label: "Duration",
      color: "hsl(var(--chart-2))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
        Pronunciation Course
        </h1>
        <Link href="/" passHref>
          <Button variant="outline">Back to All Lessons</Button>
        </Link>
      </div>
      {chartData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {continueMeta.title}
            </CardTitle>
            <CardDescription>
              Keep track of your efforts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="id"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => "Day " + value.toString()}
                />
                <XAxis dataKey="reps" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Bar
                  dataKey="reps"
                  layout="vertical"
                  fill="var(--color-reps)"
                  radius={4}
                >
                  <LabelList
                    dataKey="date"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="reps"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : (
        <div>No data. Start training to see stats.</div>
      )}
    </div>
  );
}
