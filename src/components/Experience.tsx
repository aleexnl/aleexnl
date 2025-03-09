import React from "react";
import { ExperienceItem } from "./ExperienceItem";

export const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Fullstack Developer",
      period: "May 2022 - Present",
      company: "Vueling, Viladecans",
      responsibilities: [
        "Developed and maintained REST API services using .NET Core and .NET Framework",
        "Built mobile applications with Xamarin framework",
        "Collaborated in agile teams following the SCRUM methodology",
      ],
    },
    {
      title: "Web Applications Developer",
      period: "October 2020 - May 2022",
      company: "tradEAsy, Cornellá de Llobregat, Barcelona",
      responsibilities: [
        "Developed frontend applications using React",
        "Built backend services with NodeJS (TypeScript, Sequelize & Express)",
        "Managed version control with Git and automated CI/CD using GitHub Actions",
        "Administered MySQL databases",
      ],
    },
    {
      title: "IT Services Technician",
      period: "November 2018 - May 2021",
      company: "Okatent, Olesa de Montserrat, Barcelona",
      responsibilities: [
        "Maintained and updated servers, services, and devices across departments",
        "Repaired damaged devices and implemented new technologies and software",
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={index}
            title={experience.title}
            period={experience.period}
            company={experience.company}
            responsibilities={experience.responsibilities}
          />
        ))}
      </div>
    </div>
  );
};
