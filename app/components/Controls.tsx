import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Input, Slider } from "@nextui-org/react";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

type ControlsProps = {
  setSearch: (search: string) => void;
  setRentalPriceRange: (priceRange: [number, number]) => void;
  setUpdatedRentalPriceRange: (priceRange: [number, number]) => void;
  sortDirectionPercentIncrease: "asc" | "desc" | null;
  setSortDirectionPercentIncrease: (direction: "asc" | "desc" | null) => void;
  sortDirectionUpdatedPrice: "asc" | "desc" | null;
  setSortDirectionUpdatedPrice: (direction: "asc" | "desc" | null) => void;
};

export default function Controls({
  setSearch,
  setRentalPriceRange,
  setUpdatedRentalPriceRange,
  sortDirectionPercentIncrease,
  setSortDirectionPercentIncrease,
  sortDirectionUpdatedPrice,
  setSortDirectionUpdatedPrice,
}: ControlsProps) {
  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  const debouncedSetRentalPriceRange = useDebouncedCallback(
    (value: [number, number]) => {
      setRentalPriceRange(value);
    },
    500
  );

  const debouncedSetUpdatedRentalPriceRange = useDebouncedCallback(
    (value: [number, number]) => {
      setUpdatedRentalPriceRange(value);
    },
    500
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      debouncedSetSearch(value);
    },
    [debouncedSetSearch]
  );

  const handleRentalPriceChange = useCallback(
    (value: [number, number]) => {
      debouncedSetRentalPriceRange(value);
    },
    [debouncedSetRentalPriceRange]
  );

  const handleUpdatedRentalPriceChange = useCallback(
    (value: [number, number]) => {
      debouncedSetUpdatedRentalPriceRange(value);
    },
    [debouncedSetUpdatedRentalPriceRange]
  );

  return (
    <Card className="h-full w-full p-5 flex flex-col xl:flex-row gap-4">
      <Input
        color="default"
        label="Search"
        placeholder="123 Billionaire Boulevard, Atlantis, CA"
        onChange={(e) => handleSearchChange(e.target.value)}
        classNames={{
          input: ["placeholder:italic placeholder:font-thin"],
        }}
        aria-label="search"
        className="w-full"
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <Slider
          size="sm"
          className="w-full lg:min-w-80 text-gray-400"
          getValue={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              return `$${value[0].toLocaleString()} - $${value[1].toLocaleString()}${
                value[1] === 80000 ? "+" : ""
              }`;
            }
            return "";
          }}
          defaultValue={[0, 80000]}
          formatOptions={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }}
          label={
            <p className="font-bold dark:text-white text-black">
              Original Price Range
            </p>
          }
          maxValue={80000}
          minValue={0}
          step={1000}
          onChange={(value) =>
            handleRentalPriceChange(value as [number, number])
          }
          aria-label="original-price-range"
        />
        <Slider
          size="sm"
          className="w-full lg:min-w-80 text-gray-400"
          defaultValue={[0, 80000]}
          getValue={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              return `$${value[0].toLocaleString()} - $${value[1].toLocaleString()}${
                value[1] === 80000 ? "+" : ""
              }`;
            }
            return "";
          }}
          formatOptions={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }}
          label={
            <p className="font-bold dark:text-white text-black">
              Updated Price Range
            </p>
          }
          maxValue={80000}
          minValue={0}
          step={1000}
          onChange={(value) =>
            handleUpdatedRentalPriceChange(value as [number, number])
          }
          aria-label="updated-price-range"
        />
      </div>
      <div className="flex gap-2">
        <Button
          color={sortDirectionPercentIncrease === null ? "default" : "primary"}
          variant="shadow"
          onPress={() => {
            setSortDirectionPercentIncrease(
              sortDirectionPercentIncrease === "asc" ? "desc" : "asc"
            );
            setSortDirectionUpdatedPrice(null);
          }}
          aria-label="sort-by-percent-increase"
          className="h-full min-h-12 w-1/2">
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
          color={sortDirectionUpdatedPrice === null ? "default" : "primary"}
          variant="shadow"
          onPress={() => {
            setSortDirectionUpdatedPrice(
              sortDirectionUpdatedPrice === "asc" ? "desc" : "asc"
            );
            setSortDirectionPercentIncrease(null);
          }}
          aria-label="sort-by-updated-price"
          className="h-full min-h-12 w-1/2">
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
          color="primary"
          variant="shadow"
          onPress={() => {
            setSortDirectionPercentIncrease(null);
            setSortDirectionUpdatedPrice(null);
            setSearch("");
            setRentalPriceRange([0, 80000]);
            setUpdatedRentalPriceRange([0, 80000]);
          }}
          aria-label="reset-sorting"
          className="h-full min-h-12 w-1/2">
          Reset
        </Button>
      </div>
    </Card>
  );
}
