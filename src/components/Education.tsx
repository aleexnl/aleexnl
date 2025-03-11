import React from "react";
import { EducationItem } from "./EducationItem";
import { Card } from "./Card";
import { EducationIcon } from "./icons/EducationIcon";
import { Education as EducationType } from "../types/education";

interface EducationProps {
  items: EducationType[];
}

export function Education({ items }: EducationProps) {
  return (
    <Card title="Education" icon={<EducationIcon />}>
      <div className="space-y-8">
        {items.map((item, index) => (
          <EducationItem key={index} {...item} />
        ))}
      </div>
    </Card>
  );
}
