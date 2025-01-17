import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Button, Card, NextUIProvider } from "@nextui-org/react";
import "./tailwind.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import Header from "./components/Header";
import Disclaimer from "./components/Disclaimer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏠</text></svg>"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <div className="min-h-screen">
            <Header />
            {children}
            {showDisclaimer && (
              <Disclaimer setShowDisclaimer={setShowDisclaimer} />
            )}
          </div>
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
