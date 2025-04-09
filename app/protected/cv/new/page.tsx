// app/cv/new/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NewCVForm } from "@/components/cv/new-cv-form_old";

export default async function NewCVPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch available templates
  const { data: templates } = await supabase
    .from("templates")
    .select("*")
    .order("category", { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create New CV</h1>
            <p className="mt-2 text-sm text-gray-600">
              Select a template and start building your professional resume
            </p>
          </div>

          <NewCVForm templates={templates || []} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
