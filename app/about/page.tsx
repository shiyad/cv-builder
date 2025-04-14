import { Users, Rocket, BarChart2, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const stats = [
  { value: "50,000+", label: "CVs Created" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "30+", label: "Professional Templates" },
  { value: "24/7", label: "Support Available" },
];

const team = [
  {
    name: "Fathima Shafana",
    role: "Founder & CEO",
    bio: "Career coach with 10+ years helping professionals land their dream jobs",
    image:
      "https://nmttmejecvvecacaflbd.supabase.co/storage/v1/object/public/default-pics//female.png",
  },
  {
    name: "Ibrahim Ruzaick",
    role: "Head of Product",
    bio: "English veteran focused on creating intuitive writing experiences",
    image:
      "https://nmttmejecvvecacaflbd.supabase.co/storage/v1/object/public/default-pics//male.png",
  },
  {
    name: "Meharun Niza",
    role: "Design Director",
    bio: "Award-winning artist & designer passionate about visual storytelling",
    image:
      "https://nmttmejecvvecacaflbd.supabase.co/storage/v1/object/public/default-pics//female.png",
  },
  {
    name: "Shiyad Ismail",
    role: "Engineering Lead",
    bio: "Full-stack developer dedicated to building reliable platforms",
    image:
      "https://nmttmejecvvecacaflbd.supabase.co/storage/v1/object/public/default-pics//male.png",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header variant="public" />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Our Mission: Empower Your Career Journey
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            We believe everyone deserves tools to showcase their professional
            potential and land opportunities they deserve
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <Image
              src="/opengraph-image5.png"
              alt="Our team working"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                CVInMinute was founded in 2020 by career coach Fathima Shafana,
                who noticed her clients struggling with outdated CV builders and
                generic templates that didn't showcase their unique value.
              </p>
              <p>
                We set out to create a platform that combines professional
                design with smart customization tools, helping job seekers at
                all career levels create CVs that get noticed.
              </p>
              <p>
                Today, we're a team of career experts, designers, and developers
                passionate about removing barriers in the job search process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
                  <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We continuously improve our tools to stay ahead of hiring trends
                and technology
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
                  <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Results</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We measure success by how many careers we help advance
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
                  <HeartHandshake className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're transparent about our tools and pricing with no hidden
                agendas
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We build tools that serve job seekers at all career levels
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Build Your Professional CV?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who've accelerated their careers
            with our tools
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="secondary">
              <Link href="/sign-up">Get Started for Free</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
