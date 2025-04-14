// app/blog/ats-friendly-cv/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ATSFriendlyCV() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/blog" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <span>April 28, 2024</span>
        <span>•</span>
        <span>7 min read</span>
        <span>•</span>
        <span>Michael Chen</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Creating an ATS-Friendly CV: A Complete Guide
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Optimize your CV to pass through applicant tracking systems
      </p>

      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden my-8">
        <Image
          src="/blog/ats-cv.jpg"
          alt="Computer screen showing ATS software analyzing a CV"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>

      <article className="prose dark:prose-invert prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What is an ATS?</h2>
          <p>
            Applicant Tracking Systems (ATS) are software used by 75% of
            recruiters to filter resumes before they ever reach human eyes.
            These systems scan your CV for keywords and qualifications, ranking
            applicants based on how well they match the job description.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Key ATS Optimization Strategies
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">
                1. Keyword Optimization
              </h3>
              <p>
                Carefully analyze the job description and incorporate relevant
                keywords naturally throughout your CV. Include both hard skills
                (e.g., "Python programming") and soft skills (e.g., "team
                leadership").
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">2. Simple Formatting</h3>
              <p>Avoid complex layouts, graphics, or tables. Stick to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Standard headings (Work Experience, Education)</li>
                <li>Reverse chronological order</li>
                <li>Legible fonts (Arial, Calibri, Times New Roman)</li>
                <li>Black text on white background</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50 mb-8">
          <h3 className="text-xl font-medium mb-3 text-blue-700 dark:text-blue-300">
            Pro Tip: ATS Compatibility Checklist
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 dark:text-blue-400 mt-1">✓</span>
              <span>
                Save as .docx or plain text (avoid PDF for some older systems)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 dark:text-blue-400 mt-1">✓</span>
              <span>
                Use standard section headers ("Work Experience" not "Where I've
                Worked")
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 dark:text-blue-400 mt-1">✓</span>
              <span>
                Include full company names and dates in MM/YYYY format
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl border dark:border-gray-700 mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Try Our ATS-Optimized Templates
          </h2>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/templates?filter=ats">
              Browse ATS-Friendly Templates
            </Link>
          </Button>
        </section>
      </article>
    </div>
  );
}
