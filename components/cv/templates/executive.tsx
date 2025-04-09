// components/cv/templates/executive.tsx
"use client";

export function ExecutiveTemplate({ data }: { data: any }) {
  return (
    <div className="font-serif p-8 max-w-5xl mx-auto bg-white">
      <div className="grid grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="col-span-1 bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{data.header?.fullName}</h1>
            <h2 className="text-gray-600">{data.header?.title}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold uppercase text-sm mb-2">Contact</h3>
              <p>{data.header?.email}</p>
              <p>{data.header?.phone}</p>
            </div>

            {data.skills?.length > 0 && (
              <div>
                <h3 className="font-bold uppercase text-sm mb-2">
                  Core Skills
                </h3>
                <ul className="space-y-1">
                  {data.skills.map((skill: any, i: number) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3">
          {data.summary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold border-b border-black mb-4">
                PROFILE
              </h3>
              <p className="text-gray-700">{data.summary}</p>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-bold border-b border-black mb-4">
              PROFESSIONAL EXPERIENCE
            </h3>
            {data.experience?.map((exp: any, i: number) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between">
                  <h4 className="font-bold">
                    {exp.jobTitle} | {exp.company}
                  </h4>
                  <span className="text-gray-600">{exp.period}</span>
                </div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold border-b border-black mb-4">
              EDUCATION
            </h3>
            {data.education?.map((edu: any, i: number) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <span className="text-gray-600">{edu.period}</span>
                </div>
                <p>{edu.institution}</p>
                {edu.field && <p className="text-gray-600">{edu.field}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
