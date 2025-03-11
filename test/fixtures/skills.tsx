import { AndroidIcon } from "@/components/icons/AndroidIcon";
import { AppleIcon } from "@/components/icons/AppleIcon";
import { CloudIcon } from "@/components/icons/CloudIcon";
import { CodeIcon } from "@/components/icons/CodeIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Skill } from "@/types/skills";

export const skills: Skill[] = [
  { name: ".NET Development", icon: <CodeIcon /> },
  { name: "Azure DevOps", icon: <CloudIcon /> },
  { name: "GitHub", icon: <GitHubIcon /> },
  { name: "Android Development", icon: <AndroidIcon /> },
  { name: "iOS Development", icon: <AppleIcon /> },
];
