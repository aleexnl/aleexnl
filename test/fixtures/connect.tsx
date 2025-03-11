import { EmailIcon } from "@/components/icons/EmailIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { ConnectItem } from "@/types/connect";

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
    hoverColor: { light: "gray-900", dark: "white" },
  },
];
