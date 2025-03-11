import React from "react";
import { SkillItem } from "./SkillItem";
import { Card } from "./Card";
import { SkillsIcon } from "./icons/SkillsIcon";
import { Skill } from "../types/skills";

interface SkillsProps {
  items: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ items }) => {
  return (
    <Card title="Skills" icon={<SkillsIcon />}>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, index) => (
          <SkillItem key={index} icon={skill.icon}>
            {skill.name}
          </SkillItem>
        ))}
      </div>
    </Card>
  );
};
