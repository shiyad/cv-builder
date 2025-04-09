"use client";

import { JSX, useEffect, useState } from "react";
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
} from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { isValidUUID } from "@/utils/validation";

// Template and color configurations
const templates = [
  { id: "template1", label: "Modern Blue", image: "/templates/template1.png" },
  { id: "template2", label: "Classic Gray", image: "/templates/template2.png" },
];

const colors = [
  {
    name: "blue",
    classes: {
      text: "text-blue-600",
      border: "border-blue-500",
      bg: "bg-blue-100",
      primary: "bg-blue-600",
    },
  },
  {
    name: "green",
    classes: {
      text: "text-green-600",
      border: "border-green-500",
      bg: "bg-green-100",
      primary: "bg-green-600",
    },
  },
  {
    name: "red",
    classes: {
      text: "text-red-600",
      border: "border-red-500",
      bg: "bg-red-100",
      primary: "bg-red-600",
    },
  },
  {
    name: "indigo",
    classes: {
      text: "text-indigo-600",
      border: "border-indigo-500",
      bg: "bg-indigo-100",
      primary: "bg-indigo-600",
    },
  },
  {
    name: "gray",
    classes: {
      text: "text-gray-600",
      border: "border-gray-500",
      bg: "bg-gray-100",
      primary: "bg-gray-600",
    },
  },
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

export default function CVTemplatesPage() {
  const [form, setForm] = useState<FormData>({
    contact_information: {
      first_name: "Shiyad",
      last_name: "Ismail",
      job_title: "Senior Software Engineer",
      email: "shiyadmi@gmail.com",
      phone: "+94718639899",
      address: "186, M.C.C Road, Akkaraipattu - 06",
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
  });

  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [leftPanelView, setLeftPanelView] = useState<"menu" | "form">("menu");
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cvId, setCvId] = useState<string | null>(null);
  const [cvTitle, setCvTitle] = useState("My CV");
  const supabase = createClient();
  const router = useRouter();

  const currentColor = colors.find((c) => c.name === selectedColor)?.classes;

  const [templates, setTemplates] = useState<
    Array<{
      id: string;
      label: string;
      image: string;
    }>
  >([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("cv_templates")
        .select("id, name, thumbnail_url");

      if (!error && data) {
        setTemplates(
          data.map((t) => ({
            id: t.id,
            label: t.name,
            image: t.thumbnail_url,
          }))
        );

        // Set the first template as default if none selected
        if (data.length > 0 && !selectedTemplate) {
          setSelectedTemplate(data[0].id);
        }
      }
    };

    fetchTemplates();
  }, []);

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

  useEffect(() => {
    const fetchInitialData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Check if we're editing an existing CV (from URL params)
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      if (id) {
        await loadCV(id);
      }
    };

    fetchInitialData();
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
          setSelectedTemplate(data.template_id);
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

  const saveCV = async (isNew: boolean = false) => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Enhanced template validation
      if (!selectedTemplate) {
        throw new Error("Please select a template");
      }

      if (!isValidUUID(selectedTemplate)) {
        // Attempt to find template by name if UUID is invalid
        const { data: template } = await supabase
          .from("cv_templates")
          .select("id")
          .eq("name", selectedTemplate)
          .single();

        if (!template) {
          throw new Error(`Invalid template: ${selectedTemplate}`);
        }
        setSelectedTemplate(template.id);
      }

      const cvData = {
        title: cvTitle,
        cv_data: form,
        template_id: selectedTemplate,
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
        return true;
      }
    } catch (error) {
      console.error("Error saving CV:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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

  // const handleInputChange = (
  //   sectionKey: string,
  //   field: string,
  //   value: any,
  //   index?: number
  // ) => {
  //   if (index !== undefined) {
  //     // Handle array fields
  //     const currentArray = form[sectionKey as keyof FormData] || [];
  //     if (Array.isArray(currentArray)) {
  //       const updatedArray = [...currentArray];
  //       updatedArray[index] = {
  //         ...updatedArray[index],
  //         [field]: value,
  //       };
  //       setForm((prev) => ({
  //         ...prev,
  //         [sectionKey]: updatedArray,
  //       }));
  //     }
  //   } else {
  //     // Handle object fields
  //     setForm((prev) => ({
  //       ...prev,
  //       [sectionKey]: {
  //         ...prev[sectionKey as keyof FormData],
  //         [field]: value,
  //       },
  //     }));
  //   }
  // };

  const handleInputChange = <K extends keyof FormData>(
    sectionKey: K,
    field: string,
    value: any,
    index?: number
  ) => {
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

  const renderFormFields = (section: Section) => {
    const isArray = section.schema?.type === "array";
    const properties = isArray
      ? section.schema.items?.properties
      : section.schema?.properties;

    if (!properties) return null;

    if (isArray) {
      const items = form[section.key as keyof FormData] || [];
      if (!Array.isArray(items)) return null;

      return (
        <div className="space-y-6">
          <div className="mt-6 space-y-3">
            <Input
              value={cvTitle}
              onChange={(e) => setCvTitle(e.target.value)}
              placeholder="CV Title"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="public-toggle"
                checked={form.is_public || false}
                onCheckedChange={(checked: any) =>
                  setForm((prev) => ({ ...prev, is_public: checked }))
                }
              />
              <Label htmlFor="public-toggle">
                {form.is_public ? (
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Public
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <EyeOff className="w-4 h-4" /> Private
                  </span>
                )}
              </Label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => saveCV(false)}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Saving..." : "Save CV"}
              </Button>
              <Button
                onClick={() => saveCV(true)}
                disabled={isLoading}
                variant="outline"
              >
                Save As New
              </Button>
            </div>
            {cvId && (
              <Button
                onClick={deleteCV}
                disabled={isLoading}
                variant="destructive"
                className="w-full"
              >
                {isLoading ? "Deleting..." : "Delete CV"}
              </Button>
            )}
          </div>
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
    const sectionData = form[section.key as keyof FormData] || {};

    return (
      <div className="space-y-4">
        {Object.entries(properties).map(([key, config]: [string, any]) => (
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
    const contact = form.contact_information || {};
    const objective = form.objective || {};
    const experiences = form.experience || [];
    const educations = form.education || [];
    const skills = form.skills || [];
    const languages = form.languages || [];

    return (
      <div className={`p-8 min-h-screen ${currentColor?.bg}`}>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className={`p-6 ${currentColor?.primary} text-white`}>
            <h1 className="text-3xl font-bold">
              {contact.first_name} {contact.last_name}
            </h1>
            <p className="text-lg opacity-90">{contact.job_title}</p>
          </div>

          {/* Contact Info */}
          <div className="p-6 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{contact.address}</span>
                </div>
              )}
              {contact.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {contact.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-8">
            {/* Objective */}
            {objective.summary && (
              <div>
                <h2
                  className={`text-xl font-semibold mb-2 ${currentColor?.text}`}
                >
                  Objective
                </h2>
                <p className="text-gray-700">{objective.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <div>
                <h2
                  className={`text-xl font-semibold mb-4 ${currentColor?.text}`}
                >
                  Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 pl-4 border-gray-200"
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

            {/* Education */}
            {educations.length > 0 && (
              <div>
                <h2
                  className={`text-xl font-semibold mb-4 ${currentColor?.text}`}
                >
                  Education
                </h2>
                <div className="space-y-4">
                  {educations.map((edu, index) => (
                    <div
                      key={index}
                      className="border-l-2 pl-4 border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.institution}</p>
                          {edu.field_of_study && (
                            <p className="text-gray-500 text-sm">
                              {edu.field_of_study}
                            </p>
                          )}
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

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2
                  className={`text-xl font-semibold mb-4 ${currentColor?.text}`}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${currentColor?.bg} ${currentColor?.text}`}
                    >
                      {skill.name} {skill.level && `(${skill.level})`}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h2
                  className={`text-xl font-semibold mb-4 ${currentColor?.text}`}
                >
                  Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between max-w-xs">
                      <span className="font-medium">{lang.language}</span>
                      <span className="text-gray-600">{lang.proficiency}</span>
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

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Editor Sidebar */}
      <div className="w-1/2 border-r overflow-y-auto p-6 bg-background">
        {leftPanelView === "menu" ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                CV Customization
              </h2>
              <Badge variant="outline">Draft</Badge>
            </div>

            <Tabs defaultValue="sections">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="sections" className="flex gap-2">
                  <FileText className="w-4 h-4" /> Sections
                </TabsTrigger>
                <TabsTrigger value="design" className="flex gap-2">
                  <Palette className="w-4 h-4" /> Design
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex gap-2">
                  <LayoutTemplate className="w-4 h-4" /> Templates
                </TabsTrigger>
              </TabsList>

              {/* Sections */}
              <TabsContent value="sections" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CV Sections</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          setLeftPanelView("form");
                        }}
                        className={clsx(
                          "p-4 rounded-lg border cursor-pointer flex items-center gap-3 hover:bg-accent/50",
                          activeSection === section.id && "bg-accent"
                        )}
                      >
                        <div className="w-7 h-7 rounded-full bg-muted p-2 text-muted-foreground">
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

              {/* Design */}
              <TabsContent value="design" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm">Color Scheme</Label>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {colors.map((color) => (
                          <Button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            variant={
                              color.name === selectedColor
                                ? "default"
                                : "outline"
                            }
                            className={clsx(
                              "w-full text-sm",
                              color.name === selectedColor
                                ? color.classes.bg
                                : "bg-background",
                              color.classes.text
                            )}
                          >
                            {color.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Templates */}
              <TabsContent value="templates" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={clsx(
                            "border p-4 rounded-lg cursor-pointer hover:bg-accent/50",
                            selectedTemplate === template.id && "bg-accent"
                          )}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="w-full h-[150px] relative mb-4">
                            <Image
                              src={template.image}
                              alt={template.label}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <h3 className="text-sm font-medium">
                            {template.label}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <ArrowLeft
                onClick={() => setLeftPanelView("menu")}
                className="cursor-pointer"
              />
              <h3 className="text-xl font-bold">Customize Section</h3>
            </div>
            <Separator className="my-3" />
            {sections.length && activeSection
              ? renderFormFields(sections.find((s) => s.id === activeSection)!)
              : null}
          </>
        )}
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 overflow-y-auto">{renderPreview()}</div>
    </div>
  );
}
