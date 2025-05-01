import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-8 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-[#5D4037] hover:bg-[#8D6E63] text-white px-6 py-3 rounded transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
