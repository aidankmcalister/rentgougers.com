import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button isIconOnly size="lg" onPress={toggleDarkMode}>
      {isDarkMode ? (
        <Icon icon="tabler:moon-filled" />
      ) : (
        <Icon icon="tabler:sun-filled" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
