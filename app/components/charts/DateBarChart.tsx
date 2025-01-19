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
  chartData: {
    key: string;
    data: number;
  }[];
  primary: string;
  yAxisMax: number;
};

export default function DateBarChart({
  chartData,
  primary,
  yAxisMax,
}: DateBarChartProps) {
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
              key={primary}
              label={<BarLabel fill="" />}
              glow={{ blur: 20, opacity: 0.5, color: primary }}
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
