export default function Loading() {
  return (
    <div className="w-full p-4 font-sans animate-pulse">
      <nav className="flex items-center justify-between p-4 mb-6">
        <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="hidden md:flex gap-6">
          <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-4">
              <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 mx-auto" />
            </div>
            <div className="h-48 bg-neutral-200 dark:bg-neutral-700" />
            <div className="px-4 py-3 space-y-2">
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-4/5" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/5" />
            </div>
            <div className="py-3 flex justify-center">
              <div className="h-10 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
