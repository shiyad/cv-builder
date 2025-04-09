import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";
import {
  Plane,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

export const PilotModernTemplate = ({ formData, styles }: TemplateProps) => {
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
      className="w-full bg-white p-8 font-sans"
      style={{ color: styles.colors.text }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header with aviation theme */}
        <div
          className="mb-8 border-b pb-6"
          style={{ borderColor: styles.colors.primary }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold uppercase tracking-wider"
                style={{ color: styles.colors.primary }}
              >
                {contact_information.first_name} {contact_information.last_name}
              </h1>
              <p className="text-lg font-medium">
                {contact_information.job_title}
              </p>
            </div>
            <Plane
              className="w-10 h-10"
              style={{ color: styles.colors.primary }}
            />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact */}
            <div>
              <h2
                className="font-bold text-lg mb-3 uppercase tracking-wider"
                style={{ color: styles.colors.primary }}
              >
                Flight Details
              </h2>
              <ul className="space-y-3">
                {contact_information.email && (
                  <li className="flex items-start gap-2">
                    <Mail
                      className="w-4 h-4 mt-0.5"
                      style={{ color: styles.colors.primary }}
                    />
                    <a
                      href={`mailto:${contact_information.email}`}
                      className="hover:underline"
                    >
                      {contact_information.email}
                    </a>
                  </li>
                )}
                {contact_information.phone && (
                  <li className="flex items-start gap-2">
                    <Phone
                      className="w-4 h-4 mt-0.5"
                      style={{ color: styles.colors.primary }}
                    />
                    <a
                      href={`tel:${contact_information.phone}`}
                      className="hover:underline"
                    >
                      {contact_information.phone}
                    </a>
                  </li>
                )}
                {contact_information.address && (
                  <li className="flex items-start gap-2">
                    <MapPin
                      className="w-4 h-4 mt-0.5"
                      style={{ color: styles.colors.primary }}
                    />
                    <span>{contact_information.address}</span>
                  </li>
                )}
                {contact_information.website && (
                  <li className="flex items-start gap-2">
                    <Globe
                      className="w-4 h-4 mt-0.5"
                      style={{ color: styles.colors.primary }}
                    />
                    <a
                      href={contact_information.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {contact_information.website.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Certifications (Skills) */}
            <div>
              <h2
                className="font-bold text-lg mb-3 uppercase tracking-wider"
                style={{ color: styles.colors.primary }}
              >
                Certifications
              </h2>
              <ul className="space-y-2">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: styles.colors.primary }}
                    ></span>
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-xs text-gray-500">
                        ({skill.level})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Flight Summary (Objective) */}
            {objective.summary && (
              <div>
                <h2
                  className="font-bold text-lg mb-3 uppercase tracking-wider flex items-center gap-2"
                  style={{ color: styles.colors.primary }}
                >
                  <Plane className="w-5 h-5" />
                  Flight Summary
                </h2>
                <p className="text-gray-700">{objective.summary}</p>
              </div>
            )}

            {/* Flight Experience */}
            <div>
              <h2
                className="font-bold text-lg mb-4 uppercase tracking-wider flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <Briefcase className="w-5 h-5" />
                Flight Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.end_date)}
                      </p>
                    </div>
                    {exp.description && (
                      <ul className="mt-2 pl-5 list-disc space-y-1 text-gray-700">
                        {exp.description.split("\n").map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Training & Education */}
            <div>
              <h2
                className="font-bold text-lg mb-3 uppercase tracking-wider flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <GraduationCap className="w-5 h-5" />
                Training & Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <p className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(edu.start_date)} -{" "}
                      {edu.current ? "Present" : formatDate(edu.end_date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
