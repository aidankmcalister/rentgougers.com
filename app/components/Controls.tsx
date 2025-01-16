import { Card, Checkbox, Input, Slider } from "@nextui-org/react";

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
    <Card className="h-full w-full p-5 flex flex-col gap-4">
      <Input
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="search"
      />
      <div className="flex items-center gap-4 flex-col">
        <Slider
          className="w-full max-w-96"
          defaultValue={[0, 500000]}
          formatOptions={{ style: "currency", currency: "USD" }}
          label="Original Price Range"
          maxValue={50000}
          minValue={0}
          step={100}
          value={rentalPriceRange}
          onChange={(value) => setRentalPriceRange(value as [number, number])}
          aria-label="filter1"
        />
        <Slider
          className="w-full max-w-96"
          defaultValue={[0, 500000]}
          formatOptions={{ style: "currency", currency: "USD" }}
          label="Updated Price Range"
          maxValue={50000}
          minValue={0}
          step={100}
          value={updatedRentalPriceRange}
          onChange={(value) =>
            setUpdatedRentalPriceRange(value as [number, number])
          }
          aria-label="filter2"
        />
      </div>
    </Card>
  );
}
