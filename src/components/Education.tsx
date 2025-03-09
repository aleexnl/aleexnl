import React from "react";
import { EducationItem } from "./EducationItem";
import { Card } from "./Card";

export function Education() {
  const icon = (
    <svg
      className="w-5 h-5 text-blue-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z"></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l9-5-9-5-9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      ></path>
    </svg>
  );

  return (
    <Card title="Education" icon={icon}>
      <div className="space-y-8">
        <EducationItem
          title=".NET Training"
          institution="Vueling University"
          period="2022"
        />
        <EducationItem
          title="Diploma in Web Application Development (EQF Level 5)"
          institution="Institut Esteve Terradas i Illa"
          period="2019 - 2021"
        />
        <EducationItem
          title="Diploma in Microcomputer Systems and Networking (EQF Level 4)"
          institution="Institut Daniel Blanxart"
          period="2017 - 2019"
        />
      </div>
    </Card>
  );
}
