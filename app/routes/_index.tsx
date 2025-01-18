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
import InfiniteScroll from "react-infinite-scroll-component";

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

  const data = useLoaderData<RowData[]>();

  const highestPrice = data.reduce((max, row) => {
    const rentalPriceStr = row.rentalPrice.replace(/[$,]/g, "");
    const updatedRentalPriceStr = row.updatedRentalPrice.replace(/[$,]/g, "");

    const rentalPrice = parseFloat(rentalPriceStr);
    const updatedRentalPrice = parseFloat(updatedRentalPriceStr);

    if (isNaN(rentalPrice) || isNaN(updatedRentalPrice)) {
      console.warn("Invalid price detected for row:", row);
      return max;
    }

    return Math.max(max, rentalPrice, updatedRentalPrice);
  }, 0);
  console.log("highestPrice", highestPrice);

  const filteredRows = useMemo(() => {
    return data.filter((row) => {
      const rentalPrice = parseFloat(row.rentalPrice.replace(/[$,]/g, ""));
      const updatedRentalPrice = parseFloat(
        row.updatedRentalPrice.replace(/[$,]/g, "")
      );

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
      <div className="w-full flex items-center">
        <Controls
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
