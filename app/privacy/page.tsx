import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Last Updated: June 1, 2024
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg">
            This Privacy Policy describes how Steer (Pvt) Ltd. ("we", "us", or
            "our") collects, uses, and discloses your information when you use
            our CVInMinute service ("Service").
          </p>

          <h2 className="text-2xl font-bold mt-8">1. Information We Collect</h2>
          <p>
            We collect several types of information when you use our Service:
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address,
              contact details, and professional information you provide when
              creating your CV.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our Service, including IP addresses, browser type, and pages
              visited.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to enhance your
              experience and analyze Service usage.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">
            2. How We Use Your Information
          </h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Providing and maintaining our Service</li>
            <li>Improving and personalizing your experience</li>
            <li>Communicating with you about your account</li>
            <li>Analyzing usage to improve our Service</li>
            <li>Preventing fraud and ensuring security</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">
            3. Data Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal information. We may share information
            with:
          </p>
          <ul>
            <li>Service providers who assist in operating our Service</li>
            <li>Legal authorities when required by law</li>
            <li>Third parties in connection with a business transaction</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data,
            including encryption and access controls. However, no method of
            transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mt-8">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">
            6. International Data Transfers
          </h2>
          <p>
            Your information may be transferred to and maintained on computers
            located outside of your country where data protection laws may
            differ.
          </p>

          <h2 className="text-2xl font-bold mt-8">7. Children's Privacy</h2>
          <p>
            Our Service is not intended for users under 16. We do not knowingly
            collect personal information from children under 16.
          </p>

          <h2 className="text-2xl font-bold mt-8">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you
            of changes by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-bold mt-8">9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at:
          </p>
          <address className="not-italic mt-2">
            Steer (Pvt) Ltd.
            <br />
            Data Protection Officer
            <br />
            Akkaraipattu - 06
            <br />
            Akkaraipattu, Sri Lanka
            <br />
            Email:{" "}
            <Link
              href="mailto:privacy@cvinminute.com"
              className="text-blue-600 dark:text-blue-400"
            >
              privacy@cvinminute.com
            </Link>
          </address>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This document was last updated on June 1, 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
