// components/activity-feed.tsx
import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { FileText, Download, Plus, Edit } from "lucide-react";

export async function ActivityFeed({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: activities } = await supabase
    .from("activity_log")
    .select(
      `
        id,
        activity_type,
        created_at,
        user_cvs(id, title),
        cv_templates(id, name)
      `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case "create_cv":
        return <Plus className="h-4 w-4 text-green-500" />;
      case "download":
        return <Download className="h-4 w-4 text-blue-500" />;
      case "template_used":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "edit":
        return <Edit className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityMessage = (activity: any) => {
    switch (activity.activity_type) {
      case "create_cv":
        return `Created new CV: ${activity.user_cvs?.title || "Untitled"}`;
      case "download":
        return `Downloaded CV: ${activity.user_cvs?.title || "Untitled"}`;
      case "template_used":
        return `Used template: ${activity.cv_templates?.name}`;
      case "edit":
        return `Edited CV: ${activity.user_cvs?.title || "Untitled"}`;
      default:
        return "Performed an action";
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {activities?.length ? (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="py-4 px-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getActivityIcon(activity.activity_type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {getActivityMessage(activity)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(activity.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center">
          <p className="text-gray-500">No activity yet</p>
        </div>
      )}
    </div>
  );
}
