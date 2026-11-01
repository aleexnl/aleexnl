import { getTranslations } from "next-intl/server";
import type { Experience as ExperienceType } from "../types/experience";
import { ExperienceItem } from "./ExperienceItem";

export async function Experience({ items }: { items: ExperienceType[] }) {
	const t = await getTranslations("portfolio");
	return (
		<>
			<div className="section-heading">
				<div>
					<p className="section-kicker">{t("nav.experience")}</p>
					<h2 id="experience-heading">{t("career.title")}</h2>
				</div>
				<p>{t("career.intro")}</p>
			</div>
			<div className="career-list">
				{items.map((item, index) => (
					<ExperienceItem
						key={item.company}
						{...item}
						current={index === 0 ? t("career.current") : undefined}
					/>
				))}
			</div>
		</>
	);
}
