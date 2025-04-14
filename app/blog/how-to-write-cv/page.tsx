// app/blog/how-to-write-cv/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function HowToWriteCV() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>May 15, 2024</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          How to Write a CV That Gets You Hired
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn the essential elements every hiring manager looks for in a CV
        </p>
      </div>

      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-8">
        <Image
          src="/opengraph-image9.png"
          alt="Professional writing a CV"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>

      <article className="prose dark:prose-invert prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            The Foundation of a Great CV
          </h2>
          <p>
            Your CV is your personal marketing document - it's the first
            impression you make on potential employers. A well-crafted CV can
            open doors, while a poorly written one can get you rejected before
            you even get a chance to interview.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Essential Sections Every CV Needs
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">
                1. Contact Information
              </h3>
              <p>
                Include your full name, professional email, phone number, and
                LinkedIn profile. Make sure these details are current and
                professional.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">
                2. Professional Summary
              </h3>
              <p>
                A 3-4 sentence overview of your career highlights, skills, and
                what you bring to the table. Tailor this to each job
                application.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">3. Work Experience</h3>
              <p>
                List your roles in reverse chronological order. For each
                position, include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Job title and company name</li>
                <li>Dates of employment</li>
                <li>
                  3-5 bullet points highlighting achievements (use action verbs
                  and metrics)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">4. Education</h3>
              <p>
                Include degrees, certifications, and relevant coursework. New
                graduates can place this section above work experience.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">5. Skills</h3>
              <p>
                Highlight both technical and soft skills relevant to the
                position. Include programming languages, tools, and
                methodologies you're proficient with.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Pro Tips to Make Your CV Stand Out
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50">
            <h3 className="text-xl font-medium mb-3 text-blue-700 dark:text-blue-300">
              Expert Advice from Hiring Managers
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-blue-400 mt-1">✓</span>
                <span>
                  <strong>Tailor your CV for each application</strong> - Mirror
                  the language from the job description
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-blue-400 mt-1">✓</span>
                <span>
                  <strong>Quantify achievements</strong> - "Increased sales by
                  30%" is more impactful than "Responsible for sales"
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-blue-400 mt-1">✓</span>
                <span>
                  <strong>Keep it concise</strong> - Ideally 1-2 pages maximum
                  for most professionals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-blue-400 mt-1">✓</span>
                <span>
                  <strong>Use a clean, professional design</strong> - Our CV
                  templates ensure proper formatting
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Common CV Mistakes to Avoid
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">
                ❌ Spelling and Grammar Errors
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Typos suggest carelessness. Always proofread and use tools like
                Grammarly.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">❌ Irrelevant Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Leave out hobbies unless directly relevant to the job.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">❌ Overly Creative Designs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unless you're in a creative field, stick to professional
                templates.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">
                ❌ Unexplained Employment Gaps
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Briefly address gaps in your cover letter or interview.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl border dark:border-gray-700 mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Create Your Perfect CV?
          </h2>
          <p className="mb-4">
            Now that you know what makes a great CV, use our professional
            templates to create one that stands out.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/templates">Browse CV Templates</Link>
          </Button>
        </section>
      </article>
    </div>
  );
}
