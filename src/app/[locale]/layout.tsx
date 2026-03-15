import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "../../i18n/routing";

const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
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
	const t = await getTranslations({ locale, namespace: "meta" });
	return {
		title: t("title"),
		description: t("description"),
		robots: "index, follow",
		icons: {
			icon: [
				{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
				{ url: "/favicon.svg", type: "image/svg+xml" },
			],
			shortcut: "/favicon.ico",
			apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
		},
		appleWebApp: {
			title: "Alejandro Nieto's Portfolio",
		},
		manifest: "/site.webmanifest",
		alternates: {
			canonical: `https://aleexnl.com/${locale}`,
			languages: {
				"x-default": "https://aleexnl.com/en",
				en: "https://aleexnl.com/en",
				ca: "https://aleexnl.com/ca",
				es: "https://aleexnl.com/es",
			},
		},
		openGraph: {
			type: "website",
			locale:
				({ en: "en_US", ca: "ca_ES", es: "es_ES" } as Record<string, string>)[
					locale
				] ?? "en_US",
			url: `https://aleexnl.com/${locale}`,
			title: t("title"),
			description: t("description"),
		},
		twitter: {
			card: "summary",
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
	const messages = await getMessages();
	const tNav = await getTranslations({ locale, namespace: "nav" });

	return (
		<html lang={locale} className={roboto.variable}>
			<body>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:z-50"
				>
					{tNav("skipToContent")}
				</a>
				<NextIntlClientProvider messages={messages}>
					<Analytics />
					<SpeedInsights />
					<div id="main-content">{children}</div>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
