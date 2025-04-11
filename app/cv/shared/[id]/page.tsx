// app/cv/shared/[id]/page.tsx
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { use } from "react";
import { getTemplateStyles } from "@/components/template-styles";
import {
  AcademicTemplate,
  ClassicTemplate,
  CreativeTemplate,
  ExecutiveTemplate,
  ModernTemplate,
  TechTemplate,
  TwoColumnTemplate,
} from "@/components/templates";
import { TwoColumnShaderTemplate } from "@/components/templates/TwoColumnShader";
import { ClassicBlueTemplate } from "@/components/templates/ClassicBlueTemplate";
import { PilotModernTemplate } from "@/components/templates/PilotModernTemplate";
import { PilotTemplate } from "@/components/templates/PilotTemplate";
import { AccountingTemplate } from "@/components/templates/AccountingTemplate";
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate";
import { ExecutiveModernTemplate } from "@/components/templates/ExecutiveModernTemplate";
import { MechanicalEngineerTemplate } from "@/components/templates/MechanicalEngineerTemplate";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { Download, FileText, Sparkles } from "lucide-react";
import { DownloadButton } from "@/components/cv/download-button";
import { motion } from "framer-motion";

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

interface TemplatesPageProps {
  initialData?: {
    id?: string;
    title: string;
    cv_data: FormData;
    template_id: string | null;
    template_config: any;
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

// Define a proper type for your CV data
interface CVData {
  id: string;
  title: string;
  cv_data: FormData;
  template_id?: string;
  template_config: any;
  is_public: boolean;
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const supabase = createClient();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const isSharedView = searchParams.get("shared") === "true";

  const [selectedTemplateConfig, setSelectedTemplateConfig] =
    useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const [form, setForm] = useState<FormData>({});

  const router = useRouter();

  useEffect(() => {
    const fetchCV = async () => {
      setLoading(true);

      // Step 1: Lookup the link via slug (params.id)
      const { data: linkData, error: linkError } = await supabase
        .from("cv_links")
        .select("cv_id, is_active")
        .eq("cv_id", params.id)
        .single();

      if (linkError || !linkData?.is_active) {
        setCvData(null);
        setLoading(false);
        return;
      }

      // Step 2: Fetch the actual CV by its ID
      const { data: cv, error: cvError } = await supabase
        .from("user_cvs")
        .select("*")
        .eq("template_id", linkData.cv_id)
        .single();

      if (cvError || !cv?.is_public) {
        setCvData(null);
      } else {
        setCvData(cv as CVData);
        setForm(cv.cv_data);

        if (cv.template_config) {
          setSelectedTemplateConfig(cv.template_config);
        }
      }

      setLoading(false);
    };

    fetchCV();
  }, [params.id, supabase]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );

  if (!cvData)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CV Not Found</h1>
        <p className="text-gray-600 mb-6">
          The requested CV could not be loaded.
        </p>
        <Button onClick={() => router.push("/cv-builder")}>
          Create New CV
        </Button>
      </div>
    );

  const renderPreview = () => {
    const styles = getTemplateStyles(selectedTemplateConfig);
    const templateProps = {
      formData: form,
      styles,
      previewMode: false,
    };

    switch (params.id) {
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
      case "executive":
        return <ExecutiveTemplate {...templateProps} />;
      default:
        return <ClassicTemplate {...templateProps} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Header Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-6xl w-full mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              variant="outline"
              onClick={() => router.push("/sign-up")}
              className="gap-2 font-medium"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Create Your CV Now
            </Button>
          </motion.div>

          <div className="flex items-center gap-4">
            {cvData?.is_public && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Public CV
              </div>
            )}

            <motion.div whileHover={{ scale: 1.05 }}>
              {cvData && (
                <DownloadButton
                  cv={{
                    id: cvData.id,
                    title: cvData.title,
                    cv_data: form,
                  }}
                  template={{
                    id: cvData.template_id || undefined,
                    template_config: cvData.template_config,
                    is_premium: false,
                  }}
                ></DownloadButton>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 py-8">
        {isSharedView && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl w-full mx-auto px-6 mb-8"
          >
            <div className="bg-blue-50/80 border border-blue-100 text-blue-800 p-4 rounded-xl shadow-sm flex items-center gap-3">
              <div className="flex-1">
                <h3 className="font-medium">Shared CV View</h3>
                <p className="text-sm text-blue-700/80">
                  This is a shared responsive-view of the CV. For full view
                  download it.
                </p>
              </div>
              {/* <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800"
              >
                View Analytics
              </Button> */}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl w-full mx-auto px-6"
        >
          <div className="bg-white rounded-xl py-8 shadow-lg overflow-hidden border border-gray-200">
            {renderPreview()}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-6xl w-full mx-auto px-6 mt-12"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-xl border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Ready to create your own?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Impress employers with a professionally designed CV in minutes.
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/cv-builder")}
              className="gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Start Building Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
