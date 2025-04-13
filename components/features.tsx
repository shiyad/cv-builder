// export default function Features() {
//   const features = [
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-600"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//           />
//         </svg>
//       ),
//       title: "Professional Templates",
//       description:
//         "Choose from dozens of ATS-friendly designs crafted by experts",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-600"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//           />
//         </svg>
//       ),
//       title: "Easy Customization",
//       description:
//         "Edit your CV with our intuitive interface - no design skills needed",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-600"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//           />
//         </svg>
//       ),
//       title: "ATS Optimization",
//       description:
//         "Our templates are designed to pass through applicant tracking systems",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-600"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//           />
//         </svg>
//       ),
//       title: "Multiple Formats",
//       description: "Download as PDF, Word, or plain text with one click",
//     },
//   ];

"use client";

import { motion } from "framer-motion";
import {
  Download,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  Link,
  ScanEye,
} from "lucide-react";

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-gray-900">
//             Create the Perfect Resume
//           </h2>
//           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//             Our CV builder provides everything you need to showcase your skills
//             and experience
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
//             >
//               <div className="mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ====== FEATURES SECTION ======
export default function Features() {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Professional Templates",
      description: "50+ ATS-friendly designs crafted by career experts",
    },
    {
      icon: <ScanEye className="h-8 w-8 text-blue-600" />,
      title: "ATS Optimization",
      description: "Get past automated screening systems with ease",
    },
    {
      icon: <LayoutTemplate className="h-8 w-8 text-blue-600" />,
      title: "Easy Customization",
      description: "Drag-and-drop editor with real-time preview",
    },
    {
      icon: <Download className="h-8 w-8 text-blue-600" />,
      title: "Pixel Perfect PDFs",
      description: "Download your CV as a pixel-perfect PDF",
    },
    {
      icon: <Link className="h-8 w-8 text-blue-600" />,
      title: "Shareable Link",
      description: "Create a shareable link to track views on your CV",
    },
    {
      icon: <LayoutDashboard className="h-8 w-8 text-blue-600" />,
      title: "Tracking Dashboard",
      description: "Access a dashboard with detailed view tracking features",
    },
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
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Build a Resume That Gets You Hired
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a job-winning resume in one place
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
