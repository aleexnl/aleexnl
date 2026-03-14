import { getTranslations } from "next-intl/server";
import type { Experience as ExperienceType } from "../types/experience";
import { Card } from "./Card";
import { ExperienceItem } from "./ExperienceItem";
import { ExperienceIcon } from "./icons/ExperienceIcon";

interface ExperienceProps {
	items: ExperienceType[];
}

export async function Experience({ items }: ExperienceProps) {
	const t = await getTranslations("experience");
	const tSections = await getTranslations("sections");

	return (
		<Card title={tSections("experience")} icon={<ExperienceIcon />}>
			<div className="space-y-8">
				{items.map((experience) => (
					<ExperienceItem
						key={experience.title}
						{...experience}
						expandLabel={t("expandLabel")}
						collapseLabel={t("collapseLabel")}
					/>
				))}
			</div>
		</Card>
	);
}
