import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CVListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please sign in to view your CVs</div>;
  }

  const { data: cvs } = await supabase
    .from("user_cvs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My CVs</h1>
        <Link href="/dashboard/cv-editor">
          <Button>Create New CV</Button>
        </Link>
      </div>

      {cvs?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't created any CVs yet</p>
          <Link href="/dashboard/cv-editor">
            <Button>Create Your First CV</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs?.map((cv) => (
            <div
              key={cv.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{cv.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                Last edited: {new Date(cv.last_edited_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/protected/cv-editor?id=${cv.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
                <Link href={`/cv/${cv.slug}`} target="_blank">
                  <Button variant="secondary">View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
