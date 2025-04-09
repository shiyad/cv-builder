import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react";
import { ProgressBar } from "./common/ProgressBar";
import { TemplateProps } from "./types";
import { formatDate } from "@/utils/formatDate";

export const ClassicTemplate = ({ formData, styles }: TemplateProps) => {
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
        {/* Header */}
        <div
          className="p-6 flex items-center gap-6"
          style={{ backgroundColor: styles.colors.primary }}
        >
          <div className="relative w-20 h-20">
            {/* <Image
              src={
                contact_information.profile_picture || "/default-profile.png"
              }
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-white"
              priority
            /> */}
            <img
              src={contact_information.profile_picture}
              alt="Profile"
              className="object-cover w-full h-full"
              style={{
                borderColor: styles.colors.primary,
              }}
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {contact_information.first_name} {contact_information.last_name}
            </h1>
            <p className="text-lg text-white opacity-90">
              {contact_information.job_title}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {contact_information.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{contact_information.email}</span>
              </div>
            )}
            {contact_information.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{contact_information.phone}</span>
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
                <a
                  href={contact_information.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {contact_information.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Objective */}
          {objective.summary && (
            <div>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: styles.colors.primary }}
              >
                Objective
              </h2>
              <p className="text-gray-700">{objective.summary}</p>
            </div>
          )}

          {/* Experience - Now safely accessed with default empty array */}
          {experience.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <Briefcase className="w-5 h-5" />
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 pl-4"
                    style={{ borderColor: styles.colors.secondary }}
                  >
                    <div className="flex justify-between items-start">
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
                ))}
              </div>
            </div>
          )}

          {/* Education - Now safely accessed with default empty array */}
          {education.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <GraduationCap className="w-5 h-5" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-2 pl-4"
                    style={{ borderColor: styles.colors.secondary }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <div className="text-gray-500 text-sm">
                        {formatDate(edu.start_date)} -{" "}
                        {edu.current ? "Present" : formatDate(edu.end_date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - Now safely accessed with default empty array */}
          {skills.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: styles.colors.primary }}
              >
                <Star className="w-5 h-5" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: styles.colors.secondary }}
                  >
                    {skill.name} {skill.level && `(${skill.level})`}
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
