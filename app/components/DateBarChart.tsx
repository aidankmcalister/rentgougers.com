import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickLabel,
  BarChart,
  BarSeries,
  Bar,
  GridlineSeries,
  Gridline,
  BarLabel,
} from "reaviz";

type DateBarChartProps = {
  data: {
    key: string;
    data: number;
  }[];
};

export default function DateBarChart({ data }: DateBarChartProps) {
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

  const chartData = totalListingsByDay.map((data, index) => {
    const itemDate = new Date(today);
    itemDate.setDate(today.getDate() - index);
    return {
      key: format(itemDate, "PP"),
      data,
    };
  });

  return (
    <BarChart
      data={chartData.reverse()}
      yAxis={
        <LinearYAxis
          axisLine={null}
          tickSeries={<LinearYAxisTickSeries line={null} />}
          domain={[0, yAxisMax + 50]}
        />
      }
      xAxis={
        <LinearXAxis
          type="category"
          tickSeries={
            <LinearXAxisTickSeries
              label={
                <LinearXAxisTickLabel
                  padding={10}
                  format={(text) => text.replace(/,.*$/, "")}
                  fill="#535362"
                />
              }
              tickSize={30}
            />
          }
        />
      }
      series={
        <BarSeries
          bar={
            <Bar
              label={<BarLabel fill="" />}
              glow={{ blur: 20, opacity: 0.5 }}
            />
          }
          colorScheme={[primary]}
          padding={0.2}
        />
      }
      gridlines={
        <GridlineSeries
          line={<Gridline direction="y" strokeColor="#7E7E8F75" />}
        />
      }
    />
  );
}
