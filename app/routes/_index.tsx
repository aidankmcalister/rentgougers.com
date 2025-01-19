import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { fetchRentData, getPriceChartData } from "api";
import { RowData } from "~/types/RowData";
import RowCard from "~/components/RowCard";
import Controls from "~/components/Controls";
import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import NumberFlow from "@number-flow/react";
import { CircularProgress } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";
import PriceAreaChart from "~/components/PriceAreaChart";

export const meta: MetaFunction = () => {
  return [
    { title: "RentGougers.com" },
    { name: "description", content: "LA fire's rent gouging" },
    {
      name: "og:image",
      content: "/rentgougers-preview.png",
      width: "1200",
      height: "630",
    },
  ];
};

export const loader = async () => {
  try {
    const allRentData = await fetchRentData();
    const priceChartData = await getPriceChartData();
    return json({ allRentData, priceChartData });
  } catch (error) {
    console.error("Error loading rent data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [sortDirectionDatePosted, setSortDirectionDatePosted] = useState<
    "asc" | "desc" | null
  >("desc");
  const [sortDirectionPercentIncrease, setSortDirectionPercentIncrease] =
    useState<"asc" | "desc" | null>(null);
  const [sortDirectionUpdatedPrice, setSortDirectionUpdatedPrice] = useState<
    "asc" | "desc" | null
  >(null);
  const [rentalPriceRange, setRentalPriceRange] = useState<[number, number]>([
    0, 80000,
  ]);
  const [updatedRentalPriceRange, setUpdatedRentalPriceRange] = useState<
    [number, number]
  >([0, 80000]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [items, setItems] = useState<RowData[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const itemsPerPage = 20;

  const { allRentData, priceChartData } = useLoaderData<{
    allRentData: RowData[];
    priceChartData: { key: string; data: number }[];
  }>();

  const filteredRows = useMemo(() => {
    return allRentData.filter((row) => {
      const rentalPrice = row.rentalPrice;
      const updatedRentalPrice = row.updatedRentalPrice;

      const isValidRentalPrice = rentalPrice >= 100;

      const isInPriceRange =
        (rentalPrice >= rentalPriceRange[0] &&
          rentalPrice <= rentalPriceRange[1]) ||
        (rentalPriceRange[1] === 80000 && rentalPrice >= 80000);

      const isInUpdatedPriceRange =
        (updatedRentalPrice >= updatedRentalPriceRange[0] &&
          updatedRentalPrice <= updatedRentalPriceRange[1]) ||
        (updatedRentalPriceRange[1] === 80000 && updatedRentalPrice >= 80000);

      const matchesSearch = Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      );
      return (
        isValidRentalPrice &&
        isInPriceRange &&
        isInUpdatedPriceRange &&
        matchesSearch
      );
    });
  }, [allRentData, search, rentalPriceRange, updatedRentalPriceRange]);

  const sortedRows = useMemo(() => {
    const rows = [...filteredRows];
    if (sortDirectionDatePosted) {
      rows.sort((a, b) => {
        const dateA = new Date(a.datePosted).getTime();
        const dateB = new Date(b.datePosted).getTime();
        return sortDirectionDatePosted === "asc"
          ? dateA - dateB
          : dateB - dateA;
      });
    } else if (sortDirectionPercentIncrease) {
      rows.sort((a, b) => {
        const percentA = a.percentIncrease;
        const percentB = b.percentIncrease;
        return sortDirectionPercentIncrease === "asc"
          ? percentA - percentB
          : percentB - percentA;
      });
    } else if (sortDirectionUpdatedPrice) {
      rows.sort((a, b) => {
        const priceA = a.updatedRentalPrice;
        const priceB = b.updatedRentalPrice;
        return sortDirectionUpdatedPrice === "asc"
          ? priceA - priceB
          : priceB - priceA;
      });
    }
    return rows;
  }, [
    filteredRows,
    sortDirectionDatePosted,
    sortDirectionPercentIncrease,
    sortDirectionUpdatedPrice,
  ]);

  useEffect(() => {
    setItems(sortedRows.slice(0, itemsPerPage));
    setLoading(false);
  }, [sortedRows]);

  const fetchData = async () => {
    if (offset + itemsPerPage >= sortedRows.length) {
      setHasMore(false);
      return;
    }
    const newItems = sortedRows.slice(offset, offset + itemsPerPage);
    setItems((prev) => [...prev, ...newItems]);
    setOffset((prev) => prev + itemsPerPage);
  };

  return (
    <div className="m-4 space-y-4">
      <div className="w-full h-fit flex flex-col lg:flex-row gap-4 items-center">
        <div className="w-full h-96 lg:w-1/2 border border-gray-500 rounded-lg p-4 flex items-center">
          <PriceAreaChart data={priceChartData} />
        </div>
        <div className="w-full h-96 lg:w-1/2 border border-gray-500 rounded-lg p-4 flex items-center">
          <PriceAreaChart data={priceChartData} />
        </div>
      </div>
      <div className="w-full flex items-center">
        <Controls
          sortDirectionDatePosted={sortDirectionDatePosted}
          setSortDirectionDatePosted={setSortDirectionDatePosted}
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
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icon icon="mdi:home" />
            <span className="text-primary-400">
              <NumberFlow value={sortedRows.length} />
            </span>{" "}
            total results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((row) => (
              <RowCard key={row.id} row={row} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
