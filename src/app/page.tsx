import Link from "next/link";
import { Suspense } from "react";
import { SkillsSection } from "../components/SkillsSection";
import { SkillsLoading } from "../components/SkillsLoading";
import { Education } from "../components/Education";

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
              Frontend Developer
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
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Experience and Education */}
          <div className="md:col-span-2 space-y-12">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Experience
              </h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-blue-100 dark:border-blue-900">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">
                      Frontend Developer
                    </h3>
                    <span className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                      2021 - Present
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic mt-1">
                    Company Name
                  </p>
                  <ul className="list-none mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Developed responsive web applications using React and
                      Next.js
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Implemented UI components using Tailwind CSS
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Collaborated with designers to create user-friendly
                      interfaces
                    </li>
                  </ul>
                </div>

                <div className="relative pl-8 border-l-2 border-blue-100 dark:border-blue-900">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">
                      Web Developer Intern
                    </h3>
                    <span className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                      2020 - 2021
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic mt-1">
                    Internship Company
                  </p>
                  <ul className="list-none mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Assisted in building website features using HTML, CSS, and
                      JavaScript
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Learned responsive design techniques and modern frontend
                      frameworks
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Education />
          </div>

          {/* Right Column: Skills, Languages, Personal Statement */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
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
                Skills
              </h2>
              <Suspense fallback={<SkillsLoading />}>
                <SkillsSection />
              </Suspense>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  ></path>
                </svg>
                Languages
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center justify-between">
                  <span>Spanish</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Native
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Catalan</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Native
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>English</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Fluent
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
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
                Personal Statement
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Motivated and adaptable professional with a strong willingness
                to learn and take on new challenges. Quick to adjust to changing
                environments and committed to teamwork as a key factor in
                achieving goals, fostering growth, and learning from others.
              </p>
            </div>
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
