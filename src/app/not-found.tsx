import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors">
      <div className="text-center p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-900 max-w-md w-full">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">
          404
        </h1>

        <p className="text-xl mt-4 font-semibold">
          Page Not Found
        </p>

        <p className="text-gray-600 dark:text-gray-400 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
}
