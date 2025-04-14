import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/header";

const faqCategories = [
  {
    category: "Account & Subscription",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "You can create an account by clicking the 'Sign Up' button in the top right corner of our website. We offer both email registration and social login options.",
      },
      {
        question: "What subscription plans do you offer?",
        answer:
          "We offer a free plan with basic features and premium plans with advanced features. You can view all plans on our Pricing page.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "You can cancel your subscription at any time from your Account Settings page. Cancellation will take effect at the end of your current billing period.",
      },
    ],
  },
  {
    category: "CV Building",
    questions: [
      {
        question: "How do I start building my CV?",
        answer:
          "After signing in, click 'Create New CV' and select a template. Our builder will guide you through adding your information section by section.",
      },
      {
        question: "Can I customize the templates?",
        answer:
          "Yes! All templates are fully customizable. You can change colors, fonts, layouts, and section ordering to match your preferences.",
      },
      {
        question: "How do I make my CV ATS-friendly?",
        answer:
          "Our templates are designed to be ATS-compatible. Avoid complex layouts, use standard headings, and include relevant keywords from the job description.",
      },
    ],
  },
  {
    category: "Exporting & Sharing",
    questions: [
      {
        question: "What formats can I export my CV in?",
        answer:
          "You can export your CV as PDF, Word (.docx), or plain text (.txt) files. PDF is recommended for most applications.",
      },
      {
        question: "Can I share my CV directly from your platform?",
        answer:
          "Yes, premium users can generate shareable links to their CVs and track when they're viewed.",
      },
      {
        question: "Is there a limit to how many CVs I can create?",
        answer:
          "Free users can create up to 3 CVs. Premium users have unlimited CV creation and storage.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Is my personal information secure?",
        answer:
          "We use industry-standard encryption and security measures to protect your data. Your CVs are private unless you choose to share them.",
      },
      {
        question: "Who owns the CVs I create?",
        answer:
          "You retain full ownership of all content you create. We only store it to provide you with our service.",
      },
      {
        question: "Can I delete my account and data?",
        answer:
          "Yes, you can permanently delete your account and all associated data from your Account Settings at any time.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header variant="public" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about our CV builder
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          {faqCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, i) => (
                  <AccordionItem key={i} value={`item-${index}-${i}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is happy to help with any other questions you might
            have.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/guides">Browse Guides</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
