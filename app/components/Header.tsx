import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-5">
      <h1 className="text-3xl font-bold text-center">RentGouging.com</h1>
      <DarkModeToggle />
    </div>
  );
}
