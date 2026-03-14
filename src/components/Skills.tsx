import type React from "react";
import type { Skill } from "../types/skills";
import { Card } from "./Card";
import { SkillsIcon } from "./icons/SkillsIcon";
import { SkillItem } from "./SkillItem";

interface SkillsProps {
	items: Skill[];
	title: string;
}

export const Skills: React.FC<SkillsProps> = ({ items, title }) => {
	return (
		<Card title={title} icon={<SkillsIcon />}>
			<div className="flex flex-wrap gap-3">
				{items.map((skill) => (
					<SkillItem key={skill.name} icon={skill.icon}>
						{skill.name}
					</SkillItem>
				))}
			</div>
		</Card>
	);
};
