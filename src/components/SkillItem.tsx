import React from "react";

interface SkillProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function SkillItem({ icon, children }: SkillProps) {
  return (
    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium">
      {icon}
      {children}
    </span>
  );
}
