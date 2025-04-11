import { formatDate } from "@/utils/formatDate";
import { TemplateProps } from "./types";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const MechanicalEngineerTemplate = ({
  formData,
  styles,
}: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = [],
    objective = {},
    references = [],
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
          className="relative text-white p-6 md:p-8 md:col-span-1"
          style={{ backgroundColor: styles.colors.primary }}
        >
          {/* Angular Gold Decoration */}
          <div
            className="absolute top-0 left-0 w-0 h-0 border-b-[60px] border-r-[60px]"
            style={{
              borderColor: `${styles.colors.secondary} transparent transparent transparent`,
            }}
          />

          {/* Profile Picture */}
          {contact_information.profile_picture && (
            <div className="w-32 h-32 mx-auto mb-6 relative rounded-full overflow-hidden border-4 border-white">
              <img
                src={contact_information.profile_picture}
                alt="Profile"
                className="rounded-full object-cover w-full h-full shadow-lg print:shadow-none"
                crossOrigin="anonymous"
              />
            </div>
          )}

          {/* Name + Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold leading-tight">
              <span className="text-yellow-500">
                {contact_information.first_name}{" "}
              </span>
              {contact_information.last_name}
            </h1>
            <p className="uppercase text-sm font-light">
              {contact_information.job_title}
            </p>
          </div>

          {/* Objective */}
          {objective.summary && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase mb-2 bg-yellow-500 px-2 py-1 rounded-lg">
                Profile
              </h2>
              <p className="text-sm font-light leading-relaxed">
                {objective.summary}
              </p>
            </div>
          )}

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-md font-bold uppercase mb-2 bg-yellow-500 px-2 py-1 rounded-lg">
              Contact
            </h2>
            <div className="space-y-2 text-sm font-light">
              {contact_information.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${contact_information.phone}`}>
                    {contact_information.phone}
                  </a>
                </div>
              )}
              {contact_information.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${contact_information.email}`}>
                    {contact_information.email}
                  </a>
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
              {contact_information.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{contact_information.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase mb-2 bg-yellow-500 px-2 py-1 rounded-lg">
                Skills
              </h2>
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
              <h2 className="text-md font-bold uppercase mb-2 bg-yellow-500 px-2 py-1 rounded-lg">
                Languages
              </h2>
              <ul className="space-y-1 font-light">
                {languages.map((lang, idx) => (
                  <li key={idx}>
                    {lang.language} - {lang.proficiency}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* MAIN SECTION */}
        <div
          className="p-6 md:p-8 md:col-span-2"
          style={{ backgroundColor: styles.colors.cardBackground }}
        >
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-10 bg-white rounded-xl p-6 shadow-md">
              <div className="relative mb-4">
                <h2
                  className="text-xl font-bold uppercase relative z-10"
                  style={{ color: styles.colors.primary }}
                >
                  Experience
                </h2>
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: styles.colors.secondary }}
                />
              </div>

              {/* <div className="space-y-6">
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
              </div> */}
              <div className="space-y-6 print:space-y-4">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-black"
                  >
                    <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full bg-black" />
                    <div className="mb-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-bold text-black print:text-sm">
                          {exp.position}
                        </h3>
                        <div className="text-xs text-yellow-500 bg-gray-900 px-2 py-1 rounded print:text-2xs">
                          {formatDate(exp.start_date)} →{" "}
                          {exp.current ? "present" : formatDate(exp.end_date)}
                        </div>
                      </div>
                      <p className="text-sm text-yellow-500 print:text-xs">
                        @ {exp.company}
                      </p>
                    </div>
                    {exp.description && (
                      <ul className="mt-2 pl-0 text-sm text-gray-300 space-y-2 print:text-xs">
                        {exp.description.split("\n").map((item, i) => (
                          <li key={i} className="flex">
                            <span className="text-gray-500 mr-2">-</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6 bg-white rounded-xl p-6 shadow-md">
              <div className="relative mb-4">
                <h2
                  className="text-xl font-bold uppercase relative z-10"
                  style={{ color: styles.colors.primary }}
                >
                  Education
                </h2>
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: styles.colors.secondary }}
                />
              </div>

              <div className="space-y-6 print:space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-black"
                  >
                    <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full bg-black" />
                    <div className="mb-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-bold text-black print:text-sm">
                          {edu.degree}
                        </h3>
                        <div className="text-xs text-yellow-500 bg-gray-900 px-2 py-1 rounded print:text-2xs">
                          {formatDate(edu.start_date)} →{" "}
                          {edu.current ? "present" : formatDate(edu.end_date)}
                        </div>
                      </div>
                      <p className="text-sm text-yellow-500 print:text-xs">
                        @ {edu.institution}
                      </p>
                    </div>
                    {edu.description && (
                      <ul className="mt-2 pl-0 text-sm text-gray-300 space-y-2 print:text-xs">
                        {edu.description.split("\n").map((item, i) => (
                          <li key={i} className="flex">
                            <span className="text-gray-500 mr-2">-</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-6 bg-white rounded-xl p-6 shadow-md">
              <div className="relative mb-4">
                <h2
                  className="text-xl font-bold uppercase relative z-10"
                  style={{ color: styles.colors.primary }}
                >
                  Certifications
                </h2>
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: styles.colors.secondary }}
                />
              </div>

              <div className="space-y-6 print:space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-black"
                  >
                    <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full bg-black" />
                    <div className="mb-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-bold text-black print:text-sm">
                          {cert.name}
                        </h3>
                      </div>
                      <p className="text-sm text-yellow-500 print:text-xs">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-gray-500 print:text-xs">
                        {cert.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reference */}
          {references.length > 0 && (
            <div className="mb-6 bg-white rounded-xl p-6 shadow-md">
              <div className="relative mb-4">
                <h2
                  className="text-xl font-bold uppercase relative z-10"
                  style={{ color: styles.colors.primary }}
                >
                  References
                </h2>
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: styles.colors.secondary }}
                />
              </div>

              <div className="space-y-6 print:space-y-4">
                {references.map((refer, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-black"
                  >
                    <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full bg-black" />
                    <div className="mb-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-bold text-black print:text-sm">
                          {refer.name}
                        </h3>
                      </div>
                      <p className="text-sm text-yellow-500 print:text-xs">
                        @ {refer.company}
                      </p>
                      <p className="text-sm text-yellow-500 print:text-xs">
                        {refer.position}
                      </p>
                      <p className="text-sm text-yellow-500 print:text-xs">
                        {refer.contact}
                      </p>
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
