import React from "react";

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        {icon && <span className="text-blue-500">{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
};
