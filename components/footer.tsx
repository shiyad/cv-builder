import { Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            <span className="text-lg font-bold">ResumeCraft</span>
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
