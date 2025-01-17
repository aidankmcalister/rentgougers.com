import DarkModeToggle from "./DarkModeToggle";
import { Button, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800 shadow-md">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold underline decoration-primary-400">
          RentGougers.com
        </h1>
        {/* <Link
          color="primary"
          href="https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/edit?gid=314416722#gid=314416722"
          className="underline text-sm"
          target="_blank"
          rel="noopener noreferrer">
          Tracking Rental Price Gouging in LA
        </Link> */}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="primary"
          variant="shadow"
          aria-label="Github"
          isIconOnly
          as={Link}
          target="_blank"
          rel="noreferrer"
          href="https://github.com/aidankmcalister/RentGougers.com">
          <Icon width={25} height={25} icon="mdi:github" />
        </Button>
        <DarkModeToggle />
      </div>
    </div>
  );
}
