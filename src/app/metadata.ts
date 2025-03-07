import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#1a202c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Alejandro Nieto Luque - Frontend Developer",
  description:
    "Frontend developer passionate about creating responsive, user-friendly web applications",
  keywords: [
    ".NET Development",
    "Azure DevOps",
    "GitHub",
    "Android Development",
    "iOS Development",
    "Frontend Developer",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com",
    title: "Alejandro Nieto Luque - Frontend Developer",
    description:
      "Frontend developer passionate about creating responsive, user-friendly web applications",
  },
};
