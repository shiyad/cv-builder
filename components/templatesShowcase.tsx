"use client";

import { ArrowRight, Link } from "lucide-react";
import { Button } from "./ui/button";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

// ====== TEMPLATES SHOWCASE ======
export default function TemplatesShowcase() {
  const templates = [
    {
      name: "Professional",
      category: "Corporate",
      image: "/opengraph-image1.png",
      popular: true,
    },
    {
      name: "Modern",
      category: "Creative",
      image: "/opengraph-image2.png",
    },
    {
      name: "Minimal",
      category: "Tech",
      image: "/opengraph-image3.png",
    },
    {
      name: "Executive",
      category: "Management",
      image: "/opengraph-image4.png",
      popular: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            Templates
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Stunning Resume Designs
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {template.popular && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  Popular
                </div>
              )}
              <div className="aspect-[1/1.25] relative">
                <img
                  src={template.image}
                  alt={`${template.name} Template`}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">
                    {template.name}
                  </h3>
                  <p className="text-gray-200">{template.category}</p>
                  {/* <Button className="mt-4 w-full" variant="outline">
                    Use This Template
                  </Button> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
