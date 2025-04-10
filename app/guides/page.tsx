import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, GraduationCap, Briefcase, Users, Award } from "lucide-react";

const guideCategories = [
  {
    title: "CV Writing Guides",
    description: "Step-by-step instructions for creating effective CVs",
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    guides: [
      { title: "The Ultimate CV Writing Guide", href: "#" },
      { title: "How to Tailor Your CV for Each Job", href: "#" },
      { title: "CV Formatting Best Practices", href: "#" },
    ],
  },
  {
    title: "Career Development",
    description: "Advice for advancing your professional journey",
    icon: <Briefcase className="h-8 w-8 text-green-600" />,
    guides: [
      { title: "Career Progression Strategies", href: "#" },
      { title: "Building Your Professional Brand", href: "#" },
      { title: "Networking for Career Growth", href: "#" },
    ],
  },
  {
    title: "Job Search Strategies",
    description: "Effective methods for finding your next opportunity",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    guides: [
      { title: "Optimizing Your LinkedIn Profile", href: "#" },
      { title: "Cold Emailing for Job Opportunities", href: "#" },
      { title: "Following Up After Applications", href: "#" },
    ],
  },
  {
    title: "Interview Preparation",
    description: "Get ready to ace your next job interview",
    icon: <Award className="h-8 w-8 text-amber-600" />,
    guides: [
      { title: "Common Interview Questions & Answers", href: "#" },
      { title: "Creating a Portfolio for Interviews", href: "#" },
      { title: "Virtual Interview Tips", href: "#" },
    ],
  },
  {
    title: "For Students & Graduates",
    description: "Specialized resources for early career professionals",
    icon: <GraduationCap className="h-8 w-8 text-red-600" />,
    guides: [
      { title: "Writing a CV With Little Experience", href: "#" },
      { title: "Internship Application Guide", href: "#" },
      { title: "Transitioning from School to Work", href: "#" },
    ],
  },
];

export default function GuidesPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Career Guides & Resources
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Comprehensive guides to help you at every stage of your career
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {guideCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-2">
                {category.guides.map((guide, i) => (
                  <li key={i}>
                    <Link
                      href={guide.href}
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Button variant="link" size="sm" asChild>
                  <Link href="#">View all {category.title}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Looking for something specific?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We're constantly adding new guides. Let us know what you'd like to
            learn about!
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Request a Guide</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
