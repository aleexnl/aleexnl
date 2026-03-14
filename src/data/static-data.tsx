import { AndroidIcon } from "../components/icons/AndroidIcon";
import { AppleIcon } from "../components/icons/AppleIcon";
import { CloudIcon } from "../components/icons/CloudIcon";
import { CodeIcon } from "../components/icons/CodeIcon";
import { EmailIcon } from "../components/icons/EmailIcon";
import { GitHubIcon } from "../components/icons/GitHubIcon";
import { LinkedInIcon } from "../components/icons/LinkedInIcon";
import type { ConnectItem } from "../types/connect";
import type { Skill } from "../types/skills";

export const connectItems: ConnectItem[] = [
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
	},
];

export const skillItems: Skill[] = [
	{ name: ".NET Development", icon: <CodeIcon /> },
	{ name: "Azure DevOps", icon: <CloudIcon /> },
	{ name: "GitHub", icon: <GitHubIcon /> },
	{ name: "Android Development", icon: <AndroidIcon /> },
	{ name: "iOS Development", icon: <AppleIcon /> },
];
