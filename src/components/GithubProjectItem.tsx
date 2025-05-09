interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

interface GithubProjectItemProps {
  repo: GithubRepo;
}

export function GithubProjectItem({ repo }: GithubProjectItemProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {repo.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
          {repo.description}
        </p>
        <div className="flex items-center justify-between text-sm mt-4">
          {repo.language && (
            <span className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
              {repo.language}
            </span>
          )}
          <span className="flex items-center text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
            {repo.stargazers_count}
          </span>
        </div>
      </div>
    </a>
  );
}
