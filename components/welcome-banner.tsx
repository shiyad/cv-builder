import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="mt-1 text-sm md:text-base">
            Ready to create your next amazing resume?
          </p>
        </div>
        <Link
          href="/protected/cv-editor"
          className="whitespace-nowrap bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          New CV
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
