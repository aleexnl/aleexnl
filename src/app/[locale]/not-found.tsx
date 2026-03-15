import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
	const t = await getTranslations("notFound");

	return (
		<main className="max-w-3xl mx-auto px-6 py-16 text-center">
			<h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
				404
			</h1>
			<h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
				{t("title")}
			</h2>
			<p className="text-gray-500 dark:text-gray-400 mb-8">
				{t("description")}
			</p>
			<Link
				href="/"
				className="text-gray-900 dark:text-white font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
			>
				{t("backHome")}
			</Link>
		</main>
	);
}
