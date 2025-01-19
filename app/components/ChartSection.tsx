import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ChartRenderer from "./charts/ChartRenderer";
import { useState } from "react";

type ChartSectionProps = {
  dateGougedChartData: {
    key: string;
    data: number;
  }[];
  datePostedChartData: {
    key: string;
    data: number;
  }[];
};

export default function ChartSection({
  dateGougedChartData,
  datePostedChartData,
}: ChartSectionProps) {
  return (
    <div className="w-full h-fit flex flex-col lg:flex-row gap-4 items-center">
      <IndividualChartContainer
        title="Gouged this past week"
        data={dateGougedChartData}
      />
      <IndividualChartContainer
        title="Posted this past week"
        data={datePostedChartData}
      />
    </div>
  );
}

function IndividualChartContainer({
  title,
  data,
}: {
  title: string;
  data: {
    key: string;
    data: number;
  }[];
}) {
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

  return (
    <Card className="w-full h-[26rem] lg:w-1/2 p-2">
      <CardBody className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center gap-2">
          <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <Icon
              className="text-xl md:text-2xl text-primary"
              icon={
                chartType === "bar" ? "mdi:bar-chart" : "mdi:chart-line-variant"
              }
            />
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="bordered"
              color={chartType === "bar" ? "primary" : "default"}
              isIconOnly
              size="sm"
              onPress={() => setChartType("bar")}>
              <Icon
                className={`text-2xl ${
                  chartType === "bar" ? "text-primary" : "text-default"
                }`}
                icon="mdi:bar-chart"
              />
            </Button>
            <Button
              variant="bordered"
              color={chartType === "area" ? "primary" : "default"}
              isIconOnly
              size="sm"
              onPress={() => setChartType("area")}>
              <Icon
                className={`text-2xl ${
                  chartType === "area" ? "text-primary" : "text-default"
                }`}
                icon="mdi:chart-line-variant"
              />
            </Button>
          </div>
        </div>
        <Divider />
        <ChartRenderer data={data} chartType={chartType} />
      </CardBody>
    </Card>
  );
}
