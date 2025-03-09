import React from "react";
import { ExperienceItem } from "./ExperienceItem";

export const Experience: React.FC = () => {
  const experiences = [
    {
      title: "Frontend Developer",
      period: "2021 - Present",
      company: "Company Name",
      responsibilities: [
        "Developed responsive web applications using React and Next.js",
        "Implemented UI components using Tailwind CSS",
        "Collaborated with designers to create user-friendly interfaces",
      ],
    },
    {
      title: "Web Developer Intern",
      period: "2020 - 2021",
      company: "Internship Company",
      responsibilities: [
        "Assisted in building website features using HTML, CSS, and JavaScript",
        "Learned responsive design techniques and modern frontend frameworks",
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
