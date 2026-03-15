import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Card } from "../../components/Card";
import { Connect } from "../../components/Connect";
import { Education } from "../../components/Education";
import { Experience } from "../../components/Experience";
import { GithubProjects } from "../../components/GithubProjects";
import { Languages } from "../../components/Languages";
import { LocaleSwitcher } from "../../components/LocaleSwitcher";
import { Skills } from "../../components/Skills";
import { connectItems, skillItems } from "../../data/static-data";
import { LocaleDataSchema } from "../../schemas/locale";

export const revalidate = 86400;

async function getLocaleData(locale: string) {
	const messages: unknown = (await import(`../../../messages/${locale}.json`))
		.default;
	const parsed = LocaleDataSchema.safeParse(messages);
	if (!parsed.success) {
		console.error("Locale data validation failed:", parsed.error);
		return { experience: [], education: [], languages: [] };
	}
	return {
		experience: parsed.data.experience.items,
		education: parsed.data.education.items,
		languages: parsed.data.languages.items,
	};
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const [t, tSections, localeData] = await Promise.all([
		getTranslations("home"),
		getTranslations("sections"),
		getLocaleData(locale),
	]);

	const currentYear = new Date().getFullYear();

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Alejandro Nieto Luque",
		jobTitle: t("tagline"),
		url: `https://aleexnl.com/${locale}`,
		sameAs: [
			"https://www.linkedin.com/in/alejandro-nieto-luque/",
			"https://github.com/aleexnl",
		],
		knowsLanguage: ["Spanish", "Catalan", "English"],
		alumniOf: localeData.education.map((edu) => ({
			"@type": "EducationalOrganization",
			name: edu.institution,
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className="max-w-3xl mx-auto px-6 py-16">
				<header className="mb-16">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
								Alejandro Nieto Luque
							</h1>
							<p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
								{t("tagline")}
							</p>
						</div>
						<LocaleSwitcher locale={locale} />
					</div>
					<div className="mt-8">
						<Suspense fallback={<GithubProjectsSkeleton />}>
							<GithubProjects
								title={tSections("featuredProjects")}
								emptyLabel={tSections("noProjects")}
							/>
						</Suspense>
					</div>
				</header>

				<section className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<div className="md:col-span-2 space-y-12">
						<Experience items={localeData.experience} />
						<Education
							items={localeData.education}
							title={tSections("education")}
						/>
					</div>

					<div className="space-y-10">
						<Connect items={connectItems} title={tSections("connect")} />
						<Skills items={skillItems} title={tSections("skills")} />
						<Languages
							items={localeData.languages}
							title={tSections("languages")}
						/>

						<Card title={tSections("personalStatement")}>
							<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
								{t("personalStatement")}
							</p>
						</Card>
					</div>
				</section>

				<footer className="mt-16 text-center text-gray-400 text-sm pb-8">
					<p>© {currentYear} Alejandro Nieto Luque</p>
				</footer>
			</main>
		</>
	);
}

function GithubProjectsSkeleton() {
	return (
		<div className="rounded-xl border border-gray-100 dark:border-gray-800 p-5">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{["a", "b", "c", "d", "e", "f"].map((id) => (
					<div
						key={`project-skeleton-${id}`}
						className="h-24 rounded-lg border border-gray-100 dark:border-gray-800 animate-pulse bg-gray-50 dark:bg-gray-900"
					/>
				))}
			</div>
		</div>
	);
}
