"use client";

import { JSX, useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {
  User,
  FileText,
  Briefcase,
  Palette,
  LayoutTemplate,
  Contact,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Eye,
  EyeOff,
  GraduationCap,
  SaveAll,
  Loader2,
  Trash2,
  Save,
  Check,
} from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { isValidUUID } from "@/utils/validation";
import { getTemplateStyles } from "./template-styles";
import {
  ClassicTemplate,
  ModernTemplate,
  CreativeTemplate,
  TwoColumnTemplate,
  AcademicTemplate,
  TechTemplate,
  ExecutiveTemplate,
} from "@/components/templates";
import { ProfileUpload } from "./ProfileUpload";
import { DownloadButton } from "./cv/download-button";
import { TwoColumnShaderTemplate } from "./templates/TwoColumnShader";
import { ClassicBlueTemplate } from "./templates/ClassicBlueTemplate";
import { PilotModernTemplate } from "./templates/PilotModernTemplate";
import { PilotTemplate } from "./templates/PilotTemplate";
import { AccountingTemplate } from "./templates/AccountingTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { ExecutiveModernTemplate } from "./templates/ExecutiveModernTemplate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

// Template and color configurations
const templates = [
  { id: "template1", label: "Modern Blue", image: "/templates/template1.png" },
  { id: "template2", label: "Classic Gray", image: "/templates/template2.png" },
];

const iconMap: Record<string, JSX.Element> = {
  contact: <Contact className="w-4 h-4" />,
  briefcase: <Briefcase className="w-4 h-4" />,
  target: <FileText className="w-4 h-4" />,
  graduation: <Palette className="w-4 h-4" />,
  wrench: <LayoutTemplate className="w-4 h-4" />,
  language: <User className="w-4 h-4" />,
  users: <User className="w-4 h-4" />,
};

type Section = {
  id: string;
  key: string;
  display_name: string;
  schema: {
    type: string;
    properties?: Record<string, any>;
    items?: {
      type: string;
      properties?: Record<string, any>;
    };
  };
  ui_config: { icon: string; order: number };
  icon: JSX.Element;
};

type FormData = {
  contact_information?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    address?: string;
    phone?: string;
    website?: string;
    job_title?: string;
    profile_picture?: string;
  };
  objective?: {
    summary?: string;
  };
  experience?: Array<{
    company?: string;
    position?: string;
    start_date?: string;
    end_date?: string;
    current?: boolean;
    description?: string;
  }>;
  education?: Array<{
    institution?: string;
    degree?: string;
    field_of_study?: string;
    start_date?: string;
    end_date?: string;
    current?: boolean;
    description?: string;
  }>;
  publications?: Array<{
    title?: string;
    publisher?: string;
    date?: string;
    url?: string;
    description?: string;
  }>;
  certifications?: Array<{
    title?: string;
    issuer?: string;
    date?: string;
    description?: string;
  }>;
  skills?: Array<{
    name?: string;
    level?: string;
  }>;
  languages?: Array<{
    language?: string;
    proficiency?: string;
  }>;
  references?: Array<{
    name?: string;
    position?: string;
    company?: string;
    contact?: string;
  }>;
  is_public?: boolean;
};

interface CVTemplatesPageProps {
  initialData?: {
    id?: string;
    title: string;
    cv_data: FormData;
    template_id: string | null;
  };
  onCancel: () => void;
}

interface Template {
  id: string;
  name: string;
  thumbnail_url: string;
  template_config: {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
    layout: string;
    font: string;
  };
  is_premium: boolean;
}

export default function CVTemplatesPage({
  initialData,
  onCancel,
}: CVTemplatesPageProps) {
  const [form, setForm] = useState<FormData>(
    initialData?.cv_data || {
      contact_information: {
        first_name: "Shiyad",
        last_name: "Ismail",
        job_title: "Senior Software Engineer",
        email: "shiyadmi@gmail.com",
        phone: "+94718639899",
        address: "186, M.C.C Road, Akkaraipattu - 06",
        profile_picture: "",
      },
      objective: {
        summary:
          "Experienced software engineer with 10+ years in web development specializing in React, Node.js, and cloud technologies. Passionate about building scalable and user-friendly applications.",
      },
      experience: [
        {
          company: "Tech Solutions Inc.",
          position: "Senior Software Engineer",
          start_date: "2020-01-01",
          end_date: "2023-12-31",
          current: false,
          description:
            "Led frontend development team, implemented new features, and optimized performance.",
        },
        {
          company: "Web Developers Co.",
          position: "Software Engineer",
          start_date: "2015-06-01",
          end_date: "2019-12-31",
          current: false,
          description:
            "Developed and maintained web applications using modern JavaScript frameworks.",
        },
      ],
      education: [
        {
          institution: "University of Colombo",
          degree: "BSc in Computer Science",
          field_of_study: "Software Engineering",
          start_date: "2011-09-01",
          end_date: "2015-05-31",
          current: false,
        },
      ],
      skills: [
        { name: "JavaScript", level: "Expert" },
        { name: "React", level: "Expert" },
        { name: "Node.js", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" },
      ],
      languages: [
        { language: "English", proficiency: "Fluent" },
        { language: "Tamil", proficiency: "Native" },
      ],
      is_public: false,
    }
  );

  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(); // useState("template1");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [leftPanelView, setLeftPanelView] = useState<"menu" | "form">("menu");
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cvId, setCvId] = useState(initialData?.id || null); // useState<string | null>(null);
  const [cvTitle, setCvTitle] = useState(initialData?.title || "My CV"); // useState("My CV");
  const supabase = createClient();
  const router = useRouter();

  //   const [templates, setTemplates] = useState<
  //     Array<{
  //       id: string;
  //       label: string;
  //       image: string;
  //     }>
  //   >([]);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateConfig, setSelectedTemplateConfig] =
    useState<any>(null);

  // Fetch templates from Supabase
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("cv_templates")
        .select("*")
        .eq("is_active", true);

      if (!error && data) {
        setTemplates(data);

        // Set initial template config if editing existing CV
        if (initialData?.template_id) {
          const template = data.find((t) => t.id === initialData.template_id);
          if (template) {
            setSelectedTemplateConfig(template.template_config);
          }
        } else if (data.length > 0) {
          // Set first template as default for new CVs
          setSelectedTemplate(data[0]);
          setSelectedTemplateConfig(data[0].template_config);
        }
      }
    };

    fetchTemplates();
  }, []);

  // Update template config when selected template changes
  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find((t) => t.id === selectedTemplate.id);
      if (template) {
        setSelectedTemplateConfig(template.template_config);
      }
    }
  }, [selectedTemplate, templates]);

  useEffect(() => {
    const fetchSections = async () => {
      // Simulate API call
      const mockSections = [
        {
          id: "contact",
          key: "contact_information",
          display_name: "Contact Information",
          schema: {
            type: "object",
            properties: {
              first_name: { type: "string", title: "First Name" },
              last_name: { type: "string", title: "Last Name" },
              job_title: { type: "string", title: "Job Title" },
              email: { type: "string", format: "email", title: "Email" },
              phone: { type: "string", title: "Phone" },
              address: { type: "string", title: "Address" },
              website: { type: "string", format: "uri", title: "Website" },
            },
          },
          ui_config: { icon: "contact", order: 1 },
        },
        {
          id: "objective",
          key: "objective",
          display_name: "Objective",
          schema: {
            type: "object",
            properties: {
              summary: { type: "string", title: "Summary" },
            },
          },
          ui_config: { icon: "target", order: 2 },
        },
        {
          id: "experience",
          key: "experience",
          display_name: "Experience",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                company: { type: "string", title: "Company" },
                position: { type: "string", title: "Position" },
                start_date: {
                  type: "string",
                  format: "date",
                  title: "Start Date",
                },
                end_date: { type: "string", format: "date", title: "End Date" },
                current: { type: "boolean", title: "Current Position" },
                description: { type: "string", title: "Description" },
              },
            },
          },
          ui_config: { icon: "briefcase", order: 3 },
        },
        {
          id: "education",
          key: "education",
          display_name: "Education",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                institution: { type: "string", title: "Institution" },
                degree: { type: "string", title: "Degree" },
                field_of_study: { type: "string", title: "Field of Study" },
                start_date: {
                  type: "string",
                  format: "date",
                  title: "Start Date",
                },
                end_date: { type: "string", format: "date", title: "End Date" },
                current: { type: "boolean", title: "Currently Studying" },
                description: { type: "string", title: "Description" },
              },
            },
          },
          ui_config: { icon: "graduation-cap", order: 4 },
        },
        {
          id: "skills",
          key: "skills",
          display_name: "Skills",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", title: "Skill Name" },
                level: {
                  type: "string",
                  title: "Proficiency Level",
                  enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
                },
              },
            },
          },
          ui_config: { icon: "wrench", order: 5 },
        },
        {
          id: "languages",
          key: "languages",
          display_name: "Languages",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                language: { type: "string", title: "Language" },
                proficiency: {
                  type: "string",
                  title: "Proficiency",
                  enum: ["Basic", "Intermediate", "Fluent", "Native"],
                },
              },
            },
          },
          ui_config: { icon: "language", order: 6 },
        },
        {
          id: "publications",
          key: "publications",
          display_name: "Publications",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string", title: "Title" },
                publisher: { type: "string", title: "Publisher" },
                date: {
                  type: "string",
                  format: "date",
                  title: "Publication Date",
                },
                url: { type: "string", format: "uri", title: "URL" },
                description: { type: "string", title: "Description" },
              },
            },
          },
          ui_config: { icon: "book-open", order: 7 },
        },
        {
          id: "certifications",
          key: "certifications",
          display_name: "Certifications",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", title: "Certification Name" },
                issuer: { type: "string", title: "Issuer" },
                date: { type: "string", format: "date", title: "Date Issued" },
                url: {
                  type: "string",
                  format: "uri",
                  title: "Certificate URL",
                },
                description: { type: "string", title: "Description" },
              },
            },
          },
          ui_config: { icon: "certificate", order: 8 },
        },
      ];

      setSections(
        mockSections.map((s: any) => ({
          ...s,
          icon: iconMap[s.ui_config?.icon] || <User className="w-4 h-4" />,
        }))
      );
      setActiveSection(mockSections[0].id);
    };

    fetchSections();
  }, []);

  const loadCV = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_cvs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setForm({
          ...(data.cv_data as FormData),
          is_public: data.is_public,
        });
        // Ensure template_id is set properly
        if (data.template_id) {
          setSelectedTemplate(data);
        }
        setCvId(data.id);
        setCvTitle(data.title);
      }
    } catch (error) {
      console.error("Error loading CV:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCV = useCallback(
    async (isNew: boolean = false) => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        debugger;

        // Get the full template data
        const template = templates.find((t) => t.id === selectedTemplate?.id);
        if (!template) throw new Error("Template not found");

        const cvData = {
          title: cvTitle,
          cv_data: form,
          template_id: selectedTemplate?.id,
          template_config: template.template_config, // Save the full config
          is_public: form.is_public || false,
        };

        let result;
        if (isNew || !cvId) {
          result = await supabase
            .from("user_cvs")
            .insert({
              ...cvData,
              user_id: user.id,
              slug: `cv-${Date.now()}`,
            })
            .select()
            .single();
        } else {
          result = await supabase
            .from("user_cvs")
            .update(cvData)
            .eq("id", cvId)
            .eq("user_id", user.id)
            .select()
            .single();
        }

        debugger;

        if (result.error) throw result.error;
        if (result.data) {
          setCvId(result.data.id);
          return result.data;
        }
      } catch (error) {
        console.error("Error saving CV:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [form, selectedTemplate, cvTitle, cvId, templates]
  );

  const deleteCV = async () => {
    if (!cvId) return;

    if (!confirm("Are you sure you want to delete this CV?")) return;

    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("user_cvs")
        .delete()
        .eq("id", cvId)
        .eq("user_id", user.id);

      if (error) throw error;

      // Redirect to CV list or create new
      router.push("/protected/cvs");
    } catch (error) {
      console.error("Error deleting CV:", error);
      alert("Failed to delete CV");
    } finally {
      setIsLoading(false);
    }
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      objective: {
        ...prev.objective,
        summary: e.target.value,
      },
    }));
  };

  const handleInputChange = <K extends keyof FormData>(
    sectionKey: K,
    field: string,
    value: any,
    index?: number
  ) => {
    // Special handling for file uploads
    if (field === "profile_picture" && value instanceof File) {
      // This case is now handled by the ProfileUpload component
      return;
    }

    if (index !== undefined) {
      // Assume array-type section
      const currentArray = (form[sectionKey] || []) as any[];
      if (Array.isArray(currentArray)) {
        const updatedArray = [...currentArray];
        updatedArray[index] = {
          ...updatedArray[index],
          [field]: value,
        };
        setForm((prev) => ({
          ...prev,
          [sectionKey]: updatedArray,
        }));
      }
    } else {
      // Object-type section
      const currentObject = (form[sectionKey] || {}) as Record<string, any>;
      setForm((prev) => ({
        ...prev,
        [sectionKey]: {
          ...currentObject,
          [field]: value,
        },
      }));
    }
  };

  const handleAddArrayItem = (sectionKey: string) => {
    const currentArray = form[sectionKey as keyof FormData] || [];
    if (Array.isArray(currentArray)) {
      setForm((prev) => ({
        ...prev,
        [sectionKey]: [...currentArray, {}],
      }));
    }
  };

  const handleRemoveArrayItem = (sectionKey: string, index: number) => {
    const currentArray = form[sectionKey as keyof FormData] || [];
    if (Array.isArray(currentArray)) {
      const updatedArray = currentArray.filter((_, i) => i !== index);
      setForm((prev) => ({
        ...prev,
        [sectionKey]: updatedArray,
      }));
    }
  };

  // const renderFormFields = (section: Section) => {
  //   const isArray = section.schema?.type === "array";
  //   const properties = isArray
  //     ? section.schema.items?.properties
  //     : section.schema?.properties;

  //   if (!properties) return null;

  //   if (isArray) {
  //     const items = form[section.key as keyof FormData] || [];
  //     if (!Array.isArray(items)) return null;

  //     return (
  //       <div className="space-y-6">
  //         <div className="mt-6 space-y-3">
  //           <Input
  //             value={cvTitle}
  //             onChange={(e) => setCvTitle(e.target.value)}
  //             placeholder="CV Title"
  //           />
  //           <div className="flex items-center space-x-2">
  //             <Switch
  //               id="public-toggle"
  //               checked={form.is_public || false}
  //               onCheckedChange={(checked: any) =>
  //                 setForm((prev) => ({ ...prev, is_public: checked }))
  //               }
  //             />
  //             <Label htmlFor="public-toggle">
  //               {form.is_public ? (
  //                 <span className="flex items-center gap-1">
  //                   <Eye className="w-4 h-4" /> Public
  //                 </span>
  //               ) : (
  //                 <span className="flex items-center gap-1">
  //                   <EyeOff className="w-4 h-4" /> Private
  //                 </span>
  //               )}
  //             </Label>
  //           </div>
  //           <div className="flex gap-2">
  //             <Button
  //               onClick={() => saveCV(false)}
  //               disabled={isLoading}
  //               className="flex-1"
  //             >
  //               {isLoading ? "Saving..." : "Save CV"}
  //             </Button>
  //             <Button
  //               onClick={() => saveCV(true)}
  //               disabled={isLoading}
  //               variant="outline"
  //             >
  //               Save As New
  //             </Button>
  //           </div>
  //           {cvId && (
  //             <Button
  //               onClick={deleteCV}
  //               disabled={isLoading}
  //               variant="destructive"
  //               className="w-full"
  //             >
  //               {isLoading ? "Deleting..." : "Delete CV"}
  //             </Button>
  //           )}
  //         </div>
  //         {items.map((item: any, index: number) => (
  //           <div
  //             key={index}
  //             className="border p-4 rounded-md space-y-3 relative"
  //           >
  //             {Object.entries(properties).map(
  //               ([fieldKey, config]: [string, any]) => (
  //                 <div key={fieldKey}>
  //                   <Label>{config.title || fieldKey}</Label>
  //                   {config.enum ? (
  //                     <select
  //                       className="w-full border rounded px-3 py-2"
  //                       value={item?.[fieldKey] || ""}
  //                       onChange={(e) =>
  //                         handleInputChange(
  //                           section.key as keyof FormData,
  //                           fieldKey,
  //                           e.target.value,
  //                           index
  //                         )
  //                       }
  //                     >
  //                       <option value="">Select</option>
  //                       {config.enum.map((option: string) => (
  //                         <option key={option} value={option}>
  //                           {option}
  //                         </option>
  //                       ))}
  //                     </select>
  //                   ) : (
  //                     <Input
  //                       type={config.format === "date" ? "date" : "text"}
  //                       value={item?.[fieldKey] || ""}
  //                       placeholder={fieldKey}
  //                       onChange={(e) =>
  //                         handleInputChange(
  //                           section.key as keyof FormData,
  //                           fieldKey,
  //                           e.target.value,
  //                           index
  //                         )
  //                       }
  //                     />
  //                   )}
  //                 </div>
  //               )
  //             )}
  //             <Button
  //               variant="destructive"
  //               size="sm"
  //               className="absolute top-2 right-2"
  //               onClick={() => handleRemoveArrayItem(section.key, index)}
  //             >
  //               Remove
  //             </Button>
  //           </div>
  //         ))}
  //         <Button
  //           variant="outline"
  //           onClick={() => handleAddArrayItem(section.key)}
  //         >
  //           Add {section.display_name}
  //         </Button>
  //       </div>
  //     );
  //   }

  //   // Handle non-array sections
  //   //const sectionData = form[section.key as keyof FormData] || {};

  //   const sectionData = form.contact_information ?? {};

  //   return (
  //     <div className="space-y-4">
  //       {section.key === "contact_information" && (
  //         <div>
  //           <Label>Profile Picture</Label>
  //           <ProfileUpload
  //             currentImage={sectionData.profile_picture}
  //             onUpload={(url) =>
  //               handleInputChange("contact_information", "profile_picture", url)
  //             }
  //           />
  //         </div>
  //       )}
  //       {Object.entries(properties).map(([key, config]: [string, any]) => (
  //         <div key={key}>
  //           <Label>{config.title || key}</Label>
  //           {config.enum ? (
  //             <select
  //               className="w-full border rounded px-3 py-2"
  //               value={sectionData[key as keyof typeof sectionData] || ""}
  //               onChange={(e) =>
  //                 handleInputChange(
  //                   section.key as keyof FormData,
  //                   key,
  //                   e.target.value
  //                 )
  //               }
  //             >
  //               <option value="">Select</option>
  //               {config.enum.map((option: string) => (
  //                 <option key={option} value={option}>
  //                   {option}
  //                 </option>
  //               ))}
  //             </select>
  //           ) : (
  //             <Input
  //               type={config.format === "email" ? "email" : "text"}
  //               value={sectionData[key as keyof typeof sectionData] || ""}
  //               placeholder={key}
  //               onChange={(e) =>
  //                 handleInputChange(
  //                   section.key as keyof FormData,
  //                   key,
  //                   e.target.value
  //                 )
  //               }
  //             />
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const renderFormFields = (section: Section) => {
    const isArray = section.schema?.type === "array";
    const properties = isArray
      ? section.schema.items?.properties
      : section.schema?.properties;

    if (!properties) return null;

    // If section is an array (experience, education, publications, certifications, etc.)
    if (isArray) {
      const items = form[section.key as keyof FormData] || [];
      if (!Array.isArray(items)) return null;

      return (
        <div className="space-y-6">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="border p-4 rounded-md space-y-3 relative"
            >
              {Object.entries(properties).map(
                ([fieldKey, config]: [string, any]) => (
                  <div key={fieldKey}>
                    <Label>{config.title || fieldKey}</Label>
                    {config.enum ? (
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={item?.[fieldKey] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            section.key as keyof FormData,
                            fieldKey,
                            e.target.value,
                            index
                          )
                        }
                      >
                        <option value="">Select</option>
                        {config.enum.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        type={config.format === "date" ? "date" : "text"}
                        value={item?.[fieldKey] || ""}
                        placeholder={fieldKey}
                        onChange={(e) =>
                          handleInputChange(
                            section.key as keyof FormData,
                            fieldKey,
                            e.target.value,
                            index
                          )
                        }
                      />
                    )}
                  </div>
                )
              )}
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveArrayItem(section.key, index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => handleAddArrayItem(section.key)}
          >
            Add {section.display_name}
          </Button>
        </div>
      );
    }

    // Handle non-array sections
    // const sectionData = form[section.key as keyof FormData] ?? {};
    const sectionData = form.contact_information ?? {};

    return (
      <div className="space-y-4">
        {section.key === "contact_information" && (
          <div>
            <Label>Profile Picture</Label>
            <ProfileUpload
              currentImage={sectionData.profile_picture}
              onUpload={(url) =>
                handleInputChange("contact_information", "profile_picture", url)
              }
            />
          </div>
        )}

        {section.key === "objective" && (
          <div>
            <Label>Summary</Label>
            <Input
              type="text"
              value={form.objective?.summary || ""}
              placeholder="Enter your professional summary"
              onChange={(e) =>
                handleInputChange("objective", "summary", e.target.value)
              }
            />
          </div>
        )}

        {Object.entries(properties)
          .filter(([key]) => section.key !== "objective" || key !== "summary")
          .map(([key, config]: [string, any]) => (
            <div key={key}>
              <Label>{config.title || key}</Label>
              {config.enum ? (
                <select
                  className="w-full border rounded px-3 py-2"
                  value={sectionData[key as keyof typeof sectionData] || ""}
                  onChange={(e) =>
                    handleInputChange(
                      section.key as keyof FormData,
                      key,
                      e.target.value
                    )
                  }
                >
                  <option value="">Select</option>
                  {config.enum.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  type={config.format === "email" ? "email" : "text"}
                  value={sectionData[key as keyof typeof sectionData] || ""}
                  placeholder={key}
                  onChange={(e) =>
                    handleInputChange(
                      section.key as keyof FormData,
                      key,
                      e.target.value
                    )
                  }
                />
              )}
            </div>
          ))}
      </div>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderPreview = () => {
    const styles = getTemplateStyles(selectedTemplateConfig);
    const templateProps = {
      formData: form,
      styles,
      previewMode: false,
    };

    switch (selectedTemplate?.id) {
      case "53994530-26b3-41dd-879d-9ba9e23c11b2":
        return <ClassicTemplate {...templateProps} />;
      case "e0a47d34-165a-47cb-9c23-05204be4307a":
        return <ModernTemplate {...templateProps} />;
      case "creative":
        return <CreativeTemplate {...templateProps} />;
      case "a0b274c6-6f64-4300-9c2b-2c0ad6581b5a":
        return <TwoColumnTemplate {...templateProps} />;
      case "57556298-a0a0-4ef1-aed5-5dd34a4c7d9f":
        return <TwoColumnShaderTemplate {...templateProps} />;
      case "aec0833b-d3ad-48cb-b88d-ebd4bb9eb0cf":
        return <ClassicBlueTemplate {...templateProps} />;
      case "82b7e451-2368-40bf-ba1a-67b3887142f9":
        return <AcademicTemplate {...templateProps} />;
      case "79de1934-3818-46e1-910a-bf2e5dd3c466":
        return <TechTemplate {...templateProps} />;
      case "66c3a7f1-0964-494b-b459-4e5fb38df779":
        return <PilotModernTemplate {...templateProps} />;
      case "061943d4-1ef9-4bbb-a028-4f3ef3a06109":
        return <PilotTemplate {...templateProps} />;
      case "693f16fb-a8de-4ed2-afbc-8fe92ba654ef":
        return <AccountingTemplate {...templateProps} />;
      case "82b7e451-2368-40bf-ba1a-67b3887142f9":
        return <AcademicTemplate {...templateProps} />;
      case "ff9191ae-0f4e-4281-8593-bb77c1871b1c":
        return <MinimalistTemplate {...templateProps} />;
      case "c6f9158a-93d3-4779-bafb-c3a8d3adc4d3":
        return <ExecutiveModernTemplate {...templateProps} />;
      case "executive":
        return <ExecutiveTemplate {...templateProps} />;
      default:
        return <ClassicTemplate {...templateProps} />;
    }
  };

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Editor Sidebar */}
      <div className="w-1/2 border-r overflow-y-auto p-6 bg-background">
        {leftPanelView === "menu" ? (
          <>
            {/* Header Section */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  CV Customization
                </h2>
                <Badge variant="outline" className="px-3 py-1">
                  Draft
                </Badge>
              </div>

              {/* Title and Actions Bar */}
              <div className="flex items-center gap-4 bg-muted/50 p-3 rounded-lg">
                <Input
                  value={cvTitle}
                  onChange={(e) => setCvTitle(e.target.value)}
                  placeholder="CV Title"
                  className="flex-1 min-w-0"
                />

                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1">
                          <Switch
                            id="public-toggle"
                            checked={form.is_public || false}
                            onCheckedChange={(checked) =>
                              setForm((prev) => ({
                                ...prev,
                                is_public: checked,
                              }))
                            }
                          />
                          <Label
                            htmlFor="public-toggle"
                            className="cursor-pointer"
                          >
                            {form.is_public ? (
                              <Eye className="h-4 w-4 text-primary" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Label>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {form.is_public ? "Public CV" : "Private CV"}
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => saveCV(false)}
                          disabled={isLoading}
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Save CV</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => saveCV(true)}
                          disabled={isLoading}
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                        >
                          <SaveAll className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Save As New</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {cvId && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={deleteCV}
                            disabled={isLoading}
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete CV</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="sections">
              <TabsList className="grid grid-cols-2 w-full bg-muted/50">
                <TabsTrigger value="sections" className="flex gap-2 py-2">
                  <FileText className="w-4 h-4" />
                  <span>Sections</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex gap-2 py-2">
                  <LayoutTemplate className="w-4 h-4" />
                  <span>Templates</span>
                </TabsTrigger>
              </TabsList>

              {/* Sections Panel */}
              <TabsContent value="sections" className="pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="px-4 py-3">
                    <CardTitle className="text-base font-medium">
                      CV Sections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 space-y-1">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          setLeftPanelView("form");
                        }}
                        className={clsx(
                          "p-3 rounded-md cursor-pointer flex items-center gap-3 transition-colors",
                          "hover:bg-accent/50",
                          activeSection === section.id && "bg-accent"
                        )}
                      >
                        <div className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center p-2 text-muted-foreground">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">
                            {section.display_name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Templates Panel */}
              <TabsContent value="templates" className="pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="px-4 py-3">
                    <CardTitle className="text-base font-medium">
                      Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={clsx(
                            "group relative rounded-lg overflow-hidden h-[180px]",
                            "border cursor-pointer transition-all",
                            "hover:shadow-md hover:border-primary/30",
                            selectedTemplate?.id === template.id &&
                              "ring-2 ring-primary border-primary/50"
                          )}
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <div className="absolute inset-0">
                            <Image
                              src={template.thumbnail_url}
                              alt={template.name}
                              fill
                              className="object-cover object-top"
                              quality={80}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                          </div>

                          {template.is_premium && (
                            <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-500/90">
                              Premium
                            </Badge>
                          )}

                          <div className="relative z-10 h-full flex flex-col justify-end p-3">
                            <div className="flex justify-between items-end">
                              <h3 className="text-white font-medium drop-shadow-md">
                                {template.name}
                              </h3>
                              {selectedTemplate?.id === template.id && (
                                <div className="w-5 h-5 flex items-center justify-center bg-primary rounded-full text-white">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          /* Section Editor View */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLeftPanelView("menu")}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">Customize Section</h3>
            </div>

            <Separator />

            <div className="pt-2">
              {sections.length && activeSection
                ? renderFormFields(
                    sections.find((s) => s.id === activeSection)!
                  )
                : null}
            </div>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 overflow-y-auto flex flex-col bg-gray-50 dark:bg-gray-900 print:bg-white print:p-0 print:m-0">
        {/* Preview Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b bg-white dark:bg-gray-800 sticky top-0 z-10 print:hidden">
          <div className="text-sm text-muted-foreground">Preview Mode</div>
          {cvId && cvTitle && (
            <DownloadButton
              cv={{
                id: cvId,
                title: cvTitle,
                cv_data: form,
              }}
              template={{
                id: selectedTemplate?.id,
                template_config: selectedTemplateConfig,
                is_premium: selectedTemplate?.is_premium,
              }}
            />
          )}
        </div>

        {/* CV Preview Content */}
        <div className="flex justify-center print:p-0 print:m-0 p-4 print:block">
          <div
            id="cv-preview-wrapper"
            className="w-full max-w-[900px] print:w-full print:max-w-none bg-white shadow-sm overflow-hidden"
          >
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}
