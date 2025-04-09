import { formatDate } from "@/utils/formatDate";
import { TemplateProps } from "./types";
import { ProgressBar } from "./common/ProgressBar";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const TwoColumnShaderTemplate = ({
  formData,
  styles,
}: TemplateProps) => {
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
      className="w-full font-sans text-sm"
      style={{
        backgroundColor: styles.colors.background,
        color: styles.colors.text,
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 min-h-screen shadow-lg print:shadow-none">
        {/* LEFT SIDEBAR */}
        <div
          className="text-white p-6 md:p-8 md:col-span-1"
          style={{ backgroundColor: styles.colors.primary }}
        >
          {/* Profile Picture */}
          {contact_information.profile_picture && (
            <div className="w-32 h-32 mx-auto mb-6 relative rounded-full overflow-hidden border-4 border-white">
              {/* <Image
                src={contact_information.profile_picture}
                alt="Profile"
                fill
                className="object-cover"
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

          {/* Objective */}
          {objective.summary && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase mb-2">Objective</h2>
              <p className="text-sm text-white font-light leading-relaxed">
                {objective.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase mb-2">Skills</h2>
              <ul className="space-y-1 font-light">
                {skills.map((skill, idx) => (
                  <li key={idx}>• {skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase mb-2">Languages</h2>
              <ul className="space-y-1 font-light">
                {languages.map((lang, idx) => (
                  <li key={idx}>
                    {lang.language} - {lang.proficiency}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h2 className="text-md font-bold uppercase mb-2">Contact</h2>
            <div className="space-y-2 text-sm font-light">
              {contact_information.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${contact_information.email}`}>
                    {contact_information.email}
                  </a>
                </div>
              )}
              {contact_information.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${contact_information.phone}`}>
                    {contact_information.phone}
                  </a>
                </div>
              )}
              {contact_information.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{contact_information.address}</span>
                </div>
              )}
              {contact_information.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <a href={contact_information.website} target="_blank">
                    {contact_information.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN RIGHT SECTION */}
        <div
          className="p-6 md:p-8 md:col-span-2"
          style={{ backgroundColor: styles.colors.cardBackground }}
        >
          {/* Name and Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              {contact_information.first_name} {contact_information.last_name}
            </h1>
            <p className="text-md font-medium text-gray-700">
              {contact_information.job_title}
            </p>
          </div>

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2
                className="text-xl font-bold uppercase mb-4"
                style={{ color: styles.colors.primary }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-semibold">
                      <div>
                        <p>{exp.position}</p>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-gray-500 whitespace-nowrap">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.end_date)}
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                      {exp.description
                        ?.split("\n")
                        .map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2
                className="text-xl font-bold uppercase mb-4"
                style={{ color: styles.colors.primary }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-gray-500 whitespace-nowrap">
                      {formatDate(edu.start_date)} -{" "}
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
  );
};
