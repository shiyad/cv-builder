import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Globe,
  ChevronRight,
} from "lucide-react";

export const ExecutiveModernTemplate = ({
  formData,
  styles,
}: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    achievements = [],
    objective = {},
  } = formData;

  // Modern color scheme with fallbacks
  const modernColors = {
    primary: styles.colors.primary || "#2563eb",
    secondary: styles.colors.secondary || "#1e40af",
    accent: "#10b981",
    dark: "#0f172a",
    light: "#f8fafc",
  };

  return (
    <div
      id="cv-preview"
      className="w-full min-h-screen bg-white font-sans"
      style={{ color: modernColors.dark }}
    >
      {/* Modern header with full-width accent */}
      <div
        className="h-4 w-full"
        style={{ backgroundColor: modernColors.primary }}
      ></div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Flexbox Layout */}
        <div className="flex flex-wrap gap-8">
          {/* Left Column */}
          <div className="flex-1 lg:w-2/7 space-y-8">
            {/* Profile Picture - Modern Circular with Accent Border */}
            {contact_information.profile_picture && (
              <div className="relative mx-auto">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                  <img
                    src={contact_information.profile_picture}
                    alt="Profile"
                    className="object-cover w-full h-full"
                    crossOrigin="anonymous"
                  />
                </div>
                <div
                  className="absolute -inset-2 rounded-full"
                  style={{
                    backgroundColor: modernColors.accent,
                    zIndex: 0,
                  }}
                ></div>
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-4">
              <h2
                className="text-lg font-bold uppercase tracking-wider"
                style={{ color: modernColors.primary }}
              >
                Contact
              </h2>
              <ul className="space-y-3">
                {contact_information.email && (
                  <li className="flex items-start gap-3">
                    <Mail
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: modernColors.primary }}
                    />
                    <a
                      href={`mailto:${contact_information.email}`}
                      className="hover:underline text-sm"
                    >
                      {contact_information.email}
                    </a>
                  </li>
                )}
                {contact_information.phone && (
                  <li className="flex items-start gap-3">
                    <Phone
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: modernColors.primary }}
                    />
                    <a
                      href={`tel:${contact_information.phone}`}
                      className="hover:underline text-sm"
                    >
                      {contact_information.phone}
                    </a>
                  </li>
                )}
                {contact_information.address && (
                  <li className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: modernColors.primary }}
                    />
                    <span className="text-sm">
                      {contact_information.address}
                    </span>
                  </li>
                )}
                {contact_information.website && (
                  <li className="flex items-start gap-3">
                    <Globe
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: modernColors.primary }}
                    />
                    <a
                      href={contact_information.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm"
                    >
                      {contact_information.website.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Skills - Modern Tag Cloud */}
            {skills.length > 0 && (
              <div className="space-y-4">
                <h2
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ color: modernColors.primary }}
                >
                  Core Competencies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${modernColors.primary}20`,
                        color: modernColors.primary,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Middle Column */}
          <div className="flex-1 lg:w-3/7 space-y-8">
            {/* Name & Title - Modern Layout */}
            <div className="mb-6">
              <h1
                className="text-4xl font-bold tracking-tight"
                style={{ color: modernColors.dark }}
              >
                {contact_information.first_name}
              </h1>
              <h1
                className="text-4xl font-bold tracking-tight mb-2"
                style={{ color: modernColors.primary }}
              >
                {contact_information.last_name}
              </h1>
              <p className="text-lg font-medium text-gray-600">
                {contact_information.job_title}
              </p>
            </div>

            {/* Professional Summary */}
            {objective.summary && (
              <div>
                <h2
                  className="text-lg font-bold uppercase tracking-wider mb-3"
                  style={{ color: modernColors.primary }}
                >
                  Executive Profile
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {objective.summary}
                </p>
              </div>
            )}

            {/* Experience - Modern Timeline */}
            {experience.length > 0 && (
              <div>
                <h2
                  className="text-lg font-bold uppercase tracking-wider mb-4"
                  style={{ color: modernColors.primary }}
                >
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="relative pl-8">
                      <div
                        className="absolute left-0 top-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: modernColors.primary,
                          border: `2px solid ${modernColors.secondary}`,
                        }}
                      >
                        <ChevronRight className="w-3 h-3 text-white" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold">{exp.position}</h3>
                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            {formatDate(exp.start_date)} —{" "}
                            {exp.current ? "Present" : formatDate(exp.end_date)}
                          </p>
                        </div>
                        <p
                          className="text-md font-medium"
                          style={{ color: modernColors.primary }}
                        >
                          {exp.company}
                        </p>
                        {exp.description && (
                          <ul className="mt-2 pl-0 text-gray-700 space-y-2">
                            {exp.description.split("\n").map((item, i) => (
                              <li key={i} className="flex">
                                <span
                                  className="mr-2"
                                  style={{ color: modernColors.primary }}
                                >
                                  •
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="flex-1 lg:w-2/7 space-y-8">
            {/* Key Achievements */}
            {achievements.length > 0 && (
              <div>
                <h2
                  className="text-lg font-bold uppercase tracking-wider mb-3"
                  style={{ color: modernColors.primary }}
                >
                  Key Achievements
                </h2>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Award
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: modernColors.accent }}
                      />
                      <p className="text-sm">
                        {achievement.title} - {achievement.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2
                  className="text-lg font-bold uppercase tracking-wider mb-3"
                  style={{ color: modernColors.primary }}
                >
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(edu.start_date)} —{" "}
                        {edu.current ? "Present" : formatDate(edu.end_date)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h2
                  className="text-lg font-bold uppercase tracking-wider mb-3"
                  style={{ color: modernColors.primary }}
                >
                  Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{lang.language}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className="w-3 h-3 rounded-sm"
                            style={{
                              backgroundColor:
                                level <=
                                (lang.proficiency === "Native"
                                  ? 5
                                  : lang.proficiency === "Fluent"
                                    ? 4
                                    : lang.proficiency === "Intermediate"
                                      ? 3
                                      : lang.proficiency === "Basic"
                                        ? 2
                                        : 1)
                                  ? modernColors.primary
                                  : `${modernColors.primary}20`,
                            }}
                          ></div>
                        ))}
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
  );
};
