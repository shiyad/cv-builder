// components/cv-editor.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

export default function CVEditor({
  initialData,
  onSave,
  onCancel,
}: {
  initialData: any;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(initialData);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );
  const [activeTab, setActiveTab] = useState("contact");

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      cv_data: {
        ...prev.cv_data,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await onSave(formData);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("idle");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex items-center gap-4">
          {saveStatus === "saving" && (
            <span className="text-sm text-gray-500">Saving...</span>
          )}
          {saveStatus === "saved" && (
            <span className="text-sm text-green-600 flex items-center">
              <Check className="mr-1 h-4 w-4" /> Saved
            </span>
          )}
          <Button onClick={handleSave}>Save CV</Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">CV Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="public"
          checked={formData.cv_data.is_public || false}
          onCheckedChange={(checked) => handleChange("is_public", checked)}
        />
        <Label htmlFor="public">
          {formData.cv_data.is_public ? (
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" /> Public
            </span>
          ) : (
            <span className="flex items-center">
              <EyeOff className="mr-1 h-4 w-4" /> Private
            </span>
          )}
        </Label>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <div className="space-y-4 p-4 border rounded-md">
            <div className="space-y-2">
              <Label>First Name 1</Label>
              <Input
                value={formData.cv_data.contact_information?.first_name || ""}
                onChange={(e) =>
                  handleChange("contact_information", {
                    ...formData.cv_data.contact_information,
                    first_name: e.target.value,
                  })
                }
              />
            </div>
            {/* Add more contact fields */}
          </div>
        </TabsContent>

        <TabsContent value="experience">{/* Experience fields */}</TabsContent>

        {/* Other sections */}
      </Tabs>
    </div>
  );
}
