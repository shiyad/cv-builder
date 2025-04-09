// components/cv/templates/minimal.tsx
"use client";

export function MinimalTemplate({ data }: { data: any }) {
  return (
    <div className="font-sans p-8 max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-light">{data.header?.fullName}</h1>
        <h2 className="text-lg text-gray-500 mt-2">{data.header?.title}</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-medium border-b border-gray-200 pb-2 mb-4">
            Experience
          </h3>
          {data.experience?.map((exp: any, i: number) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between">
                <h4 className="font-medium">{exp.jobTitle}</h4>
                <span className="text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600">{exp.company}</p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-medium border-b border-gray-200 pb-2 mb-4">
            Education
          </h3>
          {data.education?.map((edu: any, i: number) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h4 className="font-medium">{edu.degree}</h4>
                <span className="text-gray-500">{edu.period}</span>
              </div>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
