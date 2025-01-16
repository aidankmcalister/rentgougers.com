import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Checkbox, cn, Input, Slider } from "@nextui-org/react";

type ControlsProps = {
  search: string;
  setSearch: (search: string) => void;
  rentalPriceRange: [number, number];
  setRentalPriceRange: (priceRange: [number, number]) => void;
  updatedRentalPriceRange: [number, number];
  setUpdatedRentalPriceRange: (priceRange: [number, number]) => void;
};

export default function Controls({
  search,
  setSearch,
  rentalPriceRange,
  setRentalPriceRange,
  updatedRentalPriceRange,
  setUpdatedRentalPriceRange,
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
          aria-label="sort-by-percent-increase"
          className="h-full min-h-12 w-1/2">
          <Icon width={25} height={25} icon="mdi:arrow-up" />
          <Icon width={25} height={25} icon="mdi:percent" />
        </Button>
        <Button
          aria-label="sort-by-original-price"
          className="h-full min-h-12 w-1/2">
          <Icon width={25} height={25} icon="mdi:arrow-down" />
          <Icon width={25} height={25} icon="mdi:dollar" />
        </Button>
      </div>
    </Card>
  );
}
