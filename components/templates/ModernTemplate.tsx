import Image from "next/image";
import { ProgressBar } from "./common/ProgressBar";
import { TemplateProps } from "./types";
import { formatDate } from "@/utils/formatDate";

export const ModernTemplate = ({ formData, styles }: TemplateProps) => {
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
      className="p-8 min-h-screen"
      style={{ backgroundColor: styles.colors.background }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Centered Header */}
        <div
          className="p-8 text-center"
          style={{ backgroundColor: styles.colors.primary }}
        >
          <div className="relative w-24 h-24 mx-auto mb-4">
            {/* <Image
              src={
                contact_information?.profile_picture || "/default-profile.png"
              }
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-white"
            /> */}
            <img
              src={contact_information.profile_picture}
              alt="Profile"
              className="object-cover w-full h-full border-4 border-white shadow-lg"
              style={{
                borderColor: styles.colors.cardBackground,
              }}
              crossOrigin="anonymous"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {contact_information?.first_name} {contact_information?.last_name}
          </h1>
          <p className="text-lg text-white opacity-90">
            {contact_information?.job_title}
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Contact Info */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {/* Contact items same as ClassicTemplate */}
          </div>

          {/* Experience with timeline style */}
          {experience?.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold mb-6"
                style={{ color: styles.colors.primary }}
              >
                Professional Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-8">
                    <div
                      className="absolute left-0 top-1 w-4 h-4 rounded-full"
                      style={{ backgroundColor: styles.colors.primary }}
                    ></div>
                    <div
                      className="border-l-2 pl-6"
                      style={{ borderColor: styles.colors.secondary }}
                    >
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium">{exp.position}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {formatDate(exp.start_date)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.end_date)}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="mt-2 text-gray-700">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills with progress bars */}
          {skills?.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: styles.colors.primary }}
              >
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span className="text-gray-500">{skill.level}</span>
                    </div>
                    <ProgressBar
                      level={skill.level}
                      primaryColor={styles.colors.primary}
                      secondaryColor={styles.colors.secondary}
                    />
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
