// components/cv/templates/professional.tsx
"use client";

export function ProfessionalTemplate({ data }: { data: any }) {
  return (
    <div className="font-serif p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold">{data.header?.fullName}</h1>
          <h2 className="text-xl text-gray-600">{data.header?.title}</h2>
        </div>
        <div className="w-1/3 text-right">
          <p>{data.header?.email}</p>
          <p>{data.header?.phone}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h3 className="text-xl font-bold border-b border-black mb-4">
            EXPERIENCE
          </h3>
          {data.experience?.map((exp: any, i: number) => (
            <div key={i} className="mb-6">
              <h4 className="font-bold">{exp.jobTitle}</h4>
              <p className="text-gray-600">
                {exp.company} | {exp.period}
              </p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold border-b border-black mb-4">
            EDUCATION
          </h3>
          {data.education?.map((edu: any, i: number) => (
            <div key={i} className="mb-4">
              <h4 className="font-bold">{edu.degree}</h4>
              <p>{edu.institution}</p>
              <p className="text-gray-600">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
