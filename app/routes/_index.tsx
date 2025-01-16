import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { fetchSubmissionsData } from "api";
import { RowData } from "../types/RowData";
import RowCard from "../components/RowCard";
import Header from "~/components/Header";
import Controls from "~/components/Controls";
import { Divider } from "@nextui-org/react";
import { useState, useMemo } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "RentGouging.com" },
    { name: "description", content: "LA fire's rent gouging" },
  ];
};

export const loader = async () => {
  try {
    const data = await fetchSubmissionsData();
    return json(data);
  } catch (error) {
    console.error("Error loading submissions data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};
export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [rentalPriceRange, setRentalPriceRange] = useState<[number, number]>([
    0, 50000,
  ]);
  const [updatedRentalPriceRange, setUpdatedRentalPriceRange] = useState<
    [number, number]
  >([0, 50000]);

  const data = useLoaderData<RowData[]>();

  const filteredRows = useMemo(() => {
    return data.filter((row) => {
      const rentalPrice = parseFloat(row.rentalPrice.replace(/[$,]/g, ""));
      const updatedRentalPrice = parseFloat(
        row.updatedRentalPrice.replace(/[$,]/g, "")
      );
      const isInPriceRange =
        rentalPrice >= rentalPriceRange[0] &&
        rentalPrice <= rentalPriceRange[1];
      const isInUpdatedPriceRange =
        updatedRentalPrice >= updatedRentalPriceRange[0] &&
        updatedRentalPrice <= updatedRentalPriceRange[1];
      const matchesSearch = Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      );
      return isInPriceRange && isInUpdatedPriceRange && matchesSearch;
    });
  }, [data, search, rentalPriceRange, updatedRentalPriceRange]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-4 space-y-4">
        <div className="w-full flex items-center">
          <Controls
            search={search}
            setSearch={setSearch}
            rentalPriceRange={rentalPriceRange}
            setRentalPriceRange={setRentalPriceRange}
            updatedRentalPriceRange={updatedRentalPriceRange}
            setUpdatedRentalPriceRange={setUpdatedRentalPriceRange}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRows.map((row) => (
            <RowCard key={row.id} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}
