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
  const [continueData, setContinueData] = useState<{
    [key: string]: {
      [meta: string]: {
        course: string;
        title: string;
      };
    };
  }>("");

  useEffect(() => {
    const logsName = `${unitId}-pronunciation-course-logs`;
    const getLocalStorage = () => {
      const pronunciationCourseUnitObject = JSON.parse(
        localStorage.getItem(logsName) || "{}"
      );
      if (!pronunciationCourseUnitObject[unitId]) return;
      const logs = pronunciationCourseUnitObject[unitId].logs;
      console.log(logs);
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
      // ❌console.log("stats v1", stats[0]["1"].reps);
      // ✅console.log("stats v2", stats[0].reps);
      setChartData(stats);
    };

    getLocalStorage();
  }, [unitId]);

  useEffect(() => {
    const getContinueData = () => {
      const continueData = localStorage.getItem(
        `continue-pronunciation-course-data`
      );
      if (!continueData) return;
      const continueDataObject = JSON.parse(continueData);
      console.log("continueDataObject", continueDataObject);
      console.log("continueData", continueDataObject[unitId].meta.title);
      setContinueData(continueDataObject[unitId].meta.title);
    };
    getContinueData();
  }, [unitId]);

  // const chartData = [
  //   { date: "2024-12-01", id: 1, reps: 186, duration: 80 },
  //   { date: "2024-12-02", id: 2, reps: 305, duration: 200 },
  //   { date: "2024-12-03", id: 3, reps: 237, duration: 120 },
  //   { date: "2024-12-04", id: 4, reps: 73, duration: 190 },
  //   { date: "2024-12-05", id: 5, reps: 209, duration: 130 },
  //   { date: "2024-12-06", id: 6, reps: 214, duration: 140 },
  // ];

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
        <h1 className="text-xl font-bold">{continueData} Stats</h1>
        <Link href="/" passHref>
          <Button variant="outline">Back to Lessons</Button>
        </Link>
      </div>
      {chartData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Your daily achievements</CardTitle>
            <CardDescription>5-day training method</CardDescription>
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
