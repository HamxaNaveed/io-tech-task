import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Home{" "}
        </Link>
      </div>
    </div>
  );
}
