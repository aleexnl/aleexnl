import React from "react";
import { ExperienceItem } from "./ExperienceItem";
import { Card } from "./Card";
import { ExperienceIcon } from "./icons/ExperienceIcon";
import { Experience as ExperienceType } from "../types/experience";

interface ExperienceProps {
  items: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ items }) => {
  return (
    <Card title="Experience" icon={<ExperienceIcon />}>
      <div className="space-y-8">
        {items.map((experience, index) => (
          <ExperienceItem key={index} {...experience} />
        ))}
      </div>
    </Card>
  );
};
