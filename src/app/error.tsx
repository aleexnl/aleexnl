"use client";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please try again later
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
