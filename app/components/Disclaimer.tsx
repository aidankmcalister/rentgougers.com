import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Link } from "@heroui/react";

export default function Disclaimer({
  setShowDisclaimer,
}: {
  setShowDisclaimer: (show: boolean) => void;
}) {
  return (
    <Card
      isBlurred
      className="fixed bottom-0 right-0 w-full flex items-center justify-between flex-row p-2">
      <div className="flex flex-row gap-2 m-4 items-center  text-gray-500 dark:text-gray-300">
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
      <Button
        isIconOnly
        onPress={() => {
          setShowDisclaimer(false);
        }}
        color="primary"
        variant="shadow"
        aria-label="Close Disclaimer">
        <Icon icon="mdi:close" />
      </Button>
    </Card>
  );
}
