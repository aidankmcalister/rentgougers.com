import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { fetchSubmissionsData } from "api";
import { RowData } from "../types/RowData";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

export const meta: MetaFunction = () => {
  return [
    { title: "RentGouging.com" },
    { name: "description", content: "LA fire's rent gouging" },
  ];
};

export const loader = async () => {
  try {
    const data = await fetchSubmissionsData();
    return Response.json(data);
  } catch (error) {
    console.error("Error loading submissions data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};
export default function Index() {
  const data = useLoaderData<RowData[]>();
  // console.log(data);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold text-center my-10">RentGouging.com</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.map((row) => (
          <div
            key={row.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-5 justify-between flex flex-col space-y-4 h-full">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {row.address}
                  </h2>
                  <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                    {row.listingSite}
                  </span>
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
                    icon="mdi:dollar"
                  />
                  <p className="font-medium mr-2">
                    {row.updatedRentalPrice}{" "}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (from {row.rentalPrice})
                    </span>
                  </p>
                  <div className="rounded-full flex items-center bg-red-300 py-0.5 px-2.5 border border-transparent text-xs text-red-800 transition-all shadow-sm">
                    <Icon width={12} height={12} icon="mdi:arrow-up" />
                    {row.percentIncrease}
                  </div>
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
                    {isNaN(new Date(row.date).getTime())
                      ? "Invalid date"
                      : format(new Date(row.date), "PPpp")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {row.additionalInfo.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Additional Info
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {row.additionalInfo}
                    </p>
                  </div>
                )}
                {row.sourceGrabs.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Source Grabs
                    </h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {row.sourceGrabs.map((source) => (
                        <li key={source}>
                          <Link
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                            to={source}>
                            {source}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Icon
                      width={20}
                      height={20}
                      className="mr-2"
                      icon="mdi:home"
                    />
                    <p className="text-sm">
                      Property Owner: {row.propertyOwner || "Unknown"}
                    </p>
                  </div>
                  <Link
                    to={row.listingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Icon
                      width={20}
                      height={20}
                      className="mr-2"
                      icon="mdi:link"
                    />
                    View on {row.listingSite}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
