import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, cn, Input, Slider } from "@nextui-org/react";

type ControlsProps = {
  search: string;
  setSearch: (search: string) => void;
  rentalPriceRange: [number, number];
  setRentalPriceRange: (priceRange: [number, number]) => void;
  updatedRentalPriceRange: [number, number];
  setUpdatedRentalPriceRange: (priceRange: [number, number]) => void;
  sortDirectionPercentIncrease: "asc" | "desc" | null;
  setSortDirectionPercentIncrease: (direction: "asc" | "desc" | null) => void;
  sortDirectionUpdatedPrice: "asc" | "desc" | null;
  setSortDirectionUpdatedPrice: (direction: "asc" | "desc" | null) => void;
};

export default function Controls({
  search,
  setSearch,
  rentalPriceRange,
  setRentalPriceRange,
  updatedRentalPriceRange,
  setUpdatedRentalPriceRange,
  sortDirectionPercentIncrease,
  setSortDirectionPercentIncrease,
  sortDirectionUpdatedPrice,
  setSortDirectionUpdatedPrice,
}: ControlsProps) {
  return (
    <Card className="h-full w-full p-5 flex flex-col xl:flex-row gap-4">
      <Input
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="search"
        className="w-full xl:w-96"
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <Slider
          className="w-full lg:min-w-80 text-gray-400"
          defaultValue={[0, 500000]}
          formatOptions={{ style: "currency", currency: "USD" }}
          label={<p className="font-bold text-white">Original Price Range</p>}
          maxValue={50000}
          minValue={0}
          step={100}
          value={rentalPriceRange}
          onChange={(value) => setRentalPriceRange(value as [number, number])}
          aria-label="original-price-range"
        />
        <Slider
          className="w-full lg:min-w-80 text-gray-400"
          defaultValue={[0, 500000]}
          formatOptions={{ style: "currency", currency: "USD" }}
          label={<p className="font-bold text-white">Updated Price Range</p>}
          maxValue={50000}
          minValue={0}
          step={100}
          value={updatedRentalPriceRange}
          onChange={(value) =>
            setUpdatedRentalPriceRange(value as [number, number])
          }
          aria-label="updated-price-range"
        />
      </div>
      <div className="flex gap-2">
        <Button
          onPress={() => {
            setSortDirectionPercentIncrease((prev) =>
              prev === "asc" ? "desc" : "asc"
            );
            setSortDirectionUpdatedPrice(null); // Reset other sort
          }}
          aria-label="sort-by-percent-increase"
          className={cn(
            "h-full min-h-12 w-1/2",
            sortDirectionPercentIncrease ? "bg-blue-500" : "bg-gray-500"
          )}>
          <Icon
            width={25}
            height={25}
            icon={
              sortDirectionPercentIncrease === "asc"
                ? "mdi:arrow-up"
                : "mdi:arrow-down"
            }
          />
          <Icon width={25} height={25} icon="mdi:percent" />
        </Button>
        <Button
          onPress={() => {
            setSortDirectionUpdatedPrice((prev) =>
              prev === "asc" ? "desc" : "asc"
            );
            setSortDirectionPercentIncrease(null); // Reset other sort
          }}
          aria-label="sort-by-updated-price"
          className={cn(
            "h-full min-h-12 w-1/2",
            sortDirectionUpdatedPrice ? "bg-blue-500" : "bg-gray-500"
          )}>
          <Icon
            width={25}
            height={25}
            icon={
              sortDirectionUpdatedPrice === "asc"
                ? "mdi:arrow-up"
                : "mdi:arrow-down"
            }
          />
          <Icon width={25} height={25} icon="mdi:dollar" />
        </Button>
        <Button
          onPress={() => {
            setSortDirectionPercentIncrease(null);
            setSortDirectionUpdatedPrice(null);
          }}
          aria-label="reset-sorting"
          className="h-full min-h-12 w-1/2 bg-gray-500">
          Reset
        </Button>
      </div>
    </Card>
  );
}
