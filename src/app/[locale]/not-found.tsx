import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
	const t = await getTranslations("notFound");
	const locale = await getLocale();

	return (
		<main id="main-content" tabIndex={-1} className="shell recovery-page">
			<h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
				404
			</h1>
			<h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
				{t("title")}
			</h2>
			<p className="text-gray-500 dark:text-gray-400 mb-8">
				{t("description")}
			</p>
			<a
				href={`/${locale}`}
				className="text-gray-900 dark:text-white font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
			>
				{t("backHome")}
			</a>
		</main>
	);
}
