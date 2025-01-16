import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchSubmissionsData } from "api";
import { RowData } from "../types/RowData";
import RowCard from "../components/RowCard";

export const meta: MetaFunction = () => {
  return [
    { title: "RentGouging.com" },
    { name: "description", content: "LA fire's rent gouging" },
  ];
};

export const loader = async () => {
  try {
    const data = await fetchSubmissionsData();
    return Response.json(data);
  } catch (error) {
    console.error("Error loading submissions data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};
export default function Index() {
  const data = useLoaderData<RowData[]>();
  // console.log(data);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold text-center my-10">RentGouging.com</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.map((row) => (
          <RowCard key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
}
