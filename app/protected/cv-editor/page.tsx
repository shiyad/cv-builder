// app/protected/cv-editor/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import CVTemplatesPage from "@/components/cv-templates";
import React, { Suspense } from "react";

// This is the Suspense boundary wrapping the component
export default function CVEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CVEditor />
    </Suspense>
  );
}

function CVEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCV = async () => {
      setLoading(true);
      try {
        const cvId = searchParams.get("id");

        // Get current session
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          throw new Error("You must be logged in to edit CVs");
        }

        if (cvId) {
          // Editing existing CV
          const { data, error } = await supabase
            .from("user_cvs")
            .select("*")
            .eq("id", cvId)
            .eq("user_id", user.id)
            .single();

          if (error) throw error;
          if (!data) throw new Error("CV not found");

          setInitialData({
            ...data,
            // Ensure we have all required fields
            cv_data: {
              ...data.cv_data,
              is_public: data.is_public,
            },
          });
        } else {
          // Creating new CV with default template
          const { data: templates } = await supabase
            .from("cv_templates")
            .select("id")
            .limit(1);

          setInitialData({
            title: "My New CV",
            cv_data: {
              contact_information: {
                first_name: "",
                last_name: "",
                email: user.email || "",
              },
              is_public: false,
            },
            template_id: templates?.[0]?.id || null,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [searchParams]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        <p>{error}</p>
        <button
          onClick={() => router.push("/protected/cvs")}
          className="mt-2 px-4 py-2 bg-gray-200 rounded"
        >
          Back to My CVs
        </button>
      </div>
    );
  }

  return (
    <CVTemplatesPage
      initialData={initialData}
      onCancel={() => router.push("/protected/cvs")}
    />
  );
}
