import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { RowData } from "~/types/RowData";
import {
  Card,
  CardBody,
  Chip,
  Accordion,
  AccordionItem,
  Divider,
  Button,
} from "@nextui-org/react";

export default function RowCard({ row }: { row: RowData }) {
  return (
    <Card isHoverable>
      <CardBody>
        <div className="p-2 md:p-5 justify-between flex flex-col space-y-4 h-full">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {row.address}
              </h2>
              <Chip
                color={Number(row.percentIncrease) > 15 ? "danger" : "warning"}
                startContent={<Icon icon="mdi:arrow-up" />}>
                <div className="flex items-center">
                  <Icon width={16} height={16} icon="mdi:percent" />
                  {row.percentIncrease}
                </div>
              </Chip>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="mdi:map-marker"
              />
              <p>
                {row.city}, {row.state} {row.zip}
              </p>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Icon width={20} height={20} className="mr-2" icon="mdi:dollar" />
              <p className="font-medium mr-2">
                {row.updatedRentalPrice}{" "}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  (from {row.rentalPrice})
                </span>
              </p>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="mdi:calendar"
              />
              <p>
                Price Gouged on{" "}
                <span className="font-bold">
                  {isNaN(new Date(row.date).getTime())
                    ? "Invalid date"
                    : format(new Date(row.date), "PP")}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Accordion>
              <AccordionItem
                key="additional-info"
                aria-label="Additional Info"
                startContent={<Icon width={20} height={20} icon="mdi:info" />}
                title="Additional Info">
                <p className="text-gray-600 dark:text-gray-400 p-2 text-xs">
                  {row.additionalInfo.length > 0 ? (
                    row.additionalInfo
                  ) : (
                    <span>No additional info found</span>
                  )}
                </p>
              </AccordionItem>

              <AccordionItem
                key="source-grabs"
                aria-label="Source Grabs"
                startContent={<Icon width={20} height={20} icon="mdi:link" />}
                title="Source Grabs">
                <ul className="text-gray-600 dark:text-gray-400 p-2 text-xs">
                  {row.sourceGrabs.length > 0 ? (
                    row.sourceGrabs.map((source) => (
                      <li key={source}>
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                          to={source}>
                          {source}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      No source grabs found
                    </span>
                  )}
                </ul>
              </AccordionItem>
            </Accordion>
            <Divider />
            <div className="flex flex-col items-center justify-between ">
              <div className="flex w-full text-gray-600 dark:text-gray-300 my-4">
                <Icon width={20} height={20} className="mr-2" icon="mdi:home" />
                <p className="text-sm">
                  Property Owner:{" "}
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline hover:text-blue-600"
                    to={row.googleSheetLink}>
                    See Google Sheet
                  </Link>
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  as={Link}
                  to={row.listingUrl}
                  target="_blank"
                  rel="noreferrer"
                  startContent={<Icon width={20} height={20} icon="mdi:link" />}
                  className="inline-flex w-full justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  {row.listingSite}
                </Button>
                <Button
                  as={Link}
                  to={row.googleMapLink}
                  target="_blank"
                  rel="noreferrer"
                  startContent={<Icon width={20} height={20} icon="mdi:map" />}
                  className="inline-flex w-full justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
