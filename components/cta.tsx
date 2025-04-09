"use client";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

// ====== CTA SECTION ======
export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Dream Resume?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who landed their dream jobs with our
            CV builder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md text-blue-500 bg-white px-3.5 py-2.5 text-sm font-semibold text-blue shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
            {/* <Button className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100">
              Get Started Free
            </Button> */}
            {/* <Button
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-blue-700"
            >
              See Live Demo
            </Button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
