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

type PriceAreaChartProps = {
  data: {
    key: string;
    data: number;
  }[];
};

export default function PriceAreaChart({ data }: PriceAreaChartProps) {
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

  return (
    <BarChart
      //   width={1000}
      //   height={300}
      data={totalListingsByDay.map((data, index) => ({
        key: `Day ${index + 1}`,
        data,
      }))}
      yAxis={
        <LinearYAxis
          axisLine={null}
          tickSeries={<LinearYAxisTickSeries line={null} />}
          domain={[0, yAxisMax]}
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
                  rotation={-45}
                  format={(text) => `${text.slice(0, 5)}...`}
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
          colorScheme={[
            "#6C18E8",
            "#6C18E8",
            "#00DCC2",
            "#A840E8",
            "#105EFF",
            "#0D4ED2",
            "#40D3F4",
          ]}
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

{
  /* <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl w-[200px] h-[386px] overflow-hidden"></div> */
}
{
  /* <BarChart
  id="labels"
  data={labelsData}
  yAxis={
    <LinearYAxis
      axisLine={null}
      tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
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
              rotation={-45}
              format={(text) => `${text.slice(0, 5)}...`}
            />
          }
          tickSize={60}
        />
      }
    />
  }
  series={
    <BarSeries
      bar={
        <Bar
          glow={{
            blur: 20,
            opacity: 0.5,
          }}
          gradient={null}
          label={<BarLabel fill="" position={"top"} padding={15} />}
        />
      }
      colorScheme={[
        "#0D4ED2",
        "#4C86FF",
        "#40D3F4",
        "#40E5D1",
        "#DAC5F9",
        "#9152EE",
        "#5B14C5",
      ]}
      padding={0.2}
    />
  }
  gridlines={<GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />}
/>; */
}
