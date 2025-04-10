import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User } from "lucide-react";
import Image from "next/image";

const blogPosts = [
  {
    id: "how-to-write-cv",
    title: "How to Write a CV That Gets You Hired",
    excerpt:
      "Learn the essential elements every hiring manager looks for in a CV",
    date: "May 15, 2024",
    readTime: "5 min read",
    author: "Sarah Johnson",
    imageUrl: "/blog/cv-writing.jpg",
    category: "Career Tips",
  },
  {
    id: "ats-friendly-cv",
    title: "Creating an ATS-Friendly CV: A Complete Guide",
    excerpt: "Optimize your CV to pass through applicant tracking systems",
    date: "April 28, 2024",
    readTime: "7 min read",
    author: "Michael Chen",
    imageUrl: "/blog/ats-cv.jpg",
    category: "Resume Writing",
  },
  {
    id: "cv-mistakes",
    title: "10 Common CV Mistakes to Avoid",
    excerpt: "Don't let these errors ruin your job application",
    date: "April 10, 2024",
    readTime: "4 min read",
    author: "Emma Rodriguez",
    imageUrl: "/blog/cv-mistakes.jpg",
    category: "Career Tips",
  },
  {
    id: "design-tips",
    title: "CV Design Tips for Non-Designers",
    excerpt: "Make your CV visually appealing without graphic design skills",
    date: "March 22, 2024",
    readTime: "6 min read",
    author: "David Wilson",
    imageUrl: "/blog/cv-design.jpg",
    category: "Design",
  },
  {
    id: "career-change-cv",
    title: "How to Write a CV for Career Change",
    excerpt: "Transition to a new industry with these CV strategies",
    date: "March 5, 2024",
    readTime: "8 min read",
    author: "Lisa Park",
    imageUrl: "/blog/career-change.jpg",
    category: "Career Transition",
  },
  {
    id: "digital-cv",
    title: "The Rise of Digital CVs: What You Need to Know",
    excerpt: "How digital formats are changing job applications",
    date: "February 18, 2024",
    readTime: "5 min read",
    author: "James Peterson",
    imageUrl: "/blog/digital-cv.jpg",
    category: "Trends",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            CV Insights & Career Tips
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Expert advice to help you create better CVs and advance your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="#">Load More Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
