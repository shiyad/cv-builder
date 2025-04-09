import { Link } from "lucide-react";
import AuthButton from "../header-auth";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">CV</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ResumeCraft</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link
              href="/templates"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Templates
            </Link>
            <Link
              href="/features"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Blog
            </Link>
          </nav>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
