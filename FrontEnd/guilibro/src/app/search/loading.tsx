export default function Loading() {
    return (
      <div className="px-6 py-8">
        <div className="mb-6">
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mt-4"></div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-lg overflow-hidden animate-pulse">
              <div className="h-64 bg-gray-800"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-3 bg-gray-800 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  