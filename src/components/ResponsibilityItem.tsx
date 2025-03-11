import React from "react";

interface ResponsibilityItemProps {
  responsibility: string;
}

export const ResponsibilityItem: React.FC<ResponsibilityItemProps> = ({
  responsibility,
}) => {
  return (
    <li className="flex items-start">
      <span className="text-blue-500 mr-2">•</span>
      {responsibility}
    </li>
  );
};
