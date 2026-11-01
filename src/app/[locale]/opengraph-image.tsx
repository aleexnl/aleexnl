import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "../../i18n/routing";

export const alt = "Alejandro Nieto Luque — Kotlin / .NET / React";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;
export const dynamic = "force-static";

export default async function OpenGraphImage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	const {
		portfolio: { hero },
	} = (await import(`../../../messages/${locale}.json`)).default;
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: "#f5f6f8",
				color: "#192127",
				padding: "64px 72px",
				fontFamily: "sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					fontSize: 24,
				}}
			>
				<span>Alejandro Nieto Luque</span>
				<span style={{ color: "#244bd6", fontWeight: 700 }}>an.</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					fontSize: 86,
					letterSpacing: "-5px",
					lineHeight: 1.08,
				}}
			>
				<span>{hero.headline}</span>
				<span>{hero.headlineEnd}</span>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					fontSize: 23,
					color: "#59636f",
				}}
			>
				<span>Kotlin / .NET / React</span>
				<span>aleexnl.com</span>
			</div>
		</div>,
		size,
	);
}
