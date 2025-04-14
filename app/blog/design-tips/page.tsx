import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// app/blog/design-tips/page.tsx
export default function DesignTips() {
  const tips = [
    {
      title: "Use Consistent Formatting",
      description:
        "Pick one font (max two) and stick with consistent spacing, bullet styles, and heading sizes.",
    },
    {
      title: "Prioritize Readability",
      description:
        "Ensure sufficient contrast (black on white works best) and font size (11-12pt for body text).",
    },
    {
      title: "Keep It to One Page (If Possible)",
      description:
        "Especially for early-career roles, one page is ideal. Focus on what’s most relevant to the position.",
    },
    {
      title: "Use Clear Section Headings",
      description:
        "Make headings like 'Experience' or 'Education' stand out with bold text or slightly larger font size.",
    },
    {
      title: "Align Everything Neatly",
      description:
        "Use consistent margins and align text to the left to keep things easy to scan quickly.",
    },
    {
      title: "Avoid Large Blocks of Text",
      description:
        "Use bullet points to break up information. Recruiters skim—help them find what they’re looking for fast.",
    },
    {
      title: "Use Action Verbs",
      description:
        "Start each bullet with strong action verbs like 'Led', 'Created', or 'Managed' to convey impact.",
    },
    {
      title: "Include White Space",
      description:
        "Give your content room to breathe—don’t cram everything into the page. A clean layout stands out.",
    },
    {
      title: "Save as PDF",
      description:
        "Always export your CV as a PDF to preserve formatting across devices and platforms.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/blog" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      {/* Header similar to previous examples */}

      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden my-8">
        <Image
          src="/images/cv-design.png"
          alt="Well-designed CV layout example"
          fill
          className="object-cover"
          priority
        />
      </div>

      <article className="prose dark:prose-invert prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Design Principles for Non-Designers
          </h2>
          <p>
            You don't need graphic design skills to create a visually appealing
            CV. These fundamental principles will instantly improve your CV's
            appearance:
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-medium mb-2">{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl border dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">
            Professional Templates
          </h2>
          <p className="mb-4">
            Our designer-created templates handle all the formatting for you -
            just fill in your information.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/templates">View Design Templates</Link>
          </Button>
        </section>
      </article>
    </div>
  );
}
