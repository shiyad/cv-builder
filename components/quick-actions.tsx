import {
  FileText,
  LayoutTemplate,
  BarChart2,
  Rocket,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Quick Actions
      </h2>
      <div className="space-y-3">
        <Link
          href="/cv/new"
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-3" />
            <span>Create New CV</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Link>
        <Link
          href="/templates"
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <LayoutTemplate className="h-5 w-5 text-blue-600 mr-3" />
            <span>Browse Templates</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Link>
        <Link
          href="/analytics"
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <BarChart2 className="h-5 w-5 text-blue-600 mr-3" />
            <span>View Analytics</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Link>
        <Link
          href="/upgrade"
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <Rocket className="h-5 w-5 text-blue-600 mr-3" />
            <span>Upgrade Plan</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </Link>
      </div>
    </div>
  );
}
