// app/protected/dashboard/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { WelcomeBanner } from "@/components/welcome-banner";
import { DashboardStats } from "@/components/dashboard-stats";
import { ActivityFeed } from "@/components/activity-feed";
import { QuickActions } from "@/components/quick-actions";
import { UserCVs } from "@/components/user-cvs";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/sign-in");

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <WelcomeBanner />
        <DashboardStats userId={user.id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <ActivityFeed userId={user.id} />
          </div>

          <QuickActions />
        </div>

        <UserCVs userId={user.id} />
      </main>
    </div>
  );
}
