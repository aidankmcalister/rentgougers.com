import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { fetchRentData } from "api";
import { RowData } from "~/types/RowData";
import RowCard from "~/components/RowCard";
import Controls from "~/components/Controls";
import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import NumberFlow from "@number-flow/react";
import { CircularProgress } from "@nextui-org/react";

export const meta: MetaFunction = () => {
  return [
    { title: "RentGougers.com" },
    { name: "description", content: "LA fire's rent gouging" },
    { name: "og:image", content: "/rentgougers-preview.png" },
  ];
};

export const loader = async () => {
  try {
    const data = await fetchRentData();
    return json(data);
  } catch (error) {
    console.error("Error loading rent data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [sortDirectionPercentIncrease, setSortDirectionPercentIncrease] =
    useState<"asc" | "desc" | null>(null);
  const [sortDirectionUpdatedPrice, setSortDirectionUpdatedPrice] = useState<
    "asc" | "desc" | null
  >(null);
  const [rentalPriceRange, setRentalPriceRange] = useState<[number, number]>([
    0, 50000,
  ]);
  const [updatedRentalPriceRange, setUpdatedRentalPriceRange] = useState<
    [number, number]
  >([0, 50000]);
  const [loading, setLoading] = useState<boolean>(true);

  const data = useLoaderData<RowData[]>();

  const highestPrice = data.reduce((max, row) => {
    if (
      isNaN(parseFloat(row.rentalPrice.replace(/[$,]/g, ""))) ||
      isNaN(parseFloat(row.updatedRentalPrice.replace(/[$,]/g, "")))
    ) {
      return max;
    }
    const rentalPrice = parseFloat(row.rentalPrice.replace(/[$,]/g, ""));
    const updatedRentalPrice = parseFloat(
      row.updatedRentalPrice.replace(/[$,]/g, "")
    );
    return Math.max(max, rentalPrice, updatedRentalPrice);
  }, 0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetchRentData();
      setLoading(false);
    };
    fetchData();
  }, []);

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

  const sortedRows = useMemo(() => {
    const rows = [...filteredRows];
    if (sortDirectionPercentIncrease) {
      rows.sort((a, b) => {
        const percentA = parseFloat(a.percentIncrease) || 0;
        const percentB = parseFloat(b.percentIncrease) || 0;
        return sortDirectionPercentIncrease === "asc"
          ? percentA - percentB
          : percentB - percentA;
      });
    } else if (sortDirectionUpdatedPrice) {
      rows.sort((a, b) => {
        const priceA = parseFloat(a.updatedRentalPrice.replace(/[$,]/g, ""));
        const priceB = parseFloat(b.updatedRentalPrice.replace(/[$,]/g, ""));
        return sortDirectionUpdatedPrice === "asc"
          ? priceA - priceB
          : priceB - priceA;
      });
    }
    return rows;
  }, [filteredRows, sortDirectionPercentIncrease, sortDirectionUpdatedPrice]);
  return (
    <div className="m-4 space-y-4">
      <div className="w-full flex items-center">
        <Controls
          highestPrice={highestPrice}
          setSearch={setSearch}
          setRentalPriceRange={setRentalPriceRange}
          setUpdatedRentalPriceRange={setUpdatedRentalPriceRange}
          sortDirectionPercentIncrease={sortDirectionPercentIncrease}
          setSortDirectionPercentIncrease={setSortDirectionPercentIncrease}
          sortDirectionUpdatedPrice={sortDirectionUpdatedPrice}
          setSortDirectionUpdatedPrice={setSortDirectionUpdatedPrice}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <CircularProgress size="lg" color="primary" className="w-10 h-10" />
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icon icon="mdi:home" />
            <span className="text-primary-400">
              <NumberFlow value={sortedRows.length} />
            </span>{" "}
            total results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedRows.map((row) => (
              <RowCard key={row.id} row={row} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
