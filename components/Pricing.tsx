"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic resume creation",
      cta: "Get Started",
      popular: false,
      features: [
        "Access basic templates",
        "PDF downloads",
        "Limited customization",
        "Basic formatting",
        "1 resume version",
      ],
    },
    {
      name: "Premium",
      price: "$9.99",
      description: "Everything you need for job search",
      cta: "Upgrade Now",
      popular: true,
      features: [
        "Access all premium templates",
        "PDF downloads", // , Word & Text
        "Full customization",
        "ATS optimization",
        "Unlimited resume versions",
        //"Cover letter builder",
        "Priority support",
      ],
    },
    // {
    //   name: "Pro",
    //   price: "$19.99",
    //   description: "For professionals & career changers",
    //   cta: "Get Pro",
    //   popular: false,
    //   features: [
    //     "All Premium features",
    //     "100+ premium templates",
    //     "LinkedIn profile builder",
    //     "Resume review service",
    //     "Interview preparation",
    //     "Career coaching session",
    //     "24/7 VIP support",
    //   ],
    // },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-xl shadow-lg overflow-hidden border ${
                plan.popular
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg z-10 flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.price !== "$0" && (
                    <span className="text-gray-600"> / month</span>
                  )}
                </div>
                <Button
                  asChild
                  className={`w-full py-4 text-lg ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  <Link href="/protected/account/subscription">{plan.cta}</Link>
                </Button>
              </div>
              <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  What's included
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-blue-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Need a custom solution?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We offer enterprise plans for universities and organizations with
            bulk discounts and additional features.
          </p>
          <Button variant="outline" className="px-8 py-4 text-lg">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
