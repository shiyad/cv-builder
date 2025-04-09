// import DeployButton from "@/components/deploy-button";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
// import { Geist } from "next/font/google";
// import { ThemeProvider } from "next-themes";
// import Link from "next/link";
// import "./globals.css";

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Next.js and Supabase Starter Kit",
//   description: "The fastest way to build apps with Next.js and Supabase",
// };

// const geistSans = Geist({
//   display: "swap",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={geistSans.className} suppressHydrationWarning>
//       <body className="bg-background text-foreground">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <main className="min-h-screen flex flex-col items-center">
//             <div className="flex-1 w-full flex flex-col gap-20 items-center">
//               <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
//                 <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
//                   <div className="flex gap-5 items-center font-semibold">
//                     <Link href={"/"}>Next.js Supabase Starter</Link>
//                     <div className="flex items-center gap-2">
//                       <DeployButton />
//                     </div>
//                   </div>
//                   {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
//                 </div>
//               </nav>
//               <div className="flex flex-col gap-20 max-w-5xl p-5">
//                 {children}
//               </div>

//               <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
//                 <p>
//                   Powered by{" "}
//                   <a
//                     href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//                     target="_blank"
//                     className="font-bold hover:underline"
//                     rel="noreferrer"
//                   >
//                     Supabase
//                   </a>
//                 </p>
//                 <ThemeSwitcher />
//               </footer>
//             </div>
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import AuthButton from "@/components/header-auth";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ResumeCraft - Professional CV Builder",
  description:
    "Create stunning, professional resumes in minutes with our easy-to-use CV builder",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <div className="flex-1 w-full flex flex-col">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white dark:bg-gray-900">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CV</span>
                      </div>
                      <span className="text-lg font-bold hidden sm:inline">
                        ResumeCraft
                      </span>
                    </Link>
                    <div className="hidden md:flex gap-6 ml-10">
                      <Link
                        href="/templates"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Templates
                      </Link>
                      <Link
                        href="/features"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Features
                      </Link>
                      <Link
                        href="/pricing"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                      >
                        Pricing
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                      <AuthButton />
                    </div>
                    {!hasEnvVars ? <EnvVarWarning /> : null}
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>

              {children}

              <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Product</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/features"
                            className="text-gray-400 hover:text-white"
                          >
                            Features
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pricing"
                            className="text-gray-400 hover:text-white"
                          >
                            Pricing
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/templates"
                            className="text-gray-400 hover:text-white"
                          >
                            Templates
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Resources</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/blog"
                            className="text-gray-400 hover:text-white"
                          >
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/guides"
                            className="text-gray-400 hover:text-white"
                          >
                            Guides
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/faq"
                            className="text-gray-400 hover:text-white"
                          >
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Company</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/about"
                            className="text-gray-400 hover:text-white"
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="text-gray-400 hover:text-white"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Legal</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/privacy"
                            className="text-gray-400 hover:text-white"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/terms"
                            className="text-gray-400 hover:text-white"
                          >
                            Terms of Service
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CV</span>
                      </div>
                      <span className="text-lg font-bold">ResumeCraft</span>
                    </div>

                    <div className="text-gray-400 text-sm">
                      © {new Date().getFullYear()} ResumeCraft. All rights
                      reserved.
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
