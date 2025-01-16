import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, cn, Input, Slider } from "@nextui-org/react";
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
    console.log("Debounced search input changed:", value);
    setSearch(value);
  }, 500);

  const debouncedSetRentalPriceRange = useDebouncedCallback(
    (value: [number, number]) => {
      console.log("Debounced rental price range changed:", value);
      setRentalPriceRange(value);
    },
    500
  );

  const debouncedSetUpdatedRentalPriceRange = useDebouncedCallback(
    (value: [number, number]) => {
      console.log("Debounced updated rental price range changed:", value);
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
        label="Search"
        placeholder="123 Billionaire Boulevard, Atlantis, CA"
        onChange={(e) => handleSearchChange(e.target.value)}
        classNames={{
          input: ["placeholder:italic placeholder:font-thin"],
        }}
        aria-label="search"
        className="w-full xl:w-96"
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <Slider
          className="w-full lg:min-w-80 text-gray-400"
          defaultValue={[0, 500000]}
          formatOptions={{ style: "currency", currency: "USD" }}
          label={
            <p className="font-bold dark:text-white text-black">
              Original Price Range
            </p>
          }
          maxValue={50000}
          minValue={0}
          step={500}
          onChange={(value) =>
            handleRentalPriceChange(value as [number, number])
          }
          aria-label="original-price-range"
        />
        <Slider
          className="w-full lg:min-w-80 text-gray-400"
          defaultValue={[0, 500000]}
          formatOptions={{ style: "currency", currency: "USD" }}
          label={
            <p className="font-bold dark:text-white text-black">
              Updated Price Range
            </p>
          }
          maxValue={50000}
          minValue={0}
          step={500}
          onChange={(value) =>
            handleUpdatedRentalPriceChange(value as [number, number])
          }
          aria-label="updated-price-range"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="faded"
          onPress={() => {
            setSortDirectionPercentIncrease(
              sortDirectionPercentIncrease === "asc" ? "desc" : "asc"
            );
            setSortDirectionUpdatedPrice(null);
          }}
          aria-label="sort-by-percent-increase"
          className={cn(
            "h-full min-h-12 w-1/2",
            sortDirectionPercentIncrease ? "bg-blue-500 text-white" : ""
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
          variant="faded"
          onPress={() => {
            setSortDirectionUpdatedPrice(
              sortDirectionUpdatedPrice === "asc" ? "desc" : "asc"
            );
            setSortDirectionPercentIncrease(null);
          }}
          aria-label="sort-by-updated-price"
          className={cn(
            "h-full min-h-12 w-1/2",
            sortDirectionUpdatedPrice ? "bg-blue-500 text-white" : ""
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
          variant="faded"
          onPress={() => {
            setSortDirectionPercentIncrease(null);
            setSortDirectionUpdatedPrice(null);
          }}
          aria-label="reset-sorting"
          className="h-full min-h-12 w-1/2">
          Reset
        </Button>
      </div>
    </Card>
  );
}
