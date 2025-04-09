// components/cv/sections/experience-editor.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export function ExperienceEditor({
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

  const addExperience = () => {
    onChange([
      ...data,
      {
        jobTitle: "",
        company: "",
        period: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {data.map((exp, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Experience #{index + 1}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
          <div>
            <Label>Job Title</Label>
            <Input
              value={exp.jobTitle || ""}
              onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
            />
          </div>
          <div>
            <Label>Company</Label>
            <Input
              value={exp.company || ""}
              onChange={(e) => handleChange(index, "company", e.target.value)}
            />
          </div>
          <div>
            <Label>Period</Label>
            <Input
              value={exp.period || ""}
              onChange={(e) => handleChange(index, "period", e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <textarea
              value={exp.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border rounded-md p-2 min-h-[100px]"
            />
          </div>
        </div>
      ))}
      <Button onClick={addExperience} className="mt-4">
        Add Experience
      </Button>
    </div>
  );
}
