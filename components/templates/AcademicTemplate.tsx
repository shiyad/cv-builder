import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";
import {
  BookOpen,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Award,
  FileText,
} from "lucide-react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export const AcademicTemplate = ({ formData, styles }: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    publications = [],
    certifications = [],
    objective = {},
  } = formData;

  return (
    <div
      id="cv-preview"
      className="w-full bg-white p-8 font-serif"
      style={{
        color: styles.colors.text,
        backgroundColor: styles.colors.background,
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-8 border-b pb-4"
          style={{ borderColor: styles.colors.primary }}
        >
          <h1
            className="text-3xl font-bold"
            style={{ color: styles.colors.primary }}
          >
            {contact_information.first_name} {contact_information.last_name}
          </h1>
          <div className="flex justify-center items-center gap-2 mt-2">
            <BookOpen
              className="w-5 h-5"
              style={{ color: styles.colors.primary }}
            />
            <p className="text-lg">{contact_information.job_title}</p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - 1/4 width */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact */}
            <div>
              <h2
                className="font-bold text-sm uppercase tracking-wider mb-3"
                style={{ color: styles.colors.primary }}
              >
                Contact
              </h2>
              <ul className="space-y-2 text-sm">
                {contact_information.email && (
                  <li className="flex items-start gap-2">
                    <Mail
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
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
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
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
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: styles.colors.primary }}
                    />
                    <span>{contact_information.address}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Education */}
            <div>
              <h2
                className="font-bold text-sm uppercase tracking-wider mb-3"
                style={{ color: styles.colors.primary }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-sm">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(edu.start_date)} -{" "}
                      {edu.current ? "Present" : formatDate(edu.end_date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2
                className="font-bold text-sm uppercase tracking-wider mb-3"
                style={{ color: styles.colors.primary }}
              >
                Research Skills
              </h2>
              <ul className="space-y-1 text-sm">
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

          {/* Right Column - 3/4 width */}
          <div className="md:col-span-3 space-y-8">
            {/* Research Objective */}
            {objective.summary && (
              <div>
                <h2
                  className="font-bold text-lg mb-3 flex items-center gap-2"
                  style={{ color: styles.colors.primary }}
                >
                  <FileText className="w-5 h-5" />
                  Research Profile
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {objective.summary}
                </p>
              </div>
            )}

            {/* Academic Experience */}
            {experience.length > 0 && (
              <div>
                <h2
                  className="font-bold text-lg mb-4 flex items-center gap-2"
                  style={{ color: styles.colors.primary }}
                >
                  <BookOpen className="w-5 h-5" />
                  Academic Appointments
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
            )}

            {/* Publications */}
            {publications?.length > 0 && (
              <div>
                <h2
                  className="font-bold text-lg mb-3 flex items-center gap-2"
                  style={{ color: styles.colors.primary }}
                >
                  <FileText className="w-5 h-5" />
                  Selected Publications
                </h2>
                <ul className="space-y-3">
                  {publications.map((pub, index) => (
                    <li key={index} className="text-sm">
                      <p className="font-medium">{pub.title}</p>
                      <p className="text-gray-600">
                        {pub.title}, {pub.date}
                      </p>
                      {pub.publisher && (
                        <p className="text-xs text-gray-500">
                          PUB: {pub.publisher}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
              <div>
                <h2
                  className="font-bold text-lg mb-3 flex items-center gap-2"
                  style={{ color: styles.colors.primary }}
                >
                  <Award className="w-5 h-5" />
                  Certifications & Memberships
                </h2>
                <ul className="space-y-2">
                  {certifications.map((cert, index) => (
                    <li key={index} className="text-sm">
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-gray-600">
                        {cert.issuer}, {cert.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
