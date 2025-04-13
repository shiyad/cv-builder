import { formatDate } from "@/utils/formatDate";
import { TemplateProps } from "./types";
import Image from "next/image";

export const ClassicBlueTemplate = ({ formData, styles }: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    objective = {},
  } = formData;

  return (
    <div
      id="cv-preview"
      className="w-full font-serif text-gray-800"
      style={{
        backgroundColor: styles.colors.background,
        color: styles.colors.text,
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-7 shadow-lg print:shadow-none min-h-screen bg-white">
        {/* LEFT SIDEBAR */}
        <div
          className="md:col-span-2 p-8 border-r-2"
          style={{
            borderColor: `${styles.colors.primary}30`,
            backgroundColor: `${styles.colors.primary}05`,
          }}
        >
          {/* Profile Picture */}
          {contact_information.profile_picture && (
            <div className="w-36 h-36 mx-auto mb-6 relative rounded-full overflow-hidden border-4 shadow-md">
              <img
                src={
                  contact_information.profile_picture || "/opengraph-image7.png"
                }
                alt="Profile"
                className="object-cover w-full h-full"
                style={{
                  borderColor: styles.colors.primary,
                }}
                crossOrigin="anonymous"
              />
            </div>
          )}

          {/* Name */}
          <div className="mb-6 text-center">
            <h1
              className="text-2xl font-bold text-gray-900 mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {contact_information.first_name}{" "}
              <span className="text-gray-700">
                {contact_information.last_name}
              </span>
            </h1>
            <p
              className="text-sm font-medium tracking-wider"
              style={{
                color: styles.colors.primary,
                letterSpacing: "1px",
              }}
            >
              {contact_information.job_title}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: styles.colors.primary }}
              >
                Contact
              </h3>
              <div className="space-y-2 text-sm">
                {contact_information.email && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">✉</span>
                    <a
                      href={`mailto:${contact_information.email}`}
                      className="hover:underline break-all"
                    >
                      {contact_information.email}
                    </a>
                  </div>
                )}
                {contact_information.phone && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">📱</span>
                    <a
                      href={`tel:${contact_information.phone}`}
                      className="hover:underline"
                    >
                      {contact_information.phone}
                    </a>
                  </div>
                )}
                {contact_information.address && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">🏠</span>
                    <span>{contact_information.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="space-y-2">
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: styles.colors.primary }}
                >
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${styles.colors.primary}15`,
                        color: styles.colors.primary,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="space-y-2">
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: styles.colors.primary }}
                >
                  Languages
                </h3>
                <div className="space-y-1">
                  {languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>{lang.language}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${styles.colors.primary}15`,
                          color: styles.colors.primary,
                        }}
                      >
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-5 p-8 space-y-8">
          {/* Objective */}
          {objective.summary && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                style={{
                  borderColor: `${styles.colors.primary}30`,
                  color: styles.colors.primary,
                }}
              >
                Professional Profile
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {objective.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                style={{
                  borderColor: `${styles.colors.primary}30`,
                  color: styles.colors.primary,
                }}
              >
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div
                      className="absolute left-0 top-2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: styles.colors.primary }}
                    ></div>
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h3 className="font-bold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(exp.start_date)} –{" "}
                          {exp.current ? "Present" : formatDate(exp.end_date)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        {exp.company}
                      </p>
                      {exp.description && (
                        <ul className="mt-2 text-gray-700 space-y-1 text-sm list-disc list-inside pl-4">
                          {exp.description
                            .split("\n")
                            .filter((item) => item.trim())
                            .map((item, i) => (
                              <li key={i} className="leading-relaxed">
                                {item}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                style={{
                  borderColor: `${styles.colors.primary}30`,
                  color: styles.colors.primary,
                }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div
                      className="absolute left-0 top-2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: styles.colors.primary }}
                    ></div>
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h3 className="font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(edu.start_date)} –{" "}
                          {edu.current ? "Present" : formatDate(edu.end_date)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        {edu.institution}
                      </p>
                      {edu.field_of_study && (
                        <p className="text-sm text-gray-500">
                          {edu.field_of_study}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
