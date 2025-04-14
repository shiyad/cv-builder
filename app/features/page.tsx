import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const features = [
  {
    title: "Professional Templates",
    description:
      "Choose from dozens of professionally designed templates that make your CV stand out",
    icon: <Check className="text-green-500 w-5 h-5" />,
  },
  {
    title: "Easy Customization",
    description:
      "Edit and customize every section of your CV with our intuitive editor",
    icon: <Check className="text-green-500 w-5 h-5" />,
  },
  {
    title: "ATS Optimization",
    description:
      "Our templates are designed to pass through Applicant Tracking Systems",
    icon: <Check className="text-green-500 w-5 h-5" />,
  },
  {
    title: "Real-time Preview",
    description: "See changes instantly as you build your CV",
    icon: <Check className="text-green-500 w-5 h-5" />,
  },
  {
    title: "Export to PDF",
    description: "Download your CV as PDF.",
    icon: <Check className="text-green-500 w-5 h-5" />,
  },
  {
    title: "Cloud Storage",
    description: "Save multiple versions of your CV and access them anywhere",
    icon: <Check className="text-green-500 w-5 h-5" />,
  },
  {
    title: "Public CV Sharing",
    description:
      "Create shareable links for your CV and track views and visitors",
    icon: <Check className="text-green-500 w-5 h-5" />,
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header variant="public" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Powerful Features for Your Perfect CV
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Everything you need to create a professional resume that gets
            noticed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to create your perfect CV?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who landed their dream jobs with our
            CV builder
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/sign-up">Get Started for Free</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
