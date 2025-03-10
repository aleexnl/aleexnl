import Link from "next/link";
import { Suspense } from "react";
import { SkillsSection } from "../components/SkillsSection";
import { SkillsLoading } from "../components/SkillsLoading";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Languages } from "../components/Languages";
import { Connect } from "../components/Connect";
import { Card } from "../components/Card";
import { GithubProjects } from "../components/GithubProjects";

// Mark page as static
export const revalidate = 86400; // Revalidate once per day

export default function Home() {
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
            <Link
              href="mailto:alex.nieto0027@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              alex.nieto0027@gmail.com
            </Link>
          </div>

          {/* Add Github Projects - Now rendering server-side */}
          <div className="mt-8">
              <GithubProjects />
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Experience and Education */}
          <div className="md:col-span-2 space-y-12">
            <Experience />
            <Education />
          </div>

          {/* Right Column: Skills, Languages, Personal Statement */}
          <div className="space-y-8">
            <Connect />
            <Card
              title="Skills"
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              }
            >
              <Suspense fallback={<SkillsLoading />}>
                <SkillsSection />
              </Suspense>
            </Card>

            <Languages />

            <Card
              title="Personal Statement"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              }
            >
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
          <p>
            © {new Date().getFullYear()} Alejandro Nieto Luque &bull; Portfolio
          </p>
        </footer>
      </div>
    </main>
  );
}
