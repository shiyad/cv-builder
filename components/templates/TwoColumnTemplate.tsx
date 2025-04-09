import { formatDate } from "@/utils/formatDate";
import {
  Briefcase,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { TemplateProps } from ".";
import { ProgressBar } from "./common/ProgressBar";
import Image from "next/image";

export const TwoColumnTemplate = ({
  formData,
  styles,
  previewMode = false,
}: TemplateProps & { previewMode?: boolean }) => {
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
      className={
        previewMode ? "" : "w-full print:min-h-0 print:p-0 print:bg-white"
      }
      style={{
        backgroundColor: previewMode ? "transparent" : "#ffffff",
        padding: previewMode ? "0" : "0",
        margin: previewMode ? "0" : "0",
      }}
    >
      <div
        className={
          previewMode
            ? ""
            : "max-w-6xl mx-auto print:mx-0 print:shadow-none print:rounded-none print:w-full"
        }
        style={{
          width: previewMode ? "auto" : "100%",
          padding: previewMode ? "0" : "0",
        }}
      >
        <div id="cv-preview">
          {/* Header with accent color */}
          <div
            className="p-8 print:py-4 print:px-0 text-center"
            style={{
              backgroundColor: styles.colors.primary,
              background: `${styles.colors.primary}`,
            }}
          >
            <h1 className="text-3xl font-bold text-white tracking-tight print:text-2xl">
              {contact_information.first_name}{" "}
              <span className="font-light">
                {contact_information.last_name}
              </span>
            </h1>
            <p className="text-lg text-white mt-2 print:text-base">
              {contact_information.job_title}
            </p>
          </div>

          <div className="flex flex-col md:flex-row print:flex-row print:w-full">
            {/* Left Column - Sidebar (30%) */}
            <div
              className="w-full md:w-1/3 p-8 print:p-4 print:w-1/3"
              style={{
                backgroundColor: styles.colors.background,
                borderRight: `1px solid ${styles.colors.secondary}20`,
              }}
            >
              {/* Profile Picture */}
              {contact_information.profile_picture && (
                <div className="relative w-40 h-40 mx-auto mb-6 print:w-32 print:h-32 print:mx-0">
                  {/* <Image
                    src={contact_information.profile_picture}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg print:shadow-none"
                    style={{ borderColor: styles.colors.primary }}
                    priority
                  /> */}
                  <img
                    src={contact_information.profile_picture}
                    alt="Profile"
                    className="rounded-full object-cover border-4 border-white shadow-lg print:shadow-none"
                    style={{
                      borderColor: styles.colors.primary,
                      width: "100%",
                      height: "100%",
                    }}
                    crossOrigin="anonymous" // Important for CORS
                  />
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-8 print:mb-4">
                <h2
                  className="text-lg font-semibold mb-4 pb-2 border-b uppercase tracking-wider print:text-base"
                  style={{
                    color: styles.colors.primary,
                    borderColor: `${styles.colors.primary}30`,
                  }}
                >
                  Contact
                </h2>
                <div className="space-y-3 text-sm print:text-xs">
                  {contact_information.email && (
                    <div className="flex items-start gap-3">
                      <Mail
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: styles.colors.primary }}
                      />
                      <a
                        href={`mailto:${contact_information.email}`}
                        className="hover:underline break-all"
                      >
                        {contact_information.email}
                      </a>
                    </div>
                  )}
                  {contact_information.phone && (
                    <div className="flex items-start gap-3">
                      <Phone
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: styles.colors.primary }}
                      />
                      <a
                        href={`tel:${contact_information.phone}`}
                        className="hover:underline"
                      >
                        {contact_information.phone}
                      </a>
                    </div>
                  )}
                  {contact_information.address && (
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: styles.colors.primary }}
                      />
                      <span>{contact_information.address}</span>
                    </div>
                  )}
                  {contact_information.website && (
                    <div className="flex items-start gap-3">
                      <Globe
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: styles.colors.primary }}
                      />
                      <a
                        href={contact_information.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline break-all"
                      >
                        {contact_information.website.replace(
                          /^https?:\/\//,
                          ""
                        )}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              {skills.length > 0 && (
                <div className="mb-8 print:mb-4">
                  <h2
                    className="text-lg font-semibold mb-4 pb-2 border-b uppercase tracking-wider print:text-base"
                    style={{
                      color: styles.colors.primary,
                      borderColor: `${styles.colors.primary}30`,
                    }}
                  >
                    Skills
                  </h2>
                  <div className="space-y-4 print:space-y-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm print:text-xs">
                          <span className="font-medium">{skill.name}</span>
                          {skill.level && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${styles.colors.primary}15`,
                                color: styles.colors.primary,
                              }}
                            >
                              {skill.level}
                            </span>
                          )}
                        </div>
                        <ProgressBar
                          level={skill.level}
                          primaryColor={styles.colors.primary}
                          secondaryColor={styles.colors.primary}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {languages.length > 0 && (
                <div>
                  <h2
                    className="text-lg font-semibold mb-4 pb-2 border-b uppercase tracking-wider print:text-base"
                    style={{
                      color: styles.colors.primary,
                      borderColor: `${styles.colors.primary}30`,
                    }}
                  >
                    Languages
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {languages.map((lang, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm print:text-xs">
                          {lang.language}
                        </span>
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

            {/* Right Column - Main Content (70%) */}
            <div className="w-full md:w-2/3 p-8 print:p-4 print:w-2/3">
              {/* Professional Summary */}
              {objective.summary && (
                <div className="mb-8 print:mb-4">
                  <h2
                    className="text-xl font-semibold mb-3 pb-2 border-b print:text-lg"
                    style={{
                      color: styles.colors.primary,
                      borderColor: `${styles.colors.primary}30`,
                    }}
                  >
                    <User className="inline mr-2 w-5 h-5" />
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed print:text-sm">
                    {objective.summary}
                  </p>
                </div>
              )}

              {/* Experience Section */}
              {experience.length > 0 && (
                <div className="mb-8 print:mb-4">
                  <h2
                    className="text-xl font-semibold mb-4 pb-2 border-b print:text-lg"
                    style={{
                      color: styles.colors.primary,
                      borderColor: `${styles.colors.primary}30`,
                    }}
                  >
                    <Briefcase className="inline mr-2 w-5 h-5" />
                    Professional Experience
                  </h2>
                  <div className="space-y-6 print:space-y-4">
                    {experience.map((exp, index) => (
                      <div key={index} className="relative pl-8 group">
                        <div
                          className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 transition-all"
                          style={{
                            backgroundColor: styles.colors.primary,
                            borderColor: styles.colors.secondary,
                          }}
                        ></div>
                        <div
                          className="border-l-2 pl-6 pb-6 group-last:pb-0 group-last:border-l-0 print:pb-4"
                          style={{ borderColor: `${styles.colors.primary}30` }}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                              <h3 className="font-medium text-lg print:text-base">
                                {exp.position}
                              </h3>
                              <p className="text-gray-600 print:text-sm">
                                {exp.company}
                              </p>
                            </div>
                            <div className="text-sm text-gray-500 whitespace-nowrap print:text-xs">
                              {formatDate(exp.start_date)} —{" "}
                              {exp.current
                                ? "Present"
                                : formatDate(exp.end_date)}
                            </div>
                          </div>
                          {exp.description && (
                            <div className="mt-3 text-gray-700 space-y-2 print:space-y-1">
                              {exp.description
                                .split("\n")
                                .map((paragraph, i) => (
                                  <p
                                    key={i}
                                    className="text-justify print:text-sm"
                                  >
                                    {paragraph}
                                  </p>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {education.length > 0 && (
                <div>
                  <h2
                    className="text-xl font-semibold mb-4 pb-2 border-b print:text-lg"
                    style={{
                      color: styles.colors.primary,
                      borderColor: `${styles.colors.primary}30`,
                    }}
                  >
                    <GraduationCap className="inline mr-2 w-5 h-5" />
                    Education
                  </h2>
                  <div className="space-y-4 print:space-y-2">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:justify-between"
                      >
                        <div>
                          <h3 className="font-medium print:text-base">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-600 print:text-sm">
                            {edu.institution}
                          </p>
                          {edu.field_of_study && (
                            <p className="text-sm text-gray-500 print:text-xs">
                              Field: {edu.field_of_study}
                            </p>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 whitespace-nowrap sm:mt-0 mt-1 print:text-xs">
                          {formatDate(edu.start_date)} —{" "}
                          {edu.current ? "Present" : formatDate(edu.end_date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
