// app/protected/cv-templates/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
