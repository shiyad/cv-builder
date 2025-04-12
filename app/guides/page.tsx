import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  GraduationCap,
  Briefcase,
  Users,
  Award,
  Share2,
} from "lucide-react";
import { ShareButton } from "@/components/share-button";

const guideCategories = [
  {
    title: "CV Writing Guides",
    titleSlug: "cv-writing-guides", // URL-safe version of the category title
    description: "Step-by-step instructions for creating effective CVs",
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    guides: [
      {
        title: "The Ultimate CV Writing Guide",
        slug: "ultimate-cv-writing-guide",
        shareLink: "/share/ultimate-cv-writing",
      },
      {
        title: "How to Tailor Your CV for Each Job",
        slug: "tailor-cv-for-jobs",
        shareLink: "/share/tailor-cv",
      },
      {
        title: "CV Formatting Best Practices",
        slug: "cv-formatting-best-practices",
        shareLink: "/share/cv-formatting",
      },
    ],
  },
  {
    title: "Career Development",
    titleSlug: "career-development", // URL-safe version of the category title
    description: "Advice for advancing your professional journey",
    icon: <Briefcase className="h-8 w-8 text-green-600" />,
    guides: [
      {
        title: "Career Progression Strategies",
        slug: "career-progression-strategies",
        shareLink: "/share/career-progression",
      },
      {
        title: "Building Your Professional Brand",
        slug: "building-professional-brand",
        shareLink: "/share/professional-brand",
      },
      {
        title: "Networking for Career Growth",
        slug: "networking-career-growth",
        shareLink: "/share/networking-growth",
      },
    ],
  },
  {
    title: "Job Search Strategies",
    titleSlug: "job-search-strategies", // URL-safe version of the category title
    description: "Effective methods for finding your next opportunity",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    guides: [
      {
        title: "Optimizing Your LinkedIn Profile",
        slug: "optimizing-linkedin-profile",
        shareLink: "/share/linkedin-optimization",
      },
      {
        title: "Cold Emailing for Job Opportunities",
        slug: "cold-emailing-jobs",
        shareLink: "/share/cold-emailing",
      },
      {
        title: "Following Up After Applications",
        slug: "following-up-applications",
        shareLink: "/share/follow-up-applications",
      },
    ],
  },
  {
    title: "Interview Preparation",
    titleSlug: "interview-preparation", // URL-safe version of the category title
    description: "Get ready to ace your next job interview",
    icon: <Award className="h-8 w-8 text-amber-600" />,
    guides: [
      {
        title: "Common Interview Questions & Answers",
        slug: "common-interview-questions",
        shareLink: "/share/interview-questions",
      },
      {
        title: "Creating a Portfolio for Interviews",
        slug: "portfolio-for-interviews",
        shareLink: "/share/interview-portfolio",
      },
      {
        title: "Virtual Interview Tips",
        slug: "virtual-interview-tips",
        shareLink: "/share/virtual-interviews",
      },
    ],
  },
  {
    title: "For Students & Graduates",
    titleSlug: "for-students-and-graduates", // URL-safe version of the category title
    description: "Specialized resources for early career professionals",
    icon: <GraduationCap className="h-8 w-8 text-red-600" />,
    guides: [
      {
        title: "Writing a CV With Little Experience",
        slug: "cv-with-little-experience",
        shareLink: "/share/beginner-cv",
      },
      {
        title: "Internship Application Guide",
        slug: "internship-application-guide",
        shareLink: "/share/internship-guide",
      },
      {
        title: "Transitioning from School to Work",
        slug: "school-to-work-transition",
        shareLink: "/share/school-to-work",
      },
    ],
  },
];

export default function GuidesPage() {
  const handleShare = (shareLink: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${shareLink}`);
    alert("Link copied to clipboard!");
  };

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
                  <li
                    key={i}
                    className="group flex justify-between items-center"
                  >
                    <Link
                      href={`/guides/${category.titleSlug}/${guide.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 flex-1"
                    >
                      <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      {guide.title}
                    </Link>
                    <ShareButton shareLink={guide.shareLink} />
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Button variant="link" size="sm" asChild>
                  <Link
                    href={`/guides/category/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    View all {category.title}
                  </Link>
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
