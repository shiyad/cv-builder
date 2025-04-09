// components/cv/new-cv-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { TemplateGallery } from "./template-gallery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function NewCVForm({
  templates,
  userId,
}: {
  templates: any[];
  userId: string;
}) {
  const [title, setTitle] = useState("My Professional CV");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleCreateCV = async () => {
    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    setIsLoading(true);

    try {
      // Create CV with selected template
      const { data: newCV, error } = await supabase
        .from("cvs")
        .insert({
          user_id: userId,
          template_id: selectedTemplate.id,
          title,
          content: selectedTemplate.structure,
        })
        .select()
        .single();

      if (error) throw error;
      if (!newCV) throw new Error("CV creation failed");

      toast.success("CV created successfully!");
      router.push(`/protected/cv/${newCV.id}/edit`);
    } catch (error: any) {
      console.error("CV creation error:", error);
      toast.error(error.message || "Failed to create CV");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New CV</h1>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter CV title"
              className="text-lg py-6"
            />
          </div>
          {selectedTemplate && (
            <Button
              onClick={handleCreateCV}
              disabled={isLoading}
              className="px-8 py-6 text-lg"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLoading ? "Creating..." : "Create CV"}
            </Button>
          )}
        </div>
      </div>

      <TemplateGallery
        templates={templates}
        onSelect={setSelectedTemplate}
        onCreateNew={() => {
          // Handle custom template creation
          setSelectedTemplate({
            id: null,
            structure: {
              header: {},
              experience: [],
              education: [],
              skills: [],
            },
          });
        }}
      />

      {selectedTemplate && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Selected Template Preview</h2>
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-bold">
              {selectedTemplate.name || "Custom Template"}
            </h3>
            {selectedTemplate.preview_url ? (
              <div className="relative w-full h-64 mt-4">
                <Image
                  src={selectedTemplate.preview_url}
                  alt="Template preview"
                  fill
                  className="object-contain border"
                />
              </div>
            ) : (
              <div className="mt-4 p-8 bg-gray-50 text-center text-gray-500">
                No preview available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
