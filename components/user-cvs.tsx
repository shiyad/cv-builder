"use client";

import { useEffect, useState, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import { FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type CV = {
  id: string;
  title: string;
  updated_at: string;
};

export function UserCVs({ userId }: { userId: string }) {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchCVs() {
      const { data, error } = await supabase
        .from("user_cvs")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })
        .limit(3);

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
    const { error } = await supabase.from("user_cvs").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete CV:", error);
    } else {
      setCvs((prev) => prev.filter((cv) => cv.id !== id));
    }

    setDeletingId(null);
  };

  if (loading) {
    return <p className="text-gray-500">Loading your CVs...</p>;
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Your Recent CVs</h2>
        <Link href="/cvs" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cvs.length > 0 ? (
          cvs.map((cv) => (
            <div
              key={cv.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900">
                {cv.title || `CV ${cv.id.slice(0, 4)}`}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Last updated{" "}
                {formatDistanceToNow(new Date(cv.updated_at), {
                  addSuffix: true,
                })}
              </p>
              <div className="mt-3 flex space-x-2">
                <Link
                  href={`/protected/cv-editor?id=${cv.id}`} // Updated to use cv-editor
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                <Link
                  href={`/cv/${cv.id}/download`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Download
                </Link>
                <button
                  onClick={() => handleDelete(cv.id)}
                  disabled={deletingId === cv.id}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {deletingId === cv.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">You haven't created any CVs yet</p>
            <Link
              href="/cv/new"
              className="mt-2 inline-block text-blue-600 hover:text-blue-800"
            >
              Create your first CV
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
