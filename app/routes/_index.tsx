import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "RentGouging.com" },
    { name: "description", content: "LA fire's rent gouging" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>RentGouging.com</h1>
    </div>
  );
}
