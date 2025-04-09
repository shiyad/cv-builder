// components/cv/template-gallery.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function TemplateGallery({
  templates,
  onSelect,
  onCreateNew,
}: {
  templates: any[];
  onSelect: (template: any) => void;
  onCreateNew: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("professional");

  // Group templates by category
  const categorizedTemplates = templates.reduce((acc, template) => {
    const category = template.category || "professional";
    if (!acc[category]) acc[category] = [];
    acc[category].push(template);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>

        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
            <TabsTrigger value="executive">Executive</TabsTrigger>
          </TabsList>

          {Object.entries(categorizedTemplates).map(([category, templates]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(templates as any[]).map((template) => (
                  <div
                    key={template.id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onSelect(template)}
                  >
                    <div className="relative h-48 bg-gray-100">
                      {template.thumbnail_url ? (
                        <Image
                          src={template.thumbnail_url}
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No preview available
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button onClick={onCreateNew} variant="outline">
          Create Custom Template
        </Button>
      </div>
    </div>
  );
}
