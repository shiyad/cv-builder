// "use client";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";

// export function EducationEditor({
//   data,
//   onChange,
// }: {
//   data: any[];
//   onChange: (value: any[]) => void;
// }) {
//   const handleChange = (index: number, field: string, value: string) => {
//     const updated = [...data];
//     updated[index] = { ...updated[index], [field]: value };
//     onChange(updated);
//   };

//   const addEducation = () => {
//     onChange([...data, { institution: "", degree: "", year: "" }]);
//   };

//   const removeEducation = (index: number) => {
//     const updated = [...data];
//     updated.splice(index, 1);
//     onChange(updated);
//   };

//   return (
//     <div className="space-y-4">
//       {data.map((edu, index) => (
//         <div key={index} className="border rounded-lg p-4 space-y-3">
//           <div className="flex justify-between items-center">
//             <h3 className="font-medium">Education #{index + 1}</h3>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => removeEducation(index)}
//             >
//               <Trash2 className="h-4 w-4 text-red-500" />
//             </Button>
//           </div>
//           <div>
//             <Label>Institution</Label>
//             <Input
//               value={edu.institution || ""}
//               onChange={(e) =>
//                 handleChange(index, "institution", e.target.value)
//               }
//             />
//           </div>
//           <div>
//             <Label>Degree</Label>
//             <Input
//               value={edu.degree || ""}
//               onChange={(e) => handleChange(index, "degree", e.target.value)}
//             />
//           </div>
//           <div>
//             <Label>Year</Label>
//             <Input
//               value={edu.year || ""}
//               onChange={(e) => handleChange(index, "year", e.target.value)}
//             />
//           </div>
//         </div>
//       ))}
//       <Button onClick={addEducation} className="mt-4">
//         Add Education
//       </Button>
//     </div>
//   );
// }

// components/cv/sections/education-editor.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export function EducationEditor({
  data,
  onChange,
}: {
  data: any[];
  onChange: (value: any[]) => void;
}) {
  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        period: "",
        description: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {data.map((edu, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Education #{index + 1}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
          <div>
            <Label>Institution</Label>
            <Input
              value={edu.institution || ""}
              onChange={(e) =>
                handleChange(index, "institution", e.target.value)
              }
            />
          </div>
          <div>
            <Label>Degree</Label>
            <Input
              value={edu.degree || ""}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
            />
          </div>
          <div>
            <Label>Field of Study</Label>
            <Input
              value={edu.field || ""}
              onChange={(e) => handleChange(index, "field", e.target.value)}
            />
          </div>
          <div>
            <Label>Period</Label>
            <Input
              value={edu.period || ""}
              onChange={(e) => handleChange(index, "period", e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <textarea
              value={edu.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border rounded-md p-2 min-h-[100px]"
            />
          </div>
        </div>
      ))}
      <Button onClick={addEducation} className="mt-4">
        Add Education
      </Button>
    </div>
  );
}
