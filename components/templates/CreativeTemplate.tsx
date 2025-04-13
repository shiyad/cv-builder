import { TemplateProps } from "./types";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

export const CreativeTemplate = ({ formData, styles }: TemplateProps) => {
  const {
    contact_information = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    objective = {},
  } = formData;

  // Helper function to convert skill level to percentage
  const skillLevelToPercent = (level?: string): number => {
    if (!level) return 0;
    switch (level.toLowerCase()) {
      case "expert":
        return 90;
      case "advanced":
        return 75;
      case "intermediate":
        return 50;
      case "beginner":
        return 25;
      default:
        return 0;
    }
  };

  // Custom progress bar style based on template
  const progressBarStyle = {
    background: `${styles.colors.primary}`,
    boxShadow: `0 2px 4px rgba(0,0,0,0.4)`,
  };

  return (
    <div
      id="cv-preview"
      className="p-8 min-h-screen"
      style={{ backgroundColor: styles.colors.background }}
    >
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Sidebar (Creative Accent) */}
        <div
          className="w-full md:w-2/5 p-8"
          style={{
            backgroundColor: styles.colors.primary,
            color: "white",
          }}
        >
          <div className="relative w-40 h-40 mx-auto mb-6">
            {/* <Image
              src={
                contact_information?.profile_picture || "/default-profile.png"
              }
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-white shadow-xl"
            /> */}
            <img
              src={
                contact_information.profile_picture || "/opengraph-image7.png"
              }
              alt="Profile"
              className="object-cover w-full h-full"
              style={{
                borderColor: styles.colors.primary,
              }}
              crossOrigin="anonymous"
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-1">
            {contact_information?.first_name} {contact_information?.last_name}
          </h1>
          <p className="text-center opacity-90 mb-8">
            {contact_information?.job_title}
          </p>

          {/* Creative skill circles */}
          {skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-center">Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-2">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#e0e0e0"
                          strokeWidth="2"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray={`${skillLevelToPercent(skill.level)} 100`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {skillLevelToPercent(skill.level)}%
                      </span>
                    </div>
                    <span className="text-sm text-center">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/5 p-8">
          {/* Experience with creative timeline */}
          {experience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6 relative">
                <span
                  className="relative z-10 px-2"
                  style={{ backgroundColor: "white" }}
                >
                  Work Experience
                </span>
                <span className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-0"></span>
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-8">
                    <div
                      className="absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: styles.colors.primary }}
                    >
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                    <div className="pl-6">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{exp.position}</h3>
                        <div className="text-gray-500 text-sm">
                          {formatDate(exp.start_date)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.end_date)}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">
                        {exp.company}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 text-sm mt-2">
                          {exp.description}
                        </p>
                      )}
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
