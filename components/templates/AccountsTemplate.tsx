// components/templates/AccountsTemplate.tsx
import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";

export const AccountsTemplate = ({ formData, styles }: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    objective = {},
  } = formData;

  const textColor = styles.colors.text || "#1e293b";
  const primary = styles.colors.primary || "#2563eb";
  const secondary = styles.colors.secondary || "#93c5fd";

  return (
    <div
      id="cv-preview"
      className="w-full text-sm"
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: styles.colors.background,
      }}
    >
      <div className="max-w-4xl mx-auto p-8 text-gray-800">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: primary }}>
            {contact_information.first_name} {contact_information.last_name}
          </h1>
          <p className="text-base text-gray-500">
            {contact_information.job_title}
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500">
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
          <section className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Profile
            </h2>
            <p className="text-gray-600">{objective.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-800">
                    {exp.position} @ {exp.company}
                  </span>
                  <span className="text-gray-500">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-600 mt-1 text-xs">
                  {exp.description
                    ?.split("\n")
                    .map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>
                    {edu.degree}, {edu.institution}
                  </span>
                  <span className="text-gray-500">
                    {formatDate(edu.start_date)} –{" "}
                    {edu.current ? "Present" : formatDate(edu.end_date)}
                  </span>
                </div>
                {edu.field_of_study && (
                  <p className="text-xs text-gray-500">
                    Major: {edu.field_of_study}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
            <ul className="flex flex-wrap gap-2 text-xs text-gray-600">
              {skills.map((skill, index) => (
                <li key={index} className="bg-gray-200 px-2 py-1 rounded">
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Languages
            </h2>
            <ul className="text-xs text-gray-600">
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
