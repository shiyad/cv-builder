"use client";

import { JSX, useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
  Languages,
  Book,
  ShieldCheck,
  Asterisk,
  Menu,
  X,
  Star,
  Crown,
  ChevronUp,
  ChevronDown,
  Plus,
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
import { MechanicalEngineerTemplate } from "./templates/MechanicalEngineerTemplate";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CVLinkManager } from "./cv-link-manager";
import toast from "react-hot-toast";
import { SoftwareExpertTemplate } from "./templates/SoftwareExpertTemplate";
import Link from "next/link";
import { PremiumBanner } from "./PremiumBanner";

// Template and color configurations
const templates = [
  { id: "template1", label: "Modern Blue", image: "/templates/template1.png" },
  { id: "template2", label: "Classic Gray", image: "/templates/template2.png" },
];

const iconMap: Record<string, JSX.Element> = {
  contact: <Contact className="w-4 h-4" />,
  briefcase: <Briefcase className="w-4 h-4" />,
  target: <FileText className="w-4 h-4" />,
  // graduation: <Palette className="w-4 h-4" />,
  skill: <LayoutTemplate className="w-4 h-4" />,
  language: <Languages className="w-4 h-4" />,
  // users: <User className="w-4 h-4" />,
  education: <GraduationCap className="w-4 h-4" />,
  publication: <Book className="w-4 h-4" />,
  certification: <ShieldCheck className="w-4 h-4" />,
  reference: <Asterisk className="w-4 h-4" />,
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

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // Enhanced mobile view handling
  const [mobileView, setMobileView] = useState<"editor" | "preview">(
    isDesktop ? "editor" : "preview"
  );

  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(); // useState("template1");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [leftPanelView, setLeftPanelView] = useState<"menu" | "form">("menu");
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cvId, setCvId] = useState(initialData?.id || null); // useState<string | null>(null);
  const [cvTitle, setCvTitle] = useState(initialData?.title || "My CV"); // useState("My CV");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
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
          ui_config: { icon: "education", order: 4 },
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
          ui_config: { icon: "skill", order: 5 },
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
          ui_config: { icon: "publication", order: 7 },
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
          ui_config: { icon: "certification", order: 8 },
        },
        {
          id: "references",
          key: "references",
          display_name: "References",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  title: "Name",
                },
                company: {
                  type: "string",
                  title: "Company",
                },
                contact: {
                  type: "string",
                  title: "Contact",
                },
                position: {
                  type: "string",
                  title: "Position",
                },
              },
            },
          },
          ui_config: { icon: "reference", order: 8 },
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
      let toastId: string | undefined;
      toastId = toast.loading(
        isNew ? "Creating new CV..." : "Saving changes..."
      );

      try {
        // 1. Authentication Check
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user) {
          toast.error("Session expired. Please sign in again.", {
            id: toastId,
          });
          throw new Error("Session expired. Please sign in again.");
        }

        // 2. Template Validation
        if (!selectedTemplate?.id) {
          toast.error("Please select a template before saving.", {
            id: toastId,
          });
          throw new Error("Please select a template before saving.");
        }

        // Get the full template data
        const template = templates.find((t) => t.id === selectedTemplate.id);
        if (!template) {
          toast.error("Selected template not found.", { id: toastId });
          throw new Error("Selected template not found.");
        }

        // 3. Data Validation
        if (!cvTitle.trim()) {
          toast.error("CV title cannot be empty.", { id: toastId });
          throw new Error("CV title cannot be empty.");
        }

        // 4. Prepare CV Data
        const cvData = {
          title: cvTitle.trim(),
          cv_data: form,
          template_id: selectedTemplate.id,
          template_config: template.template_config,
          is_public: form.is_public || false,
          updated_at: new Date().toISOString(),
        };

        debugger;
        // 5. Save Operation
        let result;
        if (isNew || !cvId) {
          result = await supabase
            .from("user_cvs")
            .insert({
              ...cvData,
              user_id: user.id,
              slug: `cv-${Date.now()}`,
              created_at: new Date().toISOString(),
            })
            .select()
            .single();
        } else {
          console.log("Trying to update CV", { cvId, userId: user.id, cvData });

          // 1. First get current CV state
          const { data: currentCV, error: fetchError } = await supabase
            .from("user_cvs")
            .select("template_id, updated_at")
            .eq("id", cvId)
            .single();

          if (fetchError) throw fetchError;

          // 2. Check if template is actually changing
          const isTemplateChanging =
            currentCV?.template_id !== selectedTemplate.id;

          if (isTemplateChanging) {
            // 3. Get count of existing links (using count() for efficiency)
            const { count: linkCount, error: countError } = await supabase
              .from("cv_links")
              .select("*", { count: "exact", head: true })
              .eq("cv_id", currentCV.template_id);

            if (countError) throw countError;

            // 4. If links exist, show confirmation
            if (linkCount && linkCount > 0) {
              try {
                const confirmed = await new Promise<boolean>((resolve) => {
                  toast.custom(
                    (t) => (
                      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
                        <h3 className="font-bold text-lg mb-2">
                          Template Change Warning
                        </h3>
                        <p className="mb-4">
                          This will delete {linkCount} shared link(s). Continue?
                        </p>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              toast.dismiss(t.id);
                              resolve(false);
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              toast.dismiss(t.id);
                              resolve(true);
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    ),
                    { duration: Infinity }
                  );
                });

                if (!confirmed) {
                  toast.dismiss(toastId);
                  setIsLoading(false);
                  return null;
                }

                // 5. Delete links in a transaction
                const { error: deleteError } = await supabase
                  .from("cv_links")
                  .delete()
                  .eq("cv_id", currentCV.template_id);

                if (deleteError) throw deleteError;

                toast.success(`Removed ${linkCount} shared link(s)`);
              } catch (err) {
                console.error("Link deletion failed:", err);
                throw err;
              }
            }
          }

          // 6. Now safe to update the CV
          result = await supabase
            .from("user_cvs")
            .update({
              ...cvData,
              updated_at: new Date().toISOString(),
            })
            .eq("id", cvId)
            .eq("user_id", user.id)
            .select()
            .maybeSingle();
        }

        // 6. Handle Result
        if (result.error) {
          toast.error(result.error.message || "Failed to save CV.", {
            id: toastId,
          });
          throw result.error;
        }

        if (result.data) {
          setCvId(result.data.id);
          toast.success(
            isNew ? "CV created successfully!" : "CV saved successfully!",
            { id: toastId }
          );

          // Additional success actions
          if (isNew) {
            router.push(`/protected/cv-builder/${result.data.id}`);
          }

          return result.data;
        }

        toast.error("No data returned from save operation.", { id: toastId });
        throw new Error("No data returned from save operation.");
      } catch (error: any) {
        console.error("CV Save Error:", error);

        // Only show additional toast if not already shown
        if (
          !error.message?.includes("Please select") &&
          !error.message?.includes("Session expired") &&
          !error.message?.includes("CV title") &&
          !error.message?.includes("Selected template")
        ) {
          toast.error(error.message || "Failed to save CV.", { id: toastId });
        }

        // Special handling for specific error codes
        if (error.code === "42501") {
          // RLS violation
          toast("Please refresh your session", { icon: "🔄" });
        }

        throw error; // Re-throw for calling function if needed
      } finally {
        setIsLoading(false);
      }
    },
    [form, selectedTemplate, cvTitle, cvId, templates, router]
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

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

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
        <div className="space-y-4">
          <div className="space-y-4">
            {items.map((item: any, index: number) => (
              <div
                key={index}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {Object.entries(properties).map(
                    ([fieldKey, config]: [string, any]) => (
                      <div key={fieldKey} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {config.title || fieldKey}
                        </label>
                        {config.enum ? (
                          <select
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
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
                            <option value="">Select {fieldKey}</option>
                            {config.enum.map((option: string) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : config.format === "date" ? (
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                            value={item?.[fieldKey] || ""}
                            onChange={(e) =>
                              handleInputChange(
                                section.key as keyof FormData,
                                fieldKey,
                                e.target.value,
                                index
                              )
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                            value={item?.[fieldKey] || ""}
                            placeholder={`Enter ${config.title || fieldKey}`}
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
                </div>

                <button
                  onClick={() => handleRemoveArrayItem(section.key, index)}
                  className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${section.display_name}`}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleAddArrayItem(section.key)}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg border border-dashed border-blue-200 dark:border-blue-800 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {section.display_name}
          </button>
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
          <div className="space-y-2">
            <Label>Professional Summary</Label>
            <textarea
              value={form.objective?.summary || ""}
              onChange={(e) =>
                handleInputChange("objective", "summary", e.target.value)
              }
              placeholder="Example: Experienced software engineer with 5+ years in web development specializing in React and Node.js..."
              className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors"
              rows={4}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Write 2-4 sentences about your professional background and goals
            </p>
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
      case "13ed4517-ac3a-4afb-bd91-708d3c449553":
        return <MechanicalEngineerTemplate {...templateProps} />;
      case "cf7dc6c6-7c52-42b7-ab4b-6b07f503124b":
        return <SoftwareExpertTemplate {...templateProps} />;
      case "executive":
        return <ExecutiveTemplate {...templateProps} />;
      default:
        return <ClassicTemplate {...templateProps} />;
    }
  };

  const renderMobileHeader = () => (
    <div className="lg:hidden sticky top-0 z-50 bg-white dark:bg-gray-900 border-b p-4 flex items-center justify-between shadow-sm">
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
      >
        {mobileSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
          {cvTitle || "My CV"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setMobileView("editor")}
          className={`px-3 py-1 text-sm rounded-full ${mobileView === "editor" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"}`}
        >
          Edit
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`px-3 py-1 text-sm rounded-full ${mobileView === "preview" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"}`}
        >
          Preview
        </button>
      </div>
    </div>
  );

  const renderSidebarContent = () => (
    <div className="space-y-6">
      <PremiumBanner />

      {/* Title and Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl mb-6">
        <input
          value={cvTitle}
          onChange={(e) => setCvTitle(e.target.value)}
          placeholder="CV Title"
          className="flex-1 min-w-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center space-x-2">
            <label htmlFor="public-toggle" className="cursor-pointer">
              {form.is_public ? (
                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </label>

            {/* Toggle Switch */}
            <div className="relative inline-block w-10 align-middle select-none">
              <input
                type="checkbox"
                id="public-toggle"
                checked={form.is_public || false}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, is_public: e.target.checked }))
                }
                className="sr-only" // Hide the default checkbox visually but keep it accessible
              />
              <label
                htmlFor="public-toggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                  form.is_public
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    form.is_public ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </label>
            </div>
          </div>

          <button
            onClick={() => saveCV(false)}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveSection(null)}
          className={`px-4 py-2 text-sm font-medium ${!activeSection ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          <span className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4" />
            Templates
          </span>
        </button>
        <button
          onClick={() => setActiveSection(sections[0]?.id)}
          className={`px-4 py-2 text-sm font-medium ${activeSection ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Sections
          </span>
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {!activeSection ? (
          <>
            {/* Templates View */}
            <div className="space-y-4">
              {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Choose a Template
              </h3> */}
              {/* In your renderSidebarContent or template selection section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`relative rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-300 group h-48 ${selectedTemplate?.id === template.id ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-200 dark:border-gray-700 hover:border-blue-300"}`}
                  >
                    {/* Add a fixed height container */}
                    <div className="relative h-full w-full">
                      {template.thumbnail_url ? (
                        <Image
                          src={template.thumbnail_url}
                          alt={template.name}
                          fill
                          className="object-contain object-top py-3"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={selectedTemplate?.id === template.id}
                        />
                      ) : (
                        <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                          <span className="text-gray-500">No preview</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-white text-xs font-semibold">
                          {template.name}
                        </h4>
                        {selectedTemplate?.id === template.id && (
                          <div className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full text-white">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      {template.is_premium && (
                        <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-bold text-amber-800 bg-amber-100 rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Sections View */}
            <div className="space-y-4">
              <button
                onClick={() => setActiveSection(null)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to templates
              </button>

              <div className="space-y-2">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between p-4 ${activeSection === section.id ? "bg-blue-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          {section.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {section.display_name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {section.schema.type === "array"
                              ? `Manage your ${section.display_name.toLowerCase()}`
                              : "Edit details"}
                          </p>
                        </div>
                      </div>
                      {expandedSections[section.id] ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    {expandedSections[section.id] && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        {renderFormFields(section)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderSectionEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setLeftPanelView("menu");
            if (!isDesktop) setMobileSidebarOpen(true);
          }}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">Customize Section</h3>
      </div>

      <Separator />

      <div className="pt-2">
        {sections.length && activeSection
          ? renderFormFields(sections.find((s) => s.id === activeSection)!)
          : null}
      </div>
    </div>
  );

  const renderPreviewPanel = () => (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Preview Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="text-sm text-gray-500 dark:text-gray-400">Preview</div>
        <div className="flex items-center gap-2">
          {selectedTemplate && <CVLinkManager cvId={selectedTemplate.id} />}
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
      </div>

      {/* CV Preview Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {renderPreview()}
        </div>
      </div>
    </div>
  );

  // Mobile layout
  if (!isDesktop) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {renderMobileHeader()}

        <div className="flex-1 overflow-hidden relative">
          {/* Mobile Sidebar */}
          {mobileSidebarOpen && (
            <div className="absolute inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto p-4">
              {renderSidebarContent()}
            </div>
          )}

          {/* Main Content */}
          <div className="h-full">
            {mobileView === "editor" ? (
              <div className="p-4 h-full overflow-y-auto">
                {renderSidebarContent()}
              </div>
            ) : (
              renderPreviewPanel()
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Editor Sidebar */}
      <div className="w-96 border-r border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900 overflow-y-auto">
        {renderSidebarContent()}
      </div>

      {/* Preview Panel */}
      <div className="flex-1 overflow-hidden">{renderPreviewPanel()}</div>
    </div>
  );
}
