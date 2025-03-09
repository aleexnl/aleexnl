import "./globals.css";
import { Roboto } from "next/font/google";
import { metadata, viewport } from "./metadata";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Optimize font loading
const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        {/* Next.js Skip Navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4"
        >
          Skip to content
        </a>
        <Analytics />
        <SpeedInsights />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
