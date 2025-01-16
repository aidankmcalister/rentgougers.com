import { Link } from "@remix-run/react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <h1 className="text-3xl font-bold">RentGouging.com</h1>
        <p className="text-xs md:text-sm text-gray-500">
          Data from:{" "}
          <Link
            to="https://docs.google.com/spreadsheets/d/1RXWxLqTyWvAuq8A0PgaBuWeEn_G6qTLyTZ8lzfNEaNw/edit?gid=314416722#gid=314416722"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer">
            Tracking Rental Price Gouging in LA
          </Link>
        </p>
      </div>
      <DarkModeToggle />
    </div>
  );
}
