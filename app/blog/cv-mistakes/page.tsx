// app/blog/cv-mistakes/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CVMistakes() {
  const mistakes = [
    {
      title: "Spelling and Grammar Errors",
      description:
        "Even small typos can get your CV rejected immediately. Always proofread multiple times and use tools like Grammarly.",
      severity: "High",
    },
    {
      title: "Generic Objective Statements",
      description:
        "Objectives like 'Seeking challenging position' add no value. Replace with a professional summary tailored to each job.",
      severity: "Medium",
    },
    // Add 8 more mistakes...
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header similar to previous example */}

      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden my-8">
        <Image
          src="/blog/cv-mistakes.jpg"
          alt="Red X marks on a rejected CV"
          fill
          className="object-cover"
          priority
        />
      </div>

      <article className="prose dark:prose-invert prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">The Cost of CV Errors</h2>
          <p>
            Recruiters spend an average of just 7 seconds reviewing a CV.
            Mistakes can instantly disqualify you, no matter how qualified you
            are. Here are the top 10 pitfalls to avoid:
          </p>
        </section>

        <div className="space-y-6 mb-8">
          {mistakes.map((mistake, index) => (
            <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
              <h3 className="text-xl font-medium mb-1">
                {index + 1}. {mistake.title}
              </h3>
              <p>{mistake.description}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded">
                Severity: {mistake.severity}
              </span>
            </div>
          ))}
        </div>

        <section className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-900/50">
          <h3 className="text-xl font-medium mb-3 text-green-700 dark:text-green-300">
            Quick Fixes You Can Apply Today
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
              <span>Have a friend review your CV</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
              <span>Use our free CV checker tool</span>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
