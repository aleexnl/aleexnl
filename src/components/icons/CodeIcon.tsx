import React from "react";

interface CodeIconProps {
  className?: string;
}

export function CodeIcon({ className = "w-3.5 h-3.5" }: CodeIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      ></path>
    </svg>
  );
}
