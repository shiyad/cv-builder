// app/cv/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
// import { CVEditor } from "@/components/cv/cv-editor";

export default function CVEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [cv, setCV] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCV = async () => {
      const { data, error } = await supabase
        .from("cvs")
        .select("*, template: templates(*)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching CV:", error);
        router.push("/dashboard");
        return;
      }

      setCV(data);
      setIsLoading(false);
    };

    fetchCV();
  }, [id, router, supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Loading your CV...</p>
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>CV not found</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <CVEditor cv={cv} template={cv.template} /> */}
    </div>
  );
}
