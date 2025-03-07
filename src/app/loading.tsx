export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-8 w-full max-w-5xl px-4">
        <div className="animate-pulse h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="animate-pulse h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          </div>
          <div className="space-y-8">
            <div className="animate-pulse h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            <div className="animate-pulse h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
