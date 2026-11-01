import { getTranslations } from "next-intl/server";
import type { EducationItem, LanguageItem } from "../schemas/locale";
import { Education } from "./Education";

export async function About({
	education,
	languages,
	statement,
}: {
	education: EducationItem[];
	languages: LanguageItem[];
	statement: string;
}) {
	const t = await getTranslations("portfolio.about");
	return (
		<section
			className="shell section-space about-section"
			id="about"
			aria-labelledby="about-heading"
		>
			<div className="about-intro">
				<h2 id="about-heading">{t("title")}</h2>
				<div>
					<p className="about-lead">{t("intro")}</p>
					<p>{statement}</p>
				</div>
			</div>
			<div className="about-foundations">
				<Education items={education} title={t("education")} />
				<div className="languages">
					<h3>{t("languages")}</h3>
					<dl>
						{languages.map((language) => (
							<div key={language.name}>
								<dt>{language.name}</dt>
								<dd>{language.level}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
}
