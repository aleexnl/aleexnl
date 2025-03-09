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
  title: "Alejandro - Software Developer",
  description:
    "Experienced .NET software developer specializing in building scalable web applications, APIs, and enterprise solutions using C#, ASP.NET, and Microsoft technologies. Passionate about clean code, performance optimization, and modern software architecture.",
  keywords: [
    ".NET Development",
    "Azure DevOps",
    "GitHub",
    "Android Development",
    "iOS Development",
    "Software Developer",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aleexnl.vercel.app/",
    title: "Alejandro - Software Developer",
    description:
      "Experienced .NET software developer specializing in building scalable web applications, APIs, and enterprise solutions using C#, ASP.NET, and Microsoft technologies. Passionate about clean code, performance optimization, and modern software architecture.",
  },
};
