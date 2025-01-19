import {
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickLabel,
  AreaChart,
  AreaSeries,
  Area,
  GridlineSeries,
  Gridline,
} from "reaviz";

type DateAreaChartProps = {
  chartData: {
    key: string;
    data: number;
  }[];
  primary: string;
  yAxisMax: number;
};

export default function DateAreaChart({
  chartData,
  primary,
  yAxisMax,
}: DateAreaChartProps) {
  return (
    <AreaChart
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
        <AreaSeries
          area={
            <Area
              key={primary}
              glow={{ blur: 20, opacity: 0.5, color: primary }}
            />
          }
          colorScheme={[primary]}
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
