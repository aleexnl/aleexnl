import Link from "next/link";

interface ConnectItemProps {
  href: string;
  icon: React.ReactNode;
  name: string;
  hoverColor?: {
    light: string;
    dark: string;
  };
}

export const ConnectItem = ({
  href,
  icon,
  name,
  hoverColor = { light: "blue-600", dark: "blue-400" },
}: ConnectItemProps) => {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-${hoverColor.light} dark:hover:text-${hoverColor.dark} transition-colors`}
      >
        {icon}
        {name}
      </Link>
    </li>
  );
};
