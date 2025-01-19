import { Card, CardBody, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import DateBarChart from "./DateBarChart";

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
      <IndividualChartContainer title="Gouged this past week">
        <DateBarChart data={dateGougedChartData} />
      </IndividualChartContainer>
      <IndividualChartContainer title="Posted this past week">
        <DateBarChart data={datePostedChartData} />
      </IndividualChartContainer>
    </div>
  );
}

function IndividualChartContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="w-full h-96 lg:w-1/2 p-2">
      <CardBody className="flex flex-col gap-2">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icon className="text-2xl text-primary" icon="mdi:bar-chart" />
          {title}
        </h3>
        <Divider />
        {children}
      </CardBody>
    </Card>
  );
}
