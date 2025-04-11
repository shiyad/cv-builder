"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/cv/template-card";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-");
}

export function NewCVForm({
  templates,
  userId,
}: {
  templates: any[];
  userId: string;
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [title, setTitle] = useState("My Professional CV");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const generateUniqueSlug = async (base: string): Promise<string> => {
    let slug = slugify(base);
    let suffix = 1;
    let isUnique = false;

    while (!isUnique) {
      const { data, error } = await supabase
        .from("cvs")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        isUnique = true;
      } else {
        slug = `${slugify(base)}-${suffix}`;
        suffix++;
      }
    }

    return slug;
  };

  const handleSubmit = async () => {
    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    setIsLoading(true);

    try {
      // Fetch template structure
      const { data: template, error: templateError } = await supabase
        .from("templates")
        .select("structure")
        .eq("id", selectedTemplate)
        .single();

      if (templateError || !template) {
        throw templateError || new Error("Template not found");
      }

      const structure = template.structure;

      // Generate unique slug
      const slug = await generateUniqueSlug(title);

      // Create new CV
      const { data: newCV, error: createError } = await supabase
        .from("cvs")
        .insert({
          user_id: userId,
          template_id: selectedTemplate,
          title,
          slug,
          content: structure,
        })
        .select()
        .single();

      if (createError) throw createError;
      if (!newCV) throw new Error("Failed to create CV");

      // Create CV sections based on template structure
      const allowedSectionTypes = [
        "header",
        "experience",
        "education",
        "skills",
      ];

      const sectionsToInsert = Object.entries(structure)
        .filter(([key]) => allowedSectionTypes.includes(key)) // ✅ filter only allowed types
        .map(([key, value], index) => ({
          cv_id: newCV.id,
          section_type: key,
          content: value,
          sort_order: index + 1,
        }));

      const { error: sectionsError } = await supabase
        .from("cv_sections")
        .insert(sectionsToInsert);

      if (sectionsError) throw sectionsError;

      toast.success("CV created successfully!");
      router.push(`/protected/cv/${newCV.id}/edit`);
    } catch (error: any) {
      console.error("Error creating CV:", error);
      toast.error(error.message || "Failed to create CV. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CV Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Select a Template
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onSelect={() => setSelectedTemplate(template.id)}
              />
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!selectedTemplate || isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Creating...
              </span>
            ) : (
              "Create CV"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
