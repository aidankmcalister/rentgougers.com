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
  const [filters, setFilters] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const data = useLoaderData<RowData[]>();

  const filteredRows = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-4 space-y-4">
        <div className="w-full flex items-center">
          <Controls
            filters={filters}
            setFilters={setFilters}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredRows.map((row) => (
            <RowCard key={row.id} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}
