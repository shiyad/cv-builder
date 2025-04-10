"use client";
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with bold typography",
    category: "Popular",
    isPremium: false,
    imageUrl: "/templates/modern.png",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic layout preferred by recruiters and hiring managers",
    category: "Popular",
    isPremium: false,
    imageUrl: "/templates/professional.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "For designers and creatives who want to stand out",
    category: "Premium",
    isPremium: true,
    imageUrl: "/templates/creative.png",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Elegant design for senior-level professionals",
    category: "Premium",
    isPremium: true,
    imageUrl: "/templates/executive.png",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple and clean with maximum impact",
    category: "Free",
    isPremium: false,
    imageUrl: "/templates/minimalist.png",
  },
  {
    id: "two-column",
    name: "Two Column",
    description: "Modern layout with sidebar for additional information",
    category: "Popular",
    isPremium: true,
    imageUrl: "/templates/two-column.png",
  },
];

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  template_config: {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
    layout: string;
    font: string;
  };
  is_premium: boolean;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);

  const supabase = createClient();

  // Fetch templates from Supabase
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("cv_templates")
        .select("*")
        .eq("is_active", true);

      if (!error && data) {
        setTemplates(data);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Professional CV Templates
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Choose from our collection of handcrafted templates
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <Button variant="ghost" className="rounded-r-none">
              All Templates
            </Button>
            <Button variant="ghost" className="rounded-none border-l">
              Popular
            </Button>
            <Button variant="ghost" className="rounded-l-none border-l">
              Premium
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              {template.is_premium && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                </div>
              )}

              <div className="aspect-[1/1.414] relative bg-gray-100">
                <Image
                  src={template.thumbnail_url}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {template.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/protected/cv-editor?${template.id}`}>
                      Use This Template
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We're constantly adding new templates. Let us know what you'd like
            to see!
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Request a Template</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
