import type React from "react";
import type { Skill } from "../types/skills";
import { Card } from "./Card";
import { SkillsIcon } from "./icons/SkillsIcon";
import { SkillItem } from "./SkillItem";

interface SkillsProps {
	items: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ items }) => {
	return (
		<Card title="Skills" icon={<SkillsIcon />}>
			<div className="flex flex-wrap gap-2">
				{items.map((skill) => (
					<SkillItem key={skill.name} icon={skill.icon}>
						{skill.name}
					</SkillItem>
				))}
			</div>
		</Card>
	);
};
