import { User, Settings } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function DashboardHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {user.email?.split("@")[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
