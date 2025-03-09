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

  useEffect(() => {
    fetch("https://api.github.com/users/aleexnl/repos?sort=stars&per_page=6")
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch(console.error);
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <GithubProjectItem key={repo.name} repo={repo} />
        ))}
      </div>
    </Card>
  );
}
