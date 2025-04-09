// components/templates/PilotTemplate.tsx
import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";

export const PilotTemplate = ({ formData, styles }: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    objective = {},
  } = formData;

  const primary = styles.colors.primary || "#2563eb";
  const bg = styles.colors.background || "#f0f4f8";

  return (
    <div
      id="cv-preview"
      className="w-full text-gray-800"
      style={{ backgroundColor: bg, fontFamily: "monospace" }}
    >
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-800 uppercase">
            {contact_information.first_name} {contact_information.last_name}
          </h1>
          <p className="text-sm text-gray-600">
            {contact_information.job_title}
          </p>
          <div className="mt-2 text-xs text-gray-600 flex justify-center gap-4">
            {contact_information.email && (
              <span>{contact_information.email}</span>
            )}
            {contact_information.phone && (
              <span>{contact_information.phone}</span>
            )}
            {contact_information.address && (
              <span>{contact_information.address}</span>
            )}
          </div>
        </div>

        {/* Objective */}
        {objective.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Flight Summary
            </h2>
            <p className="text-sm text-gray-700">{objective.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              Flight Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span>
                      {exp.position} - {exp.company}
                    </span>
                    <span className="text-gray-500">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.current ? "Now" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                      {exp.description.split("\n").map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="text-sm font-medium">
                  {edu.degree}, {edu.institution}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(edu.start_date)} –{" "}
                  {edu.current ? "Present" : formatDate(edu.end_date)}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Flight Systems & Skills
            </h2>
            <ul className="flex flex-wrap gap-2 text-xs">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Languages
            </h2>
            <ul className="text-xs text-gray-700">
              {languages.map((lang, index) => (
                <li key={index}>
                  {lang.language} - {lang.proficiency}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
