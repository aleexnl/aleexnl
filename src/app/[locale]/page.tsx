import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { Card } from "../../components/Card";
import { Connect } from "../../components/Connect";
import { Education } from "../../components/Education";
import { Experience } from "../../components/Experience";
import { GithubProjects } from "../../components/GithubProjects";
import { Languages } from "../../components/Languages";
import { LocaleSwitcher } from "../../components/LocaleSwitcher";
import { Skills } from "../../components/Skills";
import { connectItems, skillItems } from "../../data/static-data";

export const revalidate = 86400;

const GithubRepoSchema = z.object({
	name: z.string(),
	description: z.string().nullable().default(""),
	html_url: z.string().url(),
	language: z.string().nullable().default(""),
	stargazers_count: z.number(),
	fork: z.boolean(),
});

async function getGithubRepos(): Promise<z.infer<typeof GithubRepoSchema>[]> {
	try {
		const res = await fetch(
			"https://api.github.com/users/aleexnl/repos?sort=stars&per_page=30",
			{
				next: { revalidate: 86400 },
				headers: { Accept: "application/vnd.github.v3+json" },
			},
		);
		if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
		const data: unknown = await res.json();
		const parsed = z.array(GithubRepoSchema).safeParse(data);
		if (!parsed.success) {
			console.error("GitHub API response validation failed:", parsed.error);
			return [];
		}
		return parsed.data.filter((repo) => !repo.fork).slice(0, 6);
	} catch (error) {
		console.error("Error fetching GitHub repos:", error);
		return [];
	}
}

async function getLocaleData(locale: string) {
	const messages = (await import(`../../../messages/${locale}.json`)).default;
	return {
		experience: messages.experience.items as Array<{
			title: string;
			period: string;
			company: string;
			responsibilities: string[];
		}>,
		education: messages.education.items as Array<{
			title: string;
			institution: string;
			period: string;
		}>,
		languages: messages.languages.items as Array<{
			name: string;
			level: string;
		}>,
	};
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const [repos, t, tSections, localeData] = await Promise.all([
		getGithubRepos(),
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
		url: `https://aleexnl.vercel.app/${locale}`,
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
						<LocaleSwitcher />
					</div>
					<div className="mt-8">
						<GithubProjects
							repos={repos}
							title={tSections("featuredProjects")}
							emptyLabel={tSections("noProjects")}
						/>
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
