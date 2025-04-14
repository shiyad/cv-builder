import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header variant="public" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Effective: April 5, 2024
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8">1. Data Collection</h2>
          <p>We collect:</p>
          <ul>
            <li>
              <strong>Account Data:</strong> Email, name, contact details
            </li>
            <li>
              <strong>CV Content:</strong> Information you input into your CV
              templates
            </li>
            <li>
              <strong>Usage Data:</strong> Browser type, IP address, pages
              visited
            </li>
            <li>
              <strong>Payment Data:</strong> Processed securely by our payment
              partners (Payhere/PayPal)
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">2. Data Usage</h2>
          <p>Your data is used to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process transactions</li>
            <li>Communicate with you</li>
            <li>Prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">3. Data Protection</h2>
          <p>We implement:</p>
          <ul>
            <li>SSL encryption</li>
            <li>Regular security audits</li>
            <li>Access controls</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">4. Third Parties</h2>
          <p>We share data only with:</p>
          <ul>
            <li>Payment processors</li>
            <li>Cloud hosting providers (AWS/Google Cloud)</li>
            <li>When required by law</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">5. Your Rights</h2>
          <p>You can:</p>
          <ul>
            <li>Access/delete your data</li>
            <li>Opt-out of marketing</li>
            <li>Export your CV data</li>
          </ul>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Contact us Data Protection Officer at{" "}
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
