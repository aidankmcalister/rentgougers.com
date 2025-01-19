import DarkModeToggle from "./DarkModeToggle";
import { Button, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

function getTimeUntilNextTwoHourMark() {
  const now = new Date();
  const hours = now.getHours();

  const nextHour = hours + (2 - (hours % 2));

  const nextMark = new Date(now);
  nextMark.setHours(nextHour, 0, 0, 0);

  if (now.getTime() === nextMark.getTime()) {
    nextMark.setHours(nextMark.getHours() + 2);
  }

  return nextMark.getTime() - now.getTime();
}

function formatMsToHMS(ms: number) {
  if (ms < 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (val: number) => val.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function Header() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    setTimeLeft(getTimeUntilNextTwoHourMark());

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          return getTimeUntilNextTwoHourMark();
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800 shadow-md">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold underline decoration-primary-400">
          RentGougers.com
        </h1>
        <p className="text-sm font-thin">
          Next update:{" "}
          <span className="font-semibold">{formatMsToHMS(timeLeft)}</span>
        </p>
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
