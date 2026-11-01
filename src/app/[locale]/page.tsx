import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "../../components/About";
import { Arrow } from "../../components/Arrow";
import { Contact } from "../../components/Contact";
import { Experience } from "../../components/Experience";
import { Expertise } from "../../components/Expertise";
import { LocaleSwitcher } from "../../components/LocaleSwitcher";
import { Navigation } from "../../components/Navigation";
import { ProjectShowcase } from "../../components/ProjectShowcase";
import { routing } from "../../i18n/routing";
import { LocaleDataSchema } from "../../schemas/locale";

export const revalidate = 86400;

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);
	const [t, home, messages] = await Promise.all([
		getTranslations("portfolio"),
		getTranslations("home"),
		import(`../../../messages/${locale}.json`).then((m) => m.default),
	]);
	const data = LocaleDataSchema.parse(messages);
	const url =
		locale === "en" ? "https://aleexnl.com/" : `https://aleexnl.com/${locale}`;
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": "https://aleexnl.com/#person",
				name: "Alejandro Nieto Luque",
				jobTitle: t("hero.discipline"),
				url,
				sameAs: [
					"https://github.com/aleexnl",
					"https://www.linkedin.com/in/alejandro-nieto-luque/",
				],
				knowsLanguage: ["Spanish", "Catalan", "English"],
				alumniOf: data.education.items.map((edu) => ({
					"@type": "EducationalOrganization",
					name: edu.institution,
				})),
			},
			{
				"@type": "WebSite",
				"@id": "https://aleexnl.com/#website",
				url,
				name: "Alejandro Nieto Luque",
				inLanguage: locale,
				author: { "@id": "https://aleexnl.com/#person" },
			},
		],
	};
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static validated content, escaped for HTML
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
				}}
			/>
			<Navigation
				items={["work", "experience", "about", "contact"].map((id) => ({
					id,
					label: t(`nav.${id}`),
				}))}
				label={t("nav.primary")}
				menuLabel={t("nav.menu")}
				closeLabel={t("nav.close")}
			>
				<LocaleSwitcher locale={locale} />
			</Navigation>
			<noscript>
				<nav className="shell no-script-nav" aria-label={t("nav.primary")}>
					{["work", "experience", "about", "contact"].map((id) => (
						<a key={id} href={`#${id}`}>
							{t(`nav.${id}`)}
						</a>
					))}
				</nav>
			</noscript>
			<main id="main-content" tabIndex={-1}>
				<section className="hero shell" id="top" aria-labelledby="hero-heading">
					<div className="hero-identity">
						<span className="identity-dot" aria-hidden="true" />
						<p>Alejandro Nieto Luque</p>
						<span className="hero-discipline">{t("hero.discipline")}</span>
					</div>
					<h1 id="hero-heading">
						<span className="sr-only">Alejandro Nieto Luque. </span>
						{t("hero.headline")}
						<br />
						{t("hero.headlineEnd")}
					</h1>
					<div className="hero-bottom">
						<div className="hero-aside">
							<p>{t("hero.stack")}</p>
							<span>{t("hero.note")}</span>
						</div>
						<div className="hero-intro">
							<p>{t("hero.intro")}</p>
							<div className="hero-actions">
								<a className="button" href="#work">
									{t("hero.work")}
									<Arrow />
								</a>
								<a className="text-link" href="#contact">
									{t("hero.contact")}
									<Arrow diagonal />
								</a>
							</div>
						</div>
					</div>
				</section>
				<section
					className="work-section shell section-space"
					id="work"
					aria-labelledby="work-heading"
				>
					<div className="section-heading">
						<div>
							<p className="section-kicker">{t("nav.work")}</p>
							<h2 id="work-heading">{t("work.title")}</h2>
						</div>
						<p>{t("work.intro")}</p>
					</div>
					<ProjectShowcase />
					<a
						className="text-link repository-link"
						href="https://github.com/aleexnl?tab=repositories"
					>
						{t("work.all")}
						<Arrow diagonal />
					</a>
				</section>
				<section
					className="shell section-space experience-section"
					id="experience"
					aria-labelledby="experience-heading"
				>
					<Experience items={data.experience.items} />
				</section>
				<Expertise />
				<About
					education={data.education.items}
					languages={data.languages.items}
					statement={home("personalStatement")}
				/>
				<Contact />
			</main>
		</>
	);
}
