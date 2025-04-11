// app/protected/dashboard/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { WelcomeBanner } from "@/components/welcome-banner";
import { DashboardStats } from "@/components/dashboard-stats";
import { ActivityFeed } from "@/components/activity-feed";
import { QuickActions } from "@/components/quick-actions";
import { UserCVs } from "@/components/user-cvs";
import { FileText } from "lucide-react";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/sign-in");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <WelcomeBanner />

          <DashboardStats userId={user.id} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <FileText className="h-5 w-5" />
                    </span>
                    Recent Activity
                  </h2>
                </div>
                <ActivityFeed userId={user.id} />
              </div>

              <UserCVs userId={user.id} />
            </div>

            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}
