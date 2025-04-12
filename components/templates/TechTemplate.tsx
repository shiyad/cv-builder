import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";

export const TechTemplate = ({ formData, styles }: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    objective = {},
  } = formData;

  // Tech-inspired color scheme
  const techColors = {
    primary: styles.colors.primary || "#3B82F6",
    secondary: styles.colors.secondary || "#1E40AF",
    background: "#0F172A",
    text: "#E2E8F0",
    accent: "#10B981",
    code: "#1E293B",
  };

  const renderTechSkill = (skill: { name: string; level?: string }) => (
    <div key={skill.name} className="mb-3">
      <div className="flex justify-between font-mono text-xs mb-1">
        <span className="text-cyan-300">
          const{" "}
          <span className="text-purple-300">
            {skill.name.replace(/\s+/g, "_")}
          </span>{" "}
          =
        </span>
        <span className="text-yellow-200">
          '{skill.level || "proficient"}';
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ width: `${getSkillWidth(skill.level)}%` }}
        />
      </div>
    </div>
  );

  const getSkillWidth = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "expert":
        return 90;
      case "advanced":
        return 75;
      case "intermediate":
        return 50;
      case "beginner":
        return 25;
      default:
        return 60;
    }
  };

  return (
    <div
      id="cv-preview"
      className="w-full bg-gray-900 text-gray-100 font-mono"
      style={{
        backgroundColor: techColors.background,
        color: techColors.text,
      }}
    >
      {/* Terminal-like header */}
      <div
        className="bg-gray-800 p-4 flex items-center border-b border-gray-700 print:border-0"
        style={{ backgroundColor: techColors.code }}
      >
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-gray-400">
          _{contact_information.first_name}_{contact_information.last_name}.js
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto print:p-0 print:max-w-full">
        {/* Two-column layout - matches TwoColumnTemplate structure */}
        <div className="flex flex-col md:flex-row print:flex-row gap-0 print:gap-0">
          {/* Left Column - Sidebar (30%) */}
          <div
            className="w-full md:w-1/3 p-6 print:p-4 print:w-1/3"
            style={
              {
                //backgroundColor: techColors.code,
                //borderRight: `1px solid ${techColors.primary}30`,
              }
            }
          >
            {/* Profile section */}
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4 rounded-full border-4 border-cyan-400 overflow-hidden">
                  <img
                    src={contact_information.profile_picture}
                    alt="Profile"
                    className="object-cover w-full h-full"
                    crossOrigin="anonymous"
                  />
                </div>
                <h1 className="text-xl font-bold text-center text-cyan-400">
                  {contact_information.first_name}_
                  {contact_information.last_name}
                </h1>
                <p className="text-sm text-center text-gray-400 mt-1">
                  {contact_information.job_title}
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-6">
              <h2 className="text-sm font-bold text-gray-400 mb-3">
                // CONTACT_INFO
              </h2>
              <ul className="text-xs text-green-400 space-y-1 font-mono">
                {contact_information.email && (
                  <li>
                    <span className="text-gray-400">email:</span>{" "}
                    {contact_information.email}
                  </li>
                )}
                {contact_information.phone && (
                  <li>
                    <span className="text-gray-400">phone:</span>{" "}
                    {contact_information.phone}
                  </li>
                )}
                {contact_information.address && (
                  <li>
                    <span className="text-gray-400">location:</span>{" "}
                    {contact_information.address}
                  </li>
                )}
                {contact_information.website && (
                  <li>
                    <span className="text-gray-400">website:</span>{" "}
                    {contact_information.website}
                  </li>
                )}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-6">
              <h2 className="text-sm font-bold text-gray-400 mb-3">
                /* TECH_STACK */
              </h2>
              <div className="space-y-4">
                {skills.map((skill, index) =>
                  renderTechSkill(skill as { name: string; level?: string })
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content (70%) */}
          <div className="w-full md:w-2/3 p-6 print:p-4 print:w-2/3">
            {/* Professional Summary */}
            {objective.summary && (
              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-6 print:mb-4">
                <h2 className="text-sm font-bold text-gray-400 mb-3">
                  # PROFESSIONAL_SUMMARY
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed print:text-xs">
                  {objective.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-6 print:mb-4">
                <h2 className="text-sm font-bold text-gray-400 mb-3">
                  $ EXPERIENCE_HISTORY
                </h2>
                <div className="space-y-6 print:space-y-4">
                  {experience.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-6 border-l-2 border-cyan-400"
                    >
                      <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full bg-cyan-400" />
                      <div className="mb-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-bold text-cyan-200 print:text-sm">
                            {exp.position}
                          </h3>
                          <div className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded print:text-2xs">
                            {formatDate(exp.start_date)} →{" "}
                            {exp.current ? "present" : formatDate(exp.end_date)}
                          </div>
                        </div>
                        <p className="text-sm text-purple-300 print:text-xs">
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
              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                <h2 className="text-sm font-bold text-gray-400 mb-3">
                  // EDUCATION_BACKGROUND
                </h2>
                <div className="space-y-4 print:space-y-2">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <h3 className="text-base font-bold text-cyan-200 print:text-sm">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-purple-300 print:text-xs">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded print:text-2xs">
                        {formatDate(edu.start_date)} →{" "}
                        {edu.current ? "present" : formatDate(edu.end_date)}
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
