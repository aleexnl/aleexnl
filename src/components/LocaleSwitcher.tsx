"use client";

import { Link, usePathname } from "../i18n/navigation";
import { useLocale } from "next-intl";

const locales = ["en", "ca", "es"] as const;

export function LocaleSwitcher() {
	const locale = useLocale();
	const pathname = usePathname();

	return (
		<nav aria-label="Language switcher">
			<ul className="flex gap-2 text-sm">
				{locales.map((code) => (
					<li key={code}>
						<Link
							href={pathname}
							locale={code}
							aria-current={locale === code ? "true" : undefined}
							className={
								locale === code
									? "font-semibold text-gray-900 dark:text-white"
									: "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
							}
						>
							{code.toUpperCase()}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
