"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const locales = ["en", "ca", "es"] as const;

export function LocaleSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const handleChange = (newLocale: string) => {
		const segments = pathname.split("/");
		segments[1] = newLocale;
		router.push(segments.join("/"));
	};

	return (
		<nav aria-label="Language switcher">
			<ul className="flex gap-2 text-sm">
				{locales.map((code) => (
					<li key={code}>
						<button
							type="button"
							onClick={() => handleChange(code)}
							aria-current={locale === code ? "true" : undefined}
							className={
								locale === code
									? "font-semibold text-gray-900 dark:text-white"
									: "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
							}
						>
							{code.toUpperCase()}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
