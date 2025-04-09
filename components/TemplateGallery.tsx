// components/TemplateGallery.tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Template = {
  id: string;
  name: string;
  thumbnail_url: string | null;
  description: string | null;
};

export function TemplateGallery({ category }: { category: string }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("templates")
        .select("id, name, thumbnail_url, description")
        .eq("category", category);

      if (!error) setTemplates(data || []);
      setLoading(false);
    };

    fetchTemplates();
  }, [category]);

  if (loading) return <p>Loading templates...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {templates.map((tpl) => (
        <div
          key={tpl.id}
          className="border rounded p-3 hover:shadow transition"
        >
          <img
            src={tpl.thumbnail_url ?? "/placeholder.png"}
            alt={tpl.name}
            className="rounded mb-2 object-cover w-full h-40"
          />
          <h4 className="font-medium">{tpl.name}</h4>
          <p className="text-sm text-gray-500">
            {tpl.description ?? "No description."}
          </p>
          <a
            href={`/cv/new?template=${tpl.id}`}
            className="text-blue-600 text-sm mt-2 inline-block"
          >
            Use Template
          </a>
        </div>
      ))}
    </div>
  );
}
