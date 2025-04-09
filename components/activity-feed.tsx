import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { FileText } from "lucide-react";

export async function ActivityFeed({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: activities } = await supabase
    .from("activities")
    .select(
      `
        id,
        action_type,
        created_at,
        cvs(id, title),
        templates(id, name)
      `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  const getActivityMessage = (activity: any) => {
    switch (activity.action_type) {
      case "create_cv":
        return `Created new CV: ${activity.cvs?.title || "Untitled"}`;
      case "download":
        return `Downloaded CV: ${activity.cvs?.title || "Untitled"}`;
      case "template_used":
        return `Used template: ${activity.templates?.name}`;
      default:
        return "Performed an action";
    }
  };

  return (
    <div className="space-y-4">
      {activities?.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start pb-4 border-b border-gray-100 last:border-0"
        >
          <div className="p-2 rounded-lg bg-blue-50 mr-4">
            <FileText className="h-5 w-5 text-blue-600" />
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
      ))}
    </div>
  );
}
