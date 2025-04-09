import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";
import {
  Briefcase,
  Calculator,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const AccountingTemplate = ({ formData, styles }: TemplateProps) => {
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: styles.colors.primary }}
          >
            {contact_information.first_name} {contact_information.last_name}
          </h1>
          <div className="flex justify-center items-center gap-4 mt-2">
            <Calculator
              className="w-5 h-5"
              style={{ color: styles.colors.primary }}
            />
            <p className="text-lg">{contact_information.job_title}</p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2
                className="font-bold text-lg mb-3 flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <span
                  className="w-4 h-0.5 block"
                  style={{ backgroundColor: styles.colors.primary }}
                ></span>
                Contact
              </h2>
              <ul className="space-y-2">
                {contact_information.email && (
                  <li className="flex items-center gap-2">
                    <Mail
                      className="w-4 h-4"
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
                  <li className="flex items-center gap-2">
                    <Phone
                      className="w-4 h-4"
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
                  <li className="flex items-center gap-2">
                    <MapPin
                      className="w-4 h-4"
                      style={{ color: styles.colors.primary }}
                    />
                    <span>{contact_information.address}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2
                className="font-bold text-lg mb-3 flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <span
                  className="w-4 h-0.5 block"
                  style={{ backgroundColor: styles.colors.primary }}
                ></span>
                Skills
              </h2>
              <ul className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: styles.colors.primary }}
                    ></span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Objective */}
            {objective.summary && (
              <div>
                <h2
                  className="font-bold text-lg mb-3 flex items-center gap-2"
                  style={{ color: styles.colors.primary }}
                >
                  <span
                    className="w-4 h-0.5 block"
                    style={{ backgroundColor: styles.colors.primary }}
                  ></span>
                  Professional Summary
                </h2>
                <p className="text-gray-700">{objective.summary}</p>
              </div>
            )}

            {/* Experience */}
            <div>
              <h2
                className="font-bold text-lg mb-3 flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <Briefcase className="w-5 h-5" />
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 pl-4"
                    style={{ borderColor: styles.colors.primary }}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.end_date)}
                      </p>
                    </div>
                    <p className="text-gray-600 mb-2">{exp.company}</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {exp.description
                        ?.split("\n")
                        .map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2
                className="font-bold text-lg mb-3 flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <GraduationCap className="w-5 h-5" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <p className="text-sm text-gray-500">
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
