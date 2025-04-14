"use client";
import { Star, Crown, Zap, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";

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
  popularity: number;
  category?: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const supabase = createClient();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("cv_templates")
        .select("*")
        .eq("is_active", true)
        .order("popularity", { ascending: true }); // Changed to descending

      if (!error && data) {
        setTemplates(data);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((template) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "premium") return template.is_premium;
    if (activeFilter === "popular") return template.popularity >= 8; // Changed threshold to 8
    return true;
  });

  // Sort premium templates first
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (a.is_premium && !b.is_premium) return -1;
    if (!a.is_premium && b.is_premium) return 1;
    return b.popularity - a.popularity; // Sort by popularity
  });

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header variant="public" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4">
            <Zap className="w-4 h-4 mr-2" />
            NEW: AI-Powered Templates
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Make an <span className="text-primary">Impression</span> With Our CV
            Templates
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professionally designed templates that help you stand out and get
            noticed by recruiters
          </p>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Crown className="w-8 h-8 text-white mr-4" />
            <div>
              <h3 className="text-xl font-bold text-white">
                Unlock Premium Templates
              </h3>
              <p className="text-amber-100">
                Get access to all premium designs and features
              </p>
            </div>
          </div>
          <Button variant="default" size="lg" asChild>
            <Link href="/pricing">Upgrade Now</Link>
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <Button
              variant={activeFilter === "all" ? "default" : "ghost"}
              className={`rounded-r-none ${activeFilter === "all" ? "shadow-sm" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Templates
            </Button>
            <Button
              variant={activeFilter === "popular" ? "default" : "ghost"}
              className={`rounded-none ${activeFilter === "popular" ? "shadow-sm" : ""}`}
              onClick={() => setActiveFilter("popular")}
            >
              <Star className="w-4 h-4 mr-2" />
              Popular
            </Button>
            <Button
              variant={activeFilter === "premium" ? "default" : "ghost"}
              className={`rounded-l-none ${activeFilter === "premium" ? "shadow-sm" : ""}`}
              onClick={() => setActiveFilter("premium")}
            >
              <BadgeCheck className="w-4 h-4 mr-2" />
              Premium
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sortedTemplates.map((template) => (
            <Card
              key={template.id}
              className={`group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${
                template.is_premium
                  ? "border-amber-300 dark:border-amber-500"
                  : ""
              }`}
            >
              {template.is_premium && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="shadow-lg bg-gradient-to-r from-amber-500 to-amber-600">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              )}
              {template.popularity >= 8 && !template.is_premium && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="p-0">
                <div className="aspect-[1/1.414] relative bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={template.thumbnail_url}
                    alt={template.name}
                    fill
                    className="object-cover"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {template.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {template.template_config.layout.replace(/-/g, " ")}
                    </Badge>
                    {template.popularity >= 8 && (
                      <Badge variant="secondary" className="text-xs">
                        {template.popularity}% Positive
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  className="w-full"
                  variant={template.is_premium ? "default" : "secondary"}
                >
                  <Link
                    href={`/protected/cv-editor?template_id=${template.id}`}
                  >
                    {template.is_premium
                      ? "Use Premium Template"
                      : "Use Template"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need a Custom Design?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our design team can create a personalized CV template tailored to
            your industry and personal brand.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" asChild>
              <Link href="/contact">Request Custom Design</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
