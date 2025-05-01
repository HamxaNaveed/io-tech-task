export default function ServiceLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="w-full h-[400px] bg-gray-300 animate-pulse" />

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="w-20 h-6 bg-gray-300 animate-pulse mb-6" />

        <div className="w-3/4 h-10 bg-gray-300 animate-pulse mb-6" />

        <div className="space-y-4 mb-8">
          <div className="w-full h-4 bg-gray-300 animate-pulse" />
          <div className="w-full h-4 bg-gray-300 animate-pulse" />
          <div className="w-3/4 h-4 bg-gray-300 animate-pulse" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse" />
        </div>

        <div className="mb-12">
          <div className="w-40 h-8 bg-gray-300 animate-pulse mb-4" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="w-full h-6 bg-gray-300 animate-pulse mb-4" />
                <div className="w-3/4 h-4 bg-gray-300 animate-pulse" />
                <div className="w-1/2 h-4 bg-gray-300 animate-pulse mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
