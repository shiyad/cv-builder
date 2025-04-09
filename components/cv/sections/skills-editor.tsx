// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";

// export function SkillsEditor({
//   data,
//   onChange,
// }: {
//   data: string[];
//   onChange: (value: string[]) => void;
// }) {
//   const handleSkillChange = (index: number, value: string) => {
//     const updated = [...data];
//     updated[index] = value;
//     onChange(updated);
//   };

//   const addSkill = () => {
//     onChange([...data, ""]);
//   };

//   const removeSkill = (index: number) => {
//     const updated = [...data];
//     updated.splice(index, 1);
//     onChange(updated);
//   };

//   return (
//     <div className="space-y-4">
//       {data.map((skill, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <Input
//             value={skill}
//             onChange={(e) => handleSkillChange(index, e.target.value)}
//             placeholder={`Skill #${index + 1}`}
//           />
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => removeSkill(index)}
//           >
//             <Trash2 className="h-4 w-4 text-red-500" />
//           </Button>
//         </div>
//       ))}
//       <Button onClick={addSkill} className="mt-4">
//         Add Skill
//       </Button>
//     </div>
//   );
// }

// components/cv/sections/skills-editor.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export function SkillsEditor({
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

  const addSkill = () => {
    onChange([
      ...data,
      {
        name: "",
        level: "intermediate",
        category: "",
      },
    ]);
  };

  const removeSkill = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {data.map((skill, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Skill #{index + 1}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
          <div>
            <Label>Skill Name</Label>
            <Input
              value={skill.name || ""}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>
          <div>
            <Label>Level</Label>
            <select
              value={skill.level || "intermediate"}
              onChange={(e) => handleChange(index, "level", e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={skill.category || ""}
              onChange={(e) => handleChange(index, "category", e.target.value)}
            />
          </div>
        </div>
      ))}
      <Button onClick={addSkill} className="mt-4">
        Add Skill
      </Button>
    </div>
  );
}
