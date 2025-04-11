// app/layout.tsx
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import AuthButton from "@/components/header-auth";
import Logo from "@/components/logo";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalProviderClient from "@/components/PaypalProviderClient";
import LogoBlackBg from "@/components/logo-black-bg";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/header";
import { Toaster } from "react-hot-toast";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CVInMinute - Professional CV Builder",
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
        <PaypalProviderClient>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col">
              <div className="flex-1 w-full flex flex-col">
                <Header />
                <Toaster position="top-right" />
                {children}
                <Analytics />

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
                        <h3 className="text-lg font-semibold mb-4">
                          Resources
                        </h3>
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
                              href="/return-policy"
                              className="text-gray-400 hover:text-white"
                            >
                              Return Policy
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
                        <LogoBlackBg />
                      </div>

                      <div className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} CvInMinute. All rights
                        reserved.
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </main>
          </ThemeProvider>
        </PaypalProviderClient>
      </body>
    </html>
  );
}
