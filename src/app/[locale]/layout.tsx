import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";

const manrope = Manrope({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-manrope",
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
		{ media: "(prefers-color-scheme: dark)", color: "#13171c" },
	],
	width: "device-width",
	initialScale: 1,
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "meta" });
	return {
		metadataBase: new URL("https://aleexnl.com"),
		title: t("title"),
		description: t("description"),
		robots: "index, follow",
		icons: {
			icon: [
				{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
				{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
			],
			shortcut: "/favicon.ico",
			apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
		},
		appleWebApp: {
			title: "Alejandro Nieto's Portfolio",
		},
		manifest: "/site.webmanifest",
		alternates: {
			canonical:
				locale === "en"
					? "https://aleexnl.com/"
					: `https://aleexnl.com/${locale}`,
			languages: {
				"x-default": "https://aleexnl.com/",
				en: "https://aleexnl.com/",
				ca: "https://aleexnl.com/ca",
				es: "https://aleexnl.com/es",
			},
		},
		openGraph: {
			siteName: "Alejandro Nieto Luque",
			images: [
				{
					url: `/${locale}/opengraph-image`,
					width: 1200,
					height: 630,
					alt: t("title"),
				},
			],
			type: "website",
			locale:
				({ en: "en_US", ca: "ca_ES", es: "es_ES" } as Record<string, string>)[
					locale
				] ?? "en_US",
			url:
				locale === "en"
					? "https://aleexnl.com/"
					: `https://aleexnl.com/${locale}`,
			title: t("title"),
			description: t("description"),
		},
		twitter: {
			card: "summary_large_image",
			images: [
				{
					url: `/${locale}/opengraph-image`,
					alt: t("title"),
				},
			],
			creator: "@aleexnl",
			title: t("title"),
			description: t("description"),
		},
	};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);
	const tNav = await getTranslations({ locale, namespace: "nav" });

	return (
		<html lang={locale} className={manrope.variable}>
			<body>
				<a href="#main-content" className="skip-link">
					{tNav("skipToContent")}
				</a>
				{process.env.VERCEL === "1" && <Analytics />}
				{process.env.VERCEL === "1" && <SpeedInsights />}
				{children}
			</body>
		</html>
	);
}
