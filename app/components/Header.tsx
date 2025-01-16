import { Link } from "@remix-run/react";
import DarkModeToggle from "./DarkModeToggle";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800 shadow-md">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">RentGougers.com</h1>
        <p className="text-xs md:text-sm text-gray-500">
          <Link
            to="https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/edit?gid=314416722#gid=314416722"
            className="text-blue-500 underline hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer">
            Tracking Rental Price Gouging in LA
          </Link>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          as={Link}
          target="_blank"
          rel="noreferrer"
          to="https://github.com/aidankmcalister/RentGougers.com">
          <Icon width={25} height={25} icon="mdi:github" />
        </Button>
        <DarkModeToggle />
      </div>
    </div>
  );
}
