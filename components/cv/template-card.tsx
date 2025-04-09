// components/cv/template-card.tsx
"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: any;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-200"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
      <div className="aspect-[1/1.414] bg-gray-50 relative">
        {" "}
        {/* Standard paper ratio */}
        {template.preview_url ? (
          <Image
            src={template.preview_url}
            alt={template.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-center p-4">
              <p className="font-medium">{template.name}</p>
              <p className="text-sm mt-1">{template.category}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 bg-white border-t border-gray-200">
        <h3 className="font-medium text-gray-900">{template.name}</h3>
        <p className="text-sm text-gray-500">{template.category}</p>
        {template.is_premium && (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
            Premium
          </span>
        )}
      </div>
    </div>
  );
}
