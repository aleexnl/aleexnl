"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { GithubProjectItem } from "./GithubProjectItem";

interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

export function GithubProjects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/users/aleexnl/repos?sort=stars&per_page=6")
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch(console.error);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % repos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + repos.length) % repos.length);
  };

  if (repos.length === 0) return null;

  return (
    <Card
      title="Featured Projects"
      icon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          ></path>
        </svg>
      }
    >
      <div className="relative">
        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-900 p-4">
          <div className="relative w-full" style={{ height: "150px" }}>
            {repos.map((repo, index) => (
              <div
                key={repo.name}
                className={`absolute top-0 left-0 w-full transition-all duration-300 ease-in-out`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                  opacity: index === currentIndex ? 1 : 0,
                }}
              >
                <GithubProjectItem repo={repo} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label="Previous project"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label="Next project"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </Card>
  );
}
