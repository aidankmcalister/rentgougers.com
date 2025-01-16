import { Card, Checkbox, Input } from "@nextui-org/react";

type ControlsProps = {
  filters: string[];
  setFilters: (filters: string[]) => void;
  search: string;
  setSearch: (search: string) => void;
};

export default function Controls({
  filters,
  setFilters,
  search,
  setSearch,
}: ControlsProps) {
  return (
    <Card className="h-full w-full p-5">
      <Input
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="search"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            isSelected={filters.includes("filter1")}
            onChange={() => setFilters([...filters, "filter1"])}
            aria-label="filter1"
          />
          filters
        </div>
      </div>
    </Card>
  );
}
