// components/cv/templates/creative.tsx
"use client";

export function CreativeTemplate({ data }: { data: any }) {
  return (
    <div className="font-sans p-8 max-w-4xl mx-auto bg-white">
      {/* Header with accent color */}
      <div className="bg-blue-600 text-white p-8 rounded-t-lg">
        <h1 className="text-4xl font-bold">{data.header?.fullName}</h1>
        <h2 className="text-xl opacity-90">{data.header?.title}</h2>
        <div className="flex gap-4 mt-4 text-sm">
          <span>{data.header?.email}</span>
          <span>•</span>
          <span>{data.header?.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 rounded-b-lg">
        {/* Left Column */}
        <div className="md:col-span-2 p-8">
          {data.summary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-blue-600">ABOUT ME</h3>
              <p className="text-gray-700">{data.summary}</p>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-blue-600">EXPERIENCE</h3>
            {data.experience?.map((exp: any, i: number) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{exp.jobTitle}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gray-50 p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-blue-600">EDUCATION</h3>
            {data.education?.map((edu: any, i: number) => (
              <div key={i} className="mb-4">
                <h4 className="font-bold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.period}</p>
              </div>
            ))}
          </div>

          {data.skills?.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">SKILLS</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: any, i: number) => (
                  <span
                    key={i}
                    className="bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
