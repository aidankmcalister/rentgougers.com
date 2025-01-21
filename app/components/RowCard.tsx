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
  Button,
} from "@heroui/react";
import { formatPercent, formatPrice } from "~/utils/formats";

export default function RowCard({ row }: { row: RowData }) {
  return (
    <Card>
      <CardBody>
        <div className="p-2 md:p-5 justify-between flex flex-col space-y-4 h-full">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {row.address}
              </h2>
              <Chip
                variant="shadow"
                color={Number(row.percentIncrease) > 15 ? "danger" : "warning"}
                startContent={
                  Number(row.percentIncrease) > 0 ? (
                    <Icon icon="mdi:trending-up" className="ml-2" />
                  ) : (
                    <Icon icon="mdi:trending-down" className="ml-2" />
                  )
                }>
                {formatPercent(row.percentIncrease)}
              </Chip>
            </div>
            {row.housePossiblyRebuilt && (
              <Chip
                variant="flat"
                color="primary"
                startContent={
                  <Icon width={20} height={20} icon="mdi:alert-circle" />
                }>
                Property Possibly Rebuilt
              </Chip>
            )}
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Icon width={20} height={20} className="mr-2" icon="mdi:dollar" />
              <p className="font-medium mr-2">
                {formatPrice(row.updatedRentalPrice)}{" "}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  (from {formatPrice(row.rentalPrice)})
                </span>
              </p>
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
              <Icon
                width={20}
                height={20}
                className="mr-2"
                icon="mdi:calendar"
              />
              <p>
                Price Gouged on{" "}
                <span className="font-bold">
                  {format(row.priceIncreaseDate, "PP")}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Icon width={20} height={20} className="mr-2" icon="mdi:calendar" />
            <p>
              Posted to sheet on{" "}
              <span className="font-bold">{format(row.datePosted, "PP")}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Accordion variant="bordered">
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
                          aria-label="Source Grab"
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
            <div className="flex flex-col items-center justify-between ">
              <div className="flex w-full text-gray-600 dark:text-gray-300 my-4">
                <Icon width={20} height={20} className="mr-2" icon="mdi:home" />
                <p className="text-sm">
                  Property Owner:{" "}
                  <Link
                    aria-label="Google Sheet"
                    color="primary"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                    to={row.googleSheetLink}>
                    See Google Sheet
                  </Link>
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  aria-label="Listing Site"
                  color="primary"
                  as={Link}
                  to={row.listingUrl}
                  target="_blank"
                  rel="noreferrer"
                  startContent={<Icon width={20} height={20} icon="mdi:link" />}
                  className="inline-flex w-full justify-center items-center px-3 py-2 text-sm font-medium">
                  {row.listingSite}
                </Button>
                <Button
                  aria-label="Google Maps"
                  color="primary"
                  as={Link}
                  to={row.googleMapLink}
                  target="_blank"
                  rel="noreferrer"
                  startContent={<Icon width={20} height={20} icon="mdi:map" />}
                  className="inline-flex w-full justify-center items-center px-3 py-2 text-sm font-medium">
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
