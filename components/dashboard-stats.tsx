// components/dashboard-stats.tsx
import { createClient } from "@/utils/supabase/server";
import { FileText, LayoutTemplate, Download, Star, Zap } from "lucide-react";

export async function DashboardStats({ userId }: { userId: string }) {
  const supabase = await createClient();

  const [
    { count: cvCount },
    { count: templateCount },
    { count: downloadCount },
    { data: subscription },
  ] = await Promise.all([
    supabase
      .from("user_cvs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("cv_templates")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("downloads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("user_subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .single(),
  ]);

  const stats = [
    {
      name: "Your CVs",
      value: cvCount || 0,
      icon: FileText,
      change: "+12%",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Templates",
      value: templateCount || 0,
      icon: LayoutTemplate,
      change: subscription ? "Pro" : "Free",
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Downloads",
      value: downloadCount || 0,
      icon: Download,
      change: "+5 this week",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
        >
          <div className="flex items-center justify-between">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6" />
            </div>
            {stat.change && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {stat.change}
              </span>
            )}
          </div>
          <h3 className="text-gray-500 text-sm mt-4">{stat.name}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
