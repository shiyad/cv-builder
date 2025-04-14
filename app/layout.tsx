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
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import { Toaster } from "react-hot-toast";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "CVInMinute - Professional CV Builder & Resume Maker",
    template: "%s | CVInMinute - Create Perfect Resumes Fast",
  },
  description:
    "Create professional resumes in minutes with our free CV builder. Download ATS-friendly templates, get expert tips, and land more interviews with our easy resume maker tool.",
  keywords: [
    "CV builder",
    "resume maker",
    "professional CV",
    "ATS resume",
    "free CV creator",
    "online resume builder",
    "CV templates",
    "job application",
    "career tools",
    "resume writing",
    "CV download",
    "modern resume",
    "creative CV",
    "job search",
    "employment",
    "career builder",
  ],
  openGraph: {
    title: "CVInMinute - Create Professional Resumes in Minutes",
    description:
      "Build your perfect CV with our free online resume builder. ATS-friendly templates, expert tips, and easy download.",
    url: defaultUrl,
    siteName: "CVInMinute",
    images: [
      {
        url: `${defaultUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVInMinute - Professional CV Builder & Resume Maker",
    description:
      "Create stunning resumes in minutes with our free online CV builder. Download ATS-friendly templates today!",
    images: [`${defaultUrl}/opengraph-image.png`],
  },
  alternates: {
    canonical: defaultUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ZoE4-h4qMYFKG8X_ZnR8bicRHhxEXuXXipzT_paW3bo",
  },
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
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
                {/* <Header variant="public" /> */}
                <Toaster position="top-right" />
                {children}
                <Analytics />
                <SpeedInsights />

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
                              title="CV Builder Features"
                            >
                              Features
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pricing"
                              className="text-gray-400 hover:text-white"
                              title="Resume Builder Pricing"
                            >
                              Pricing
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/templates"
                              className="text-gray-400 hover:text-white"
                              title="Free CV Templates"
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
                              title="Resume Writing Blog"
                            >
                              Blog
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/guides"
                              className="text-gray-400 hover:text-white"
                              title="CV Writing Guides"
                            >
                              Guides
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/faq"
                              className="text-gray-400 hover:text-white"
                              title="CV Builder FAQ"
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
                              title="About Our CV Builder"
                            >
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/contact"
                              className="text-gray-400 hover:text-white"
                              title="Contact CVInMinute"
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
                              title="Privacy Policy"
                            >
                              Privacy Policy
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/return-policy"
                              className="text-gray-400 hover:text-white"
                              title="Return Policy"
                            >
                              Return Policy
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/terms"
                              className="text-gray-400 hover:text-white"
                              title="Terms of Service"
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
                        <span className="sr-only">
                          CVInMinute - Professional Resume Builder
                        </span>
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
