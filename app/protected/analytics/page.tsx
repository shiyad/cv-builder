"use client";

import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

type ViewRecord = {
  id: string;
  link_id: string;
  viewed_at: string;
  viewer_ip: string | null;
  viewer_user_agent: string | null;
  referrer: string | null;
  country: string | null;
  device_type: string | null;
  is_bot: boolean;
};

type AnalyticsStats = {
  views: ViewRecord[];
  referrers: { name: string; value: number }[];
  devices: { name: string; value: number }[];
  countries: { name: string; value: number }[];
  totalViews: number;
  uniqueVisitors: number;
};

export default function AnalyticsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const checkPremiumStatus = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/sign-in");
      return false;
    }

    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing"])
      .single();

    if (!subscription) {
      toast({
        title: "Premium Feature",
        description: "Advanced analytics are only available for premium users.",
        variant: "default",
      });
      router.push("/protected");
      return false;
    }

    setIsPremium(true);
    return true;
  }, [supabase, router]);

  const fetchAnalytics = useCallback(
    async (range: { start: Date; end: Date }) => {
      setIsRefreshing(true);
      try {
        const isPremiumUser = await checkPremiumStatus();
        if (!isPremiumUser) return;

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const startDate = range.start.toISOString();
        const endDate = range.end.toISOString();

        const { data: cvs } = await supabase
          .from("user_cvs")
          .select("template_id, title")
          .eq("user_id", user.id);

        if (!cvs?.length) {
          setStats(null);
          return;
        }

        const cvIds = cvs.map((cv) => cv.template_id);
        const { data: links } = await supabase
          .from("cv_links")
          .select("id")
          .in("cv_id", cvIds);

        if (!links?.length) {
          setStats(null);
          return;
        }

        const linkIds = links.map((link) => link.id);
        const { data: views } = await supabase
          .from("cv_link_views")
          .select("*")
          .in("link_id", linkIds)
          .gte("viewed_at", startDate)
          .lte("viewed_at", endDate)
          .order("viewed_at", { ascending: false });

        const { count: uniqueVisitors } = await supabase
          .from("cv_link_views")
          .select("viewer_ip", { count: "exact", head: true })
          .in("link_id", linkIds)
          .gte("viewed_at", startDate)
          .lte("viewed_at", endDate)
          .neq("is_bot", true);

        const processData = (key: keyof ViewRecord) => {
          const map = new Map<string, number>();
          (views || []).forEach((item) => {
            const value = String(item[key]) || "Unknown";
            map.set(value, (map.get(value) || 0) + 1);
          });
          return Array.from(map.entries()).map(([name, value]) => ({
            name,
            value,
          }));
        };

        setStats({
          views: views || [],
          referrers: processData("referrer"),
          devices: processData("device_type"),
          countries: processData("country"),
          totalViews: views?.length || 0,
          uniqueVisitors: uniqueVisitors || 0,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [supabase, checkPremiumStatus]
  );

  useEffect(() => {
    fetchAnalytics(dateRange);
  }, [dateRange, fetchAnalytics]);

  const handleRefresh = () => fetchAnalytics(dateRange);

  if (!isPremium && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 p-2 rounded-lg">
                    <Crown className="h-5 w-5" />
                  </span>
                  Premium Feature
                </h2>
              </div>
              <div className="p-6 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <Crown className="h-12 w-12 mx-auto text-yellow-500 dark:text-yellow-400" />
                  <h3 className="text-xl font-semibold dark:text-white">
                    Upgrade to Premium
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced analytics are only available for premium users.
                    Upgrade your account to access this feature and more.
                  </p>
                  <Button
                    onClick={() => router.push("/pricing")}
                    className="mt-2"
                  >
                    View Pricing Plans
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </span>
                  Analytics Dashboard
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Skeleton className="h-8 w-48 dark:bg-gray-700" />
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Skeleton className="h-8 w-8 dark:bg-gray-700" />
                    <Skeleton className="h-8 w-full sm:w-48 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-24 dark:bg-gray-700" />
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-64 dark:bg-gray-700" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </span>
                  Analytics Dashboard
                </h2>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="h-8 w-full sm:w-auto"
                  >
                    <RefreshCw
                      className={`h-3 w-3 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                    />
                    Refresh
                  </Button>
                  <CalendarDateRangePicker
                    onDateChange={setDateRange}
                    className="h-8 w-full sm:w-auto"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {!stats ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground text-sm">
                    No analytics data available
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard title="Total Views" value={stats.totalViews} />
                    <StatCard
                      title="Unique Visitors"
                      value={stats.uniqueVisitors}
                    />
                    <StatCard title="Bounce Rate" value="--%" />
                    <StatCard title="Avg. Time" value="--s" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <ChartCard title="Views Over Time">
                      <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={groupViewsByDay(stats.views)}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              opacity={0.3}
                            />
                            <XAxis dataKey="date" fontSize={10} />
                            <YAxis fontSize={10} />
                            <Tooltip />
                            <Bar
                              dataKey="views"
                              fill="#8884d8"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </ChartCard>

                    <ChartCard title="Traffic Sources">
                      <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={stats.referrers}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={2}
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {stats.referrers.map((_, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </ChartCard>

                    <ChartCard title="Device Distribution">
                      <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={stats.devices}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={2}
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {stats.devices.map((_, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </ChartCard>

                    <ChartCard title="Geographic Distribution">
                      <div className="h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats.countries}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              opacity={0.3}
                            />
                            <XAxis dataKey="name" fontSize={10} />
                            <YAxis fontSize={10} />
                            <Tooltip />
                            <Bar
                              dataKey="value"
                              fill="#8884d8"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </ChartCard>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="hover:shadow-sm transition-shadow dark:bg-gray-700">
      <CardHeader className="pb-2 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground dark:text-gray-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="text-xl font-bold dark:text-white">{value}</div>
      </CardContent>
    </Card>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="dark:bg-gray-700">
      <CardHeader className="pb-2 px-4">
        <CardTitle className="text-sm font-medium dark:text-gray-200">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-0">{children}</CardContent>
    </Card>
  );
}

function groupViewsByDay(views: ViewRecord[]) {
  const map = new Map<string, number>();
  views.forEach((view) => {
    const date = new Date(view.viewed_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    map.set(date, (map.get(date) || 0) + 1);
  });
  return Array.from(map.entries()).map(([date, views]) => ({ date, views }));
}
