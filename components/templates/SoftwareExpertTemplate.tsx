import { TemplateProps } from "./types";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const SoftwareExpertTemplate = ({ formData, styles }: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    references = [],
    objective = {},
  } = formData;

  return (
    <div
      id="cv-preview"
      className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative font-sans"
      style={{
        backgroundColor: styles.colors.background,
        color: styles.colors.text,
      }}
    >
      {/* Profile Picture */}
      {contact_information.profile_picture && (
        <div
          className="absolute left-6 top-6 w-32 h-32 rounded-full border-4 z-20 shadow-md"
          style={{ borderColor: styles.colors.background }}
        >
          <img
            src={contact_information.profile_picture}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}

      {/* Row 1: Name & Title */}
      <div
        className="pl-44 pr-6 py-6"
        style={{
          backgroundColor: styles.colors.primary,
          color: styles.colors.primaryText,
        }}
      >
        <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
          {contact_information.first_name || "Morgan"}{" "}
          {contact_information.last_name || "Maxwell"}
        </h1>
        <p className="text-lg tracking-wide text-white">
          {contact_information.job_title || "Software Expert"}
        </p>
      </div>

      {/* Row 2: Contact + Summary */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 relative px-6 pt-20 pb-6 text-sm"
        style={{ backgroundColor: styles.colors.secondary }}
      >
        {/* Vertical divider */}
        <div
          className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px"
          style={{ backgroundColor: styles.colors.background }}
        />

        {/* Left: Contact */}
        <div className="space-y-4 pr-4">
          {contact_information.phone && (
            <div className="flex items-start gap-3 font-bold">
              <Phone
                className="w-4 h-4"
                style={{ color: styles.colors.primary, strokeWidth: "3px" }}
              />
              <span>{contact_information.phone}</span>
            </div>
          )}
          {contact_information.address && (
            <div className="flex items-start gap-3 font-bold">
              <MapPin
                className="w-4 h-4"
                style={{ color: styles.colors.primary, strokeWidth: "3px" }}
              />
              <span>{contact_information.address}</span>
            </div>
          )}
          {contact_information.email && (
            <div className="flex items-start gap-3 font-bold">
              <Mail
                className="w-4 h-4"
                style={{ color: styles.colors.primary, strokeWidth: "3px" }}
              />
              <span>{contact_information.email}</span>
            </div>
          )}
          {contact_information.website && (
            <div className="flex items-start gap-3 font-bold">
              <Globe
                className="w-4 h-4"
                style={{ color: styles.colors.primary, strokeWidth: "3px" }}
              />
              <span>{contact_information.website}</span>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="pl-4 space-y-3">
          {objective.summary && <p>{objective.summary}</p>}
          {skills.length > 0 && (
            <div>
              <p
                className="font-bold uppercase mb-1"
                style={{ color: styles.colors.primary }}
              >
                Areas of Expertise
              </p>
              <p>{skills.map((skill) => skill.name).join(", ")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Education + Work Experience */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 relative px-6 py-6 text-sm bg-[#A7AFB6]"
        style={{ backgroundColor: "#A7AFB6" }}
      >
        {/* Vertical divider */}
        <div
          className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px"
          style={{ backgroundColor: styles.colors.background }}
        />

        {/* Education */}
        <div className="pr-4">
          <h2
            className="text-lg font-bold uppercase mb-2"
            style={{ color: styles.colors.primary }}
          >
            Educational History
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className={idx < education.length - 1 ? "mb-4" : ""}>
              <h3 className="font-semibold text-white">
                {edu.institution || "University Name"}
              </h3>
              <p>
                {edu.degree || "Degree"}, {edu.start_date} - {edu.end_date}
              </p>
              {edu.description && (
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {edu.description.split("\n").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="pl-4">
          <h2
            className="text-lg font-bold uppercase mb-2"
            style={{ color: styles.colors.primary }}
          >
            Professional History
          </h2>
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className={idx < experience.length - 1 ? "mb-4" : ""}
            >
              <h3 className="font-semibold text-white">
                {exp.position || "Position"}
              </h3>
              <p>
                {exp.company || "Company"} | {exp.start_date} -{" "}
                {exp.current ? "Present" : exp.end_date}
              </p>
              {exp.description && (
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {exp.description.split("\n").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: References */}
      {references.length > 0 && (
        <div
          className="px-6 py-6"
          style={{ backgroundColor: styles.colors.secondary }}
        >
          <h2
            className="text-lg font-bold uppercase mb-2"
            style={{ color: styles.colors.primary }}
          >
            Character References
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            {references.map((ref, idx) => (
              <div key={idx}>
                <p>
                  <strong>{ref.name || "Reference Name"}</strong>
                  <br />
                  {ref.position || "Position"}, {ref.company || "Company"}
                  <br />
                  {ref.contact || "Email"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
