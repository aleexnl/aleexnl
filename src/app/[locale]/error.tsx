"use client";

import { useParams } from "next/navigation";
import messages from "../../../messages/errors.json";

function ErrorPage({
	error: _error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const { locale } = useParams<{ locale: string }>();
	const t = messages[locale === "es" || locale === "ca" ? locale : "en"];
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="text-center space-y-4">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
					{t.title}
				</h2>
				<p className="text-gray-600 dark:text-gray-400">{t.description}</p>
				<button
					type="button"
					onClick={() => reset()}
					className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
				>
					{t.retry}
				</button>
			</div>
		</div>
	);
}
export default ErrorPage;
