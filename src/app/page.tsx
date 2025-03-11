import { Skills } from "../components/Skills";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Languages } from "../components/Languages";
import { Connect } from "../components/Connect";
import { Card } from "../components/Card";
import { GithubProjects } from "../components/GithubProjects";
import { pageData } from "../data/page-data";
import type { GithubRepo } from "../components/GithubProjects";

// Mark page as static
export const revalidate = 86400; // Revalidate once per day

async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/aleexnl/repos?sort=stars&per_page=6",
      {
        next: { revalidate: 86400 }, // Revalidate once per day
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export default async function Home() {
  const repos = await getGithubRepos();
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header Section with Hero */}
        <header className="mb-16 md:mb-24 text-center relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(56,189,248,0.15),rgba(0,0,0,0))] dark:bg-[radial-gradient(45%_25%_at_50%_50%,rgba(56,189,248,0.1),rgba(0,0,0,0))]"></div>

          <div className="py-10 md:py-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Alejandro Nieto Luque
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Software Developer
            </p>
          </div>

          {/* Add Github Projects - Now rendering server-side */}
          <div className="mt-8">
            <GithubProjects repos={repos} />
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Experience and Education */}
          <div className="md:col-span-2 space-y-12">
            <Experience items={pageData.experience} />
            <Education items={pageData.education} />
          </div>

          {/* Right Column: Skills, Languages, Personal Statement */}
          <div className="space-y-8">
            <Connect items={pageData.connect} />
            <Skills items={pageData.skills} />
            <Languages items={pageData.languages} />

            <Card title="Personal Statement">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Motivated and adaptable professional with a strong willingness
                to learn and take on new challenges. Quick to adjust to changing
                environments and committed to teamwork as a key factor in
                achieving goals, fostering growth, and learning from others.
              </p>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm pb-8">
          <p>© {currentYear} Alejandro Nieto Luque &bull; Portfolio</p>
        </footer>
      </div>
    </main>
  );
}
