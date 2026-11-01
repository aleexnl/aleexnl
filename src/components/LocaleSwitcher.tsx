import { getTranslations } from "next-intl/server";

const locales = ["en", "ca", "es"] as const;

interface LocaleSwitcherProps {
	locale: string;
}

export async function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
	const t = await getTranslations("nav");
	const names = { en: "English", ca: "Català", es: "Español" };
	return (
		<nav aria-label={t("languageSwitcher")} className="locale-nav">
			<ul>
				{locales.map((code) => (
					<li key={code}>
						<a
							href={code === "en" ? "/" : `/${code}`}
							hrefLang={code}
							lang={code}
							aria-label={names[code]}
							aria-current={locale === code ? "true" : undefined}
						>
							{code.toUpperCase()}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
