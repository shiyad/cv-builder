import { TemplateProps } from "@/components/templates";
import { formatDate } from "@/utils/formatDate";
import { Mail } from "lucide-react";
import Image from "next/image";

export const ExecutiveTemplate = ({ formData, styles }: TemplateProps) => {
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
    <div id="cv-preview" className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-sm overflow-hidden border border-gray-200">
        {/* Elegant Header */}
        <div className="p-8 bg-gray-800 text-white text-center">
          <div className="relative w-28 h-28 mx-auto mb-4">
            {/* <Image
              src={
                contact_information?.profile_picture || "/default-profile.png"
              }
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-gray-600"
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
          <h1 className="text-3xl font-light tracking-wider">
            {contact_information?.first_name}{" "}
            <span className="font-bold">{contact_information?.last_name}</span>
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            {contact_information?.job_title}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Contact */}
          <div className="w-full md:w-1/3 p-8 bg-gray-100">
            <div className="space-y-6">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Contact
                </h2>
                <div className="space-y-2 text-sm">
                  {contact_information?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{contact_information.email}</span>
                    </div>
                  )}
                  {/* Other contact items */}
                </div>
              </div>

              {/* Skills with minimal progress indicators */}
              {skills?.length > 0 && (
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                    Core Competencies
                  </h2>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span className="text-gray-500">{skill.level}</span>
                        </div>
                        <div className="w-full bg-gray-200 h-px">
                          <div
                            className="bg-gray-800 h-px"
                            style={{
                              width: `${skillLevelToPercent(skill.level)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="w-full md:w-2/3 p-8">
            {/* Executive Summary */}
            {objective?.summary && (
              <div className="mb-8">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Profile
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {objective.summary}
                </p>
              </div>
            )}

            {/* Experience with elegant timeline */}
            {experience?.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-6 border-l border-gray-300"
                    >
                      <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-gray-800 -ml-1.5"></div>
                      <div className="pl-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{exp.position}</h3>
                          <div className="text-gray-500 text-sm">
                            {formatDate(exp.start_date)} -{" "}
                            {exp.current ? "Present" : formatDate(exp.end_date)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
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
    </div>
  );
};
