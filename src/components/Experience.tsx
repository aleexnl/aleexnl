import type React from "react";
import type { Experience as ExperienceType } from "../types/experience";
import { Card } from "./Card";
import { ExperienceItem } from "./ExperienceItem";
import { ExperienceIcon } from "./icons/ExperienceIcon";

interface ExperienceProps {
	items: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ items }) => {
	return (
		<Card title="Experience" icon={<ExperienceIcon />}>
			<div className="space-y-8">
				{items.map((experience) => (
					<ExperienceItem key={experience.title} {...experience} />
				))}
			</div>
		</Card>
	);
};
