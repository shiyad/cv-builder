import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";

export const MinimalistTemplate = ({ formData, styles }: TemplateProps) => {
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
      className="w-full p-8 font-sans"
      style={{
        color: styles.colors.text,
        backgroundColor: styles.colors.background,
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-light tracking-tight"
            style={{ color: styles.colors.primary }}
          >
            {contact_information.first_name}{" "}
            <span className="font-medium">{contact_information.last_name}</span>
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            {contact_information.job_title}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Column - 2/5 width */}
          <div className="md:col-span-2 space-y-8">
            {/* Contact */}
            <div>
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: styles.colors.primary }}
              >
                Contact
              </h2>
              <ul className="space-y-2 text-sm">
                {contact_information.email && (
                  <li className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
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
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
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
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{contact_information.address}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2
                  className="text-xs font-medium uppercase tracking-wider mb-3"
                  style={{ color: styles.colors.primary }}
                >
                  Skills
                </h2>
                <ul className="space-y-2 text-sm">
                  {skills.map((skill, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-gray-500 text-xs">
                          {skill.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2
                  className="text-xs font-medium uppercase tracking-wider mb-3"
                  style={{ color: styles.colors.primary }}
                >
                  Education
                </h2>
                <div className="space-y-4 text-sm">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(edu.start_date)} -{" "}
                        {edu.current ? "Present" : formatDate(edu.end_date)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - 3/5 width */}
          <div className="md:col-span-3 space-y-8">
            {/* Summary */}
            {objective.summary && (
              <div>
                <h2
                  className="text-xs font-medium uppercase tracking-wider mb-3"
                  style={{ color: styles.colors.primary }}
                >
                  Profile
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {objective.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <h2
                  className="text-xs font-medium uppercase tracking-wider mb-3"
                  style={{ color: styles.colors.primary }}
                >
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{exp.position}</h3>
                        <p className="text-xs text-gray-500">
                          {formatDate(exp.start_date)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.end_date)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      {exp.description && (
                        <ul className="mt-2 space-y-1 text-sm text-gray-700">
                          {exp.description.split("\n").map((item, i) => (
                            <li key={i} className="flex">
                              <span className="mr-2">-</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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
