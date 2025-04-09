// components/TemplateCategoryList.tsx

export const categories = [
  { key: "Minimal", label: "Minimal" },
  { key: "Professional", label: "Professional" },
  { key: "Modern", label: "Modern" },
  { key: "Executive", label: "Executive" },
];

export function TemplateCategoryList({
  onSelect,
}: {
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex gap-4 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelect(cat.key)}
          className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
