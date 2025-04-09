"use client";

import { useMemo } from "react";
import { TemplateRenderer } from "./template-renderer";

// PreviewPane component to show a preview of the generated template
export function PreviewPane({ cv, template }: { cv: any; template: any }) {
  const previewData = useMemo(
    () => ({
      ...cv.content,
      title: cv.title,
      updatedAt: new Date(cv.updated_at).toLocaleDateString(),
    }),
    [cv]
  );

  return (
    <div className="sticky top-4 h-[calc(100vh-32px)] overflow-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div id="cv-preview" className="scale-[0.8] origin-top">
          <TemplateRenderer data={previewData} />
        </div>
      </div>
    </div>
  );
}
