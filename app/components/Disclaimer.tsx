import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@nextui-org/react";

export default function Disclaimer() {
  return (
    <div className="flex flex-row gap-2 m-4 items-center  text-gray-500">
      <Icon icon="mdi:alert-circle" className="w-4 h-4 hidden md:block" />
      <p className="text-xs">
        This visualization is based on data from a community-created Google
        Sheet:{" "}
        <Link
          aria-label="Google Sheet"
          color="primary"
          href="https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/edit?gid=314416722#gid=314416722"
          className="underline text-xs"
          target="_blank"
          rel="noopener noreferrer">
          Tracking Rental Price Gouging in LA
        </Link>
        . This site is not affiliated with the Google Sheet or its creators.
      </p>
    </div>
  );
}
