import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsAndConditions() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Effective: April 5, 2024
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8">1. Account Terms</h2>
          <ul>
            <li>You must be 16+ to use CVInMinute</li>
            <li>Provide accurate registration information</li>
            <li>Keep your password secure</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">2. Subscription Terms</h2>
          <ul>
            <li>Monthly/annual billing cycles</li>
            <li>Cancel anytime (no prorated refunds)</li>
            <li>Prices subject to change with 30-day notice</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">3. User Content</h2>
          <ul>
            <li>You own your CV content</li>
            <li>We may store/display your CVs per your settings</li>
            <li>No illegal/offensive content allowed</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">4. Intellectual Property</h2>
          <ul>
            <li>Templates are licensed, not sold</li>
            <li>No redistribution of templates</li>
            <li>CVInMinute retains all platform rights</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">
            5. Limitation of Liability
          </h2>
          <p>CVInMinute is not liable for:</p>
          <ul>
            <li>Job application outcomes</li>
            <li>Internet service disruptions</li>
            <li>Indirect damages</li>
          </ul>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For questions, contact{" "}
              <Link
                href="mailto:support@cvinminute.com"
                className="text-blue-600 dark:text-blue-400"
              >
                support@cvinminute.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
