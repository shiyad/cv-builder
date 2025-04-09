"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CVHeaderEditor } from "./sections/header-editor";
import { ExperienceEditor } from "./sections/experience-editor";
import { EducationEditor } from "./sections/education-editor";
import { SkillsEditor } from "./sections/skills-editor";
import { PreviewPane } from "./preview-pane";
import { DownloadButton } from "./download-button";

export function CVEditor({
  cv: initialCv,
  template,
}: {
  cv: any;
  template: any;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [cv, setCv] = useState(initialCv);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // Toggle for full-screen mode

  // Verify ownership on mount
  useEffect(() => {
    const verifyOwnership = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cv.user_id != user?.id) {
        router.push("/dashboard123");
      }
    };
    verifyOwnership();
  }, [cv.user_id, router, supabase]);

  // Auto-save debounced function
  const saveCV = useCallback(
    debounce(async (updatedCv: any) => {
      setIsSaving(true);
      try {
        const { error } = await supabase
          .from("cvs")
          .update({
            content: updatedCv.content,
            title: updatedCv.title,
            updated_at: new Date().toISOString(),
          })
          .eq("id", cv.id);

        if (error) throw error;

        setIsDirty(false);
        toast.success("Changes saved");
      } catch (error) {
        toast.error("Failed to save changes");
        console.error("Save error:", error);
      } finally {
        setIsSaving(false);
      }
    }, 1000),
    [cv.id, supabase]
  );

  // Handle content updates
  const handleChange = (section: string, value: any) => {
    setCv((prev: { content: any }) => {
      const updated = {
        ...prev,
        content: {
          ...prev.content,
          [section]: value,
        },
      };
      setIsDirty(true);
      saveCV(updated);
      return updated;
    });
  };

  // Handle title change
  const handleTitleChange = (title: string) => {
    setCv((prev: any) => {
      const updated = { ...prev, title };
      setIsDirty(true);
      saveCV(updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Editor Header */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={cv.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-2xl font-bold bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          />
          <div className="flex items-center gap-3">
            {isSaving && (
              <span className="text-sm text-gray-500">Saving...</span>
            )}
            {isDirty && !isSaving && (
              <span className="text-sm text-gray-500">Unsaved changes</span>
            )}
            <DownloadButton cv={cv} template={template} />
          </div>
        </div>

        {/* Split/Full View Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {isFullScreen ? "Switch to Split View" : "Switch to Full View"}
          </button>
        </div>

        {/* Main Editor Area */}
        <div
          className={`grid grid-cols-1 ${isFullScreen ? "lg:grid-cols-1" : "lg:grid-cols-3"} gap-8`}
        >
          {/* Editor Tabs */}
          {!isFullScreen && (
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <Tabs defaultValue="header" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="header">Header</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>

                <TabsContent value="header">
                  <CVHeaderEditor
                    data={cv.content.header || {}}
                    onChange={(value) => handleChange("header", value)}
                  />
                </TabsContent>

                <TabsContent value="experience">
                  <ExperienceEditor
                    data={cv.content.experience || []}
                    onChange={(value) => handleChange("experience", value)}
                  />
                </TabsContent>

                <TabsContent value="education">
                  <EducationEditor
                    data={cv.content.education || []}
                    onChange={(value) => handleChange("education", value)}
                  />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsEditor
                    data={cv.content.skills || []}
                    onChange={(value) => handleChange("skills", value)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Preview Pane */}
          <div
            className={`${isFullScreen ? "lg:col-span-1" : "lg:col-span-1"} overflow-x-auto`}
          >
            <div className={`min-w-[800px] pr-4`}>
              <PreviewPane cv={cv} template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
