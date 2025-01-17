import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Link } from "@nextui-org/react";
import { RowData } from "~/types/RowData";

type ShowcaseProps = {
  data: RowData[];
};

export default function Showcase({ data }: ShowcaseProps) {
  const topMovers = data
    .sort((a, b) => {
      const percentA = parseFloat(a.percentIncrease);
      const percentB = parseFloat(b.percentIncrease);
      return percentB - percentA;
    })
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {topMovers.map((row: RowData) => (
        <Link
          aria-label={`View ${row.address} on ${row.listingSite}`}
          isExternal
          href={row.listingUrl}
          key={row.id}
          className="w-48 h-48 ">
          <Card
            key={row.id}
            className={`relative w-full h-full  flex flex-col items-end justify-end ${
              Number(row.percentIncrease) > 15
                ? "bg-danger text-white"
                : "bg-warning text-black"
            }`}>
            <h1 className="absolute top-4 right-4 text-5xl font-bold flex items-center tracking-tight">
              {row.percentIncrease}
              <Icon icon="mdi:percent" className="-ml-1" />
            </h1>
            <div className="p-4 text-xs font-bold">{row.address}</div>
            <Icon
              width={250}
              height={250}
              className="text-4xl opacity-30 absolute -top-1 right-0 transform -rotate-12"
              icon="mdi:trending-up"
            />
          </Card>
        </Link>
      ))}
    </div>
  );
}
