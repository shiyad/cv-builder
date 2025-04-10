import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReturnPolicy() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Return & Refund Policy
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Last Updated: April 5, 2025
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8">Digital Service Policy</h2>
          <p>
            CVInMinute is a <strong>digital SaaS platform</strong> providing
            CV-building tools and templates. As such, we do not accept returns
            of digital products once they have been accessed or downloaded.
          </p>

          <h2 className="text-2xl font-bold mt-8">Subscription Refunds</h2>
          <p>
            For <strong>paid subscriptions</strong>:
          </p>
          <ul>
            <li>You may cancel your subscription at any time</li>
            <li>
              Refunds are only provided within <strong>14 days</strong> of
              initial purchase if no templates have been downloaded
            </li>
            <li>
              To request a refund, contact{" "}
              <Link
                href="mailto:support@cvinminute.com"
                className="text-blue-600 dark:text-blue-400"
              >
                support@cvinminute.com
              </Link>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Technical Issues</h2>
          <p>If you experience technical problems preventing service access:</p>
          <ul>
            <li>Contact our support team immediately</li>
            <li>
              We will make reasonable efforts to resolve issues within 48 hours
            </li>
            <li>If unresolved, we may issue a prorated refund</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Changes to This Policy</h2>
          <p>
            We may update this policy periodically. Continued use of our service
            constitutes acceptance of the current policy.
          </p>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For any questions, contact us at{" "}
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
