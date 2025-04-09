import { createClient } from "@/utils/supabase/server";
import { FileText, LayoutTemplate, Download } from "lucide-react";
import { StatCard } from "./stat-card";

export async function DashboardStats({ userId }: { userId: string }) {
  const supabase = await createClient();

  // Fetch all stats in parallel
  const [
    { count: cvCount },
    { count: templateCount },
    { count: downloadCount },
    { data: subscription },
  ] = await Promise.all([
    supabase
      .from("cvs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("user_templates")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("downloads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .single(),
  ]);

  const stats = [
    {
      name: "CVs Created",
      value: cvCount || 0,
      icon: FileText,
      change: "+12%", // You would calculate this from your data
    },
    {
      name: "Templates Available",
      value: templateCount || 0,
      icon: LayoutTemplate,
      change: subscription ? "Pro" : "Basic",
    },
    {
      name: "Downloads",
      value: downloadCount || 0,
      icon: Download,
      change: "+5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
