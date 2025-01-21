import { useEffect, useState } from "react";
import { format } from "date-fns";
import DateBarChart from "./DateBarChart";
import DateAreaChart from "./DateAreaChart";

type ChartRendererProps = {
  data: {
    key: string;
    data: number;
  }[];
  chartType: "bar" | "area";
};

export default function ChartRenderer({ data, chartType }: ChartRendererProps) {
  const [primary, setPrimary] = useState("red");

  useEffect(() => {
    const updatePrimaryColor = () => {
      setPrimary(
        window.document.documentElement.classList.contains("dark")
          ? "#803ab3"
          : "#e63946"
      );
    };

    updatePrimaryColor();

    const observer = new MutationObserver(updatePrimaryColor);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const today = new Date();

  const totalListingsByDay = Array(7).fill(0);

  data.forEach((item) => {
    const itemDate = new Date(item.key);
    const dayDifference = Math.floor(
      (today.getTime() - itemDate.getTime()) / (1000 * 3600 * 24)
    );
    if (dayDifference >= 0 && dayDifference < 7) {
      totalListingsByDay[dayDifference] += 1;
    }
  });

  const maxListings = Math.max(...totalListingsByDay);
  const yAxisMax = Math.ceil((maxListings + 20) / 10) * 10;

  const chartData = totalListingsByDay
    .map((data, index) => {
      const itemDate = new Date(today);
      itemDate.setDate(today.getDate() - index);
      return {
        key: format(itemDate, "PP"),
        data,
        date: itemDate,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(({ key, data }) => ({ key, data }));

  return chartType === "bar" ? (
    <DateBarChart chartData={chartData} primary={primary} yAxisMax={yAxisMax} />
  ) : (
    <DateAreaChart
      chartData={chartData}
      primary={primary}
      yAxisMax={yAxisMax}
    />
  );
}
