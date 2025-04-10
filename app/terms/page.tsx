import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Effective Date: June 1, 2024
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg">
            These Terms of Service ("Terms") govern your access to and use of
            the CVInMinute service ("Service") provided by Steer (Pvt) Ltd.
            ("we", "us", or "our").
          </p>

          <h2 className="text-2xl font-bold mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these
            Terms. If you do not agree, you may not use the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8">2. Service Description</h2>
          <p>
            CVInMinute is a SaaS platform that allows users to create, edit, and
            manage professional CVs/resumes.
          </p>

          <h2 className="text-2xl font-bold mt-8">3. User Accounts</h2>
          <p>You must:</p>
          <ul>
            <li>Provide accurate account information</li>
            <li>Maintain the security of your credentials</li>
            <li>Be at least 16 years old to use the Service</li>
            <li>Not share your account with others</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">4. User Responsibilities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for illegal purposes</li>
            <li>Upload harmful or malicious content</li>
            <li>Violate intellectual property rights</li>
            <li>Attempt to disrupt the Service</li>
            <li>Use automated systems to access the Service</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality
            are owned by Steer (Pvt) Ltd. and are protected by international
            copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold mt-8">
            6. Subscription and Payments
          </h2>
          <p>For premium services:</p>
          <ul>
            <li>Fees are non-refundable except as required by law</li>
            <li>We may change subscription fees with 30 days notice</li>
            <li>You are responsible for any applicable taxes</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">7. Termination</h2>
          <p>
            We may terminate or suspend your account immediately for violations
            of these Terms. You may terminate your account at any time.
          </p>

          <h2 className="text-2xl font-bold mt-8">8. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE
            DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED OR
            ERROR-FREE.
          </p>

          <h2 className="text-2xl font-bold mt-8">
            9. Limitation of Liability
          </h2>
          <p>
            STEER (PVT) LTD. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
            SPECIAL, OR CONSEQUENTIAL DAMAGES RESULTING FROM YOUR USE OF THE
            SERVICE.
          </p>

          <h2 className="text-2xl font-bold mt-8">10. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of Sri Lanka without
            regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold mt-8">11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued
            use after changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8">12. Contact Information</h2>
          <p>For questions about these Terms, please contact us at:</p>
          <address className="not-italic mt-2">
            Steer (Pvt) Ltd.
            <br />
            Legal Department
            <br />
            Main Street
            <br />
            Akkaraipattu, Sri Lanka
            <br />
            Email:{" "}
            <Link
              href="mailto:legal@cvinminute.com"
              className="text-blue-600 dark:text-blue-400"
            >
              legal@cvinminute.com
            </Link>
          </address>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              These Terms of Service were last updated on June 1, 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
