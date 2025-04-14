// components/user-cvs.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  FileText,
  Trash2,
  Edit3,
  Download as DownloadIcon,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type CV = {
  id: string;
  title: string;
  updated_at: string;
  template_id?: string;
};

export function UserCVs({ userId }: { userId: string }) {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCVs() {
      const { data, error } = await supabase
        .from("user_cvs")
        .select("id, title, updated_at, template_id")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })
        .limit(4);

      if (!error && data) {
        setCvs(data);
      } else {
        console.error("Error loading CVs:", error);
      }
      setLoading(false);
    }

    fetchCVs();
  }, [userId, supabase]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    debugger;
    const { error } = await supabase.from("user_cvs").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete CV:", error);
    } else {
      setCvs((prev) => prev.filter((cv) => cv.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <FileText className="h-5 w-5" />
            </span>
            Your Recent CVs
          </h2>
          <Link
            href="/cvs"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : cvs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gray-50 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">
                    {cv.title || `CV ${cv.id.slice(0, 4)}`}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated{" "}
                    {formatDistanceToNow(new Date(cv.updated_at), {
                      addSuffix: true,
                    })}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/protected/cv-editor?id=${cv.id}`}
                      className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center"
                    >
                      <Edit3 className="h-3 w-3 mr-1.5" />
                      Edit
                    </Link>
                    {/* <Link
                      href={`/cv/${cv.id}/download`}
                      className="text-xs px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors flex items-center"
                    >
                      <DownloadIcon className="h-3 w-3 mr-1.5" />
                      Download
                    </Link> */}
                    <button
                      onClick={() => handleDelete(cv.id)}
                      disabled={deletingId === cv.id}
                      className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center"
                    >
                      <Trash2 className="h-3 w-3 mr-1.5" />
                      {deletingId === cv.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No CVs Found
            </h3>
            <p className="text-gray-500 mb-4">
              You haven't created any CVs yet. Get started by creating your
              first professional resume.
            </p>
            <Link href="/protected/cv-editor">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create New CV
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
