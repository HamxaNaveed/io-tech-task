"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-8 text-lg">An error occurred while loading this page.</p>
      <button
        onClick={reset}
        className="bg-[#5D4037] hover:bg-[#8D6E63] text-white px-6 py-3 rounded transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
