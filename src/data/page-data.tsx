import { CodeIcon } from "../components/icons/CodeIcon";
import { CloudIcon } from "../components/icons/CloudIcon";
import { GitHubIcon } from "../components/icons/GitHubIcon";
import { AndroidIcon } from "../components/icons/AndroidIcon";
import { AppleIcon } from "../components/icons/AppleIcon";
import { EmailIcon } from "../components/icons/EmailIcon";
import { LinkedInIcon } from "../components/icons/LinkedInIcon";
import { PageData } from "../types/page-data";

export const pageData: PageData = {
  connect: [
    {
      href: "mailto:alex.nieto0027@gmail.com",
      name: "Email",
      icon: <EmailIcon />,
    },
    {
      href: "https://www.linkedin.com/in/alejandro-nieto-luque/",
      name: "LinkedIn",
      icon: <LinkedInIcon />,
    },
    {
      href: "https://github.com/aleexnl",
      name: "GitHub",
      icon: <GitHubIcon />,
      hoverColor: { light: "gray-900", dark: "white" },
    },
  ],
  education: [
    {
      title: ".NET Training",
      institution: "Vueling University",
      period: "2022",
    },
    {
      title: "Diploma in Web Application Development (EQF Level 5)",
      institution: "Institut Esteve Terradas i Illa",
      period: "2019 - 2021",
    },
    {
      title: "Diploma in Microcomputer Systems and Networking (EQF Level 4)",
      institution: "Institut Daniel Blanxart",
      period: "2017 - 2019",
    },
  ],
  experience: [
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
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "Catalan", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
  skills: [
    { name: ".NET Development", icon: <CodeIcon /> },
    { name: "Azure DevOps", icon: <CloudIcon /> },
    { name: "GitHub", icon: <GitHubIcon /> },
    { name: "Android Development", icon: <AndroidIcon /> },
    { name: "iOS Development", icon: <AppleIcon /> },
  ],
};
