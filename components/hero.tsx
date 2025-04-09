"use client";

import { ArrowRight, LayoutTemplate, Link } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Star from "./star";

// export default function Header() {
//   return (
//     <div className="flex flex-col gap-16 items-center">
//       <div className="flex gap-8 justify-center items-center">
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <SupabaseLogo />
//         </a>
//         <span className="border-l rotate-45 h-6" />
//         <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
//           <NextLogo />
//         </a>
//       </div>
//       <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
//       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
//         The fastest way to build apps with{" "}
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Supabase
//         </a>{" "}
//         and{" "}
//         <a
//           href="https://nextjs.org/"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Next.js
//         </a>
//       </p>
//       <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
//     </div>
//   );
// }

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 relative z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Craft Your <span className="text-blue-600">Perfect Resume</span>{" "}
              in Minutes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Stand out from the crowd with a professional CV that gets you
              noticed. Our builder makes it effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md text-white bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-blue shadow-xs hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="rounded-md text-white bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-blue shadow-xs hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View Templates
                </a>
              </div>
              {/* <Button
                asChild
                className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 group"
              >
                <Link href="/sign-up" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 text-lg">
                <Link href="/templates" className="flex items-center gap-2">
                  <LayoutTemplate className="h-5 w-5" />
                  View Templates
                </Link>
              </Button> */}
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"
                  ></div>
                ))}
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Trusted by 10,000+ professionals</p>
                <div className="flex items-center gap-1 text-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} filled={i <= 4} />
                  ))}
                  <span>4.8/5 (2,500+ reviews)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full h-auto shadow-2xl rounded-xl overflow-hidden border-8 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/opengraph-image.png"
                alt="Professional CV Example"
                width={800}
                height={1000}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-100 rounded-2xl z-0 opacity-80"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-100 rounded-full z-0 opacity-80"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
