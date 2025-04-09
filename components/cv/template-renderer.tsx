"use client";

import { Linkedin, Mail, Phone, MapPin, Globe } from "lucide-react";
import Image from "next/image";

export function TemplateRenderer({
  data,
  template,
}: {
  data: any;
  template?: any;
}) {
  const { header, experience, education, skills } = data;

  return (
    <div className="max-w-5xl mx-auto font-sans bg-white shadow-2xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
      {/* LEFT SECTION (Profile + Contact) */}
      <div className="bg-indigo-900 text-white p-6 flex flex-col items-center md:items-start">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-6 relative">
          {header?.photoUrl ? (
            <Image
              src={header.photoUrl}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-indigo-800 flex items-center justify-center">
              <span className="text-white text-lg">Photo</span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-sm w-full">
          {header?.phone && (
            <p className="flex items-center gap-2">
              <Phone size={16} /> {header.phone}
            </p>
          )}
          {header?.location && (
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {header.location}
            </p>
          )}
          {header?.email && (
            <p className="flex items-center gap-2">
              <Mail size={16} /> {header.email}
            </p>
          )}
          {header?.website && (
            <p className="flex items-center gap-2">
              <Globe size={16} /> {header.website}
            </p>
          )}
          {header?.linkedin && (
            <p className="flex items-center gap-2">
              <Linkedin size={16} /> {header.linkedin}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="col-span-2 bg-white p-8 space-y-10">
        {/* Name & Title */}
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900 uppercase tracking-tight">
            {header?.fullName || "MORGAN MAXWELL"}
          </h1>
          <p className="text-lg tracking-wide text-gray-700 uppercase">
            {header?.title || "SOFTWARE EXPERT"}
          </p>
        </div>

        {/* Summary */}
        {header?.summary && (
          <div className="border-l-4 border-indigo-600 pl-4 italic text-gray-700 text-sm">
            {header.summary}
          </div>
        )}

        {/* Areas of Expertise */}
        {skills?.length > 0 && (
          <div>
            <h2 className="text-indigo-800 font-bold text-lg uppercase mb-2">
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: any, idx: number) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {typeof skill === "string" ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div>
            <h2 className="text-indigo-800 font-bold text-lg uppercase mb-4">
              Educational History
            </h2>
            <div className="space-y-6">
              {education.map((edu: any, idx: number) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-800 text-md">
                    {edu.institution}
                  </h3>
                  <div className="text-sm text-indigo-700 font-medium">
                    {edu.degree}, {edu.period}
                  </div>
                  {edu.description && (
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                      {edu.description
                        .split("\n")
                        .map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div>
            <h2 className="text-indigo-800 font-bold text-lg uppercase mb-4">
              Professional History
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any, idx: number) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900 text-md">
                    {exp.jobTitle}{" "}
                    <span className="text-indigo-700 font-medium">
                      | {exp.company}
                    </span>
                  </h3>
                  <div className="text-sm text-indigo-500 mb-1">
                    {exp.period}
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {exp.description
                        .split("\n")
                        .map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {header?.references && (
          <div>
            <h2 className="text-indigo-800 font-bold text-lg uppercase mb-2">
              Character References
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-800">
              {header.references
                .split("\n\n")
                .map((ref: string, idx: number) => (
                  <div key={idx} className="p-3 bg-indigo-50 rounded">
                    {ref.split("\n").map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
