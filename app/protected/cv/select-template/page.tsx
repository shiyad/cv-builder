// app/cv/select-template/page.tsx
"use client";
import { useState } from "react";
import { TemplateCategoryList } from "@/components/TemplateCategoryList";
import { TemplateGallery } from "@/components/TemplateGallery";

export default function SelectTemplatePage() {
  const [selectedCategory, setSelectedCategory] = useState("corporate");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Choose a Template</h1>
      <TemplateCategoryList onSelect={setSelectedCategory} />
      <TemplateGallery category={selectedCategory} />
    </div>
  );
}
