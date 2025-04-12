"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { useRouter } from "next/navigation";

export function DownloadButton({
  cv,
  template,
}: {
  cv: {
    id: string;
    title: string;
    cv_data: any;
  };
  template: {
    id?: string;
    template_config: any;
    is_premium?: boolean;
  };
}) {
  const supabase = createClient();
  const router = useRouter();

  const checkPremiumAccess = async () => {
    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      toast.error("Please sign in to download");
      router.push("/sign-in");
      return false;
    }

    // Check if template is premium
    if (template.is_premium) {
      // Check if user has active premium subscription
      const { data: subscription, error: subError } = await supabase
        .from("user_subscriptions")
        .select("status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (subError || !subscription) {
        toast.error("Premium template requires a subscription");
        router.push(
          "/protected/account/subscription?message=Premium%20template%20requires%20a%20subscription"
        );
        return false;
      }
    }

    return true;
  };

  const generatePDF = async () => {
    const hasAccess = await checkPremiumAccess();
    if (!hasAccess) return;

    const element = document.getElementById("cv-preview");
    if (!element) throw new Error("Preview element not found");

    // Store original styles
    const originalStyles = {
      transform: element.style.transform,
      width: element.style.width,
      padding: element.style.padding,
      margin: element.style.margin,
    };

    // Apply PDF-specific styles
    element.style.transform = "scale(1)";
    element.style.width = "794px"; // A4 width in pixels
    element.style.padding = "0";
    element.style.margin = "0";

    // Special handling for images
    const images = element.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "100%";
      img.style.height = "auto";
    });

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: element.scrollHeight,
    });

    // Restore original styles
    element.style.transform = originalStyles.transform;
    element.style.width = originalStyles.width;
    element.style.padding = originalStyles.padding;
    element.style.margin = originalStyles.margin;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Check if content exceeds page height
    const pageHeight = pdf.internal.pageSize.getHeight();
    if (pdfHeight > pageHeight) {
      // Add remaining content to second page
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, -pageHeight, pdfWidth, pdfHeight);
    }

    return pdf.output("blob");
  };

  const generatePDFWithPuppeteer = async (): Promise<Blob> => {
    const hasAccess = await checkPremiumAccess();
    if (!hasAccess) {
      // Return an empty Blob if no access (though the redirect will happen in checkPremiumAccess)
      return new Blob();
    }

    const element = document.getElementById("cv-preview");
    if (!element) throw new Error("Preview not found");

    // Clone the element to modify for PDF
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = "794px"; // A4 width in pixels (210mm ≈ 794px at 96dpi)
    clone.style.padding = "0";
    clone.style.margin = "0";

    // Special handling for images in the clone
    const images = clone.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "100%";
      img.style.height = "auto";
    });

    const html = clone.outerHTML;
    document.body.appendChild(clone);
    clone.style.visibility = "hidden";

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html,
          options: {
            format: "A4",
            margin: "0mm",
            printBackground: true,
            preferCSSPageSize: true,
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate PDF");
      }

      return await res.blob();
    } catch (error) {
      console.error("PDF generation error:", error);
      throw error; // Re-throw to be handled by the calling function
    } finally {
      if (clone.parentNode) {
        document.body.removeChild(clone);
      }
    }
  };

  const generatePDFWithIronPdf = async (): Promise<Blob> => {
    const hasAccess = await checkPremiumAccess();
    if (!hasAccess) {
      return new Blob();
    }

    const element = document.getElementById("cv-preview");
    if (!element) throw new Error("Preview not found");

    // Clone the element to modify for PDF
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = "794px"; // A4 width in pixels (210mm ≈ 794px at 96dpi)
    clone.style.padding = "0";
    clone.style.margin = "0";

    // Special handling for images in the clone
    const images = clone.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "100%";
      img.style.height = "auto";
    });

    const html = clone.outerHTML;
    document.body.appendChild(clone);
    clone.style.visibility = "hidden";

    try {
      const res = await fetch("/api/generate-pdf-iron", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html,
          options: {
            paperSize: "A4",
            margin: 0,
            printBackground: true,
            cssMediaType: "print",
            enableJavaScript: true,
            timeout: 30000, // 30 seconds timeout
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to generate PDF with IronPDF"
        );
      }

      return await res.blob();
    } catch (error) {
      console.error("IronPDF generation error:", error);
      throw error;
    } finally {
      if (clone.parentNode) {
        document.body.removeChild(clone);
      }
    }
  };

  const generateDOCX = async () => {
    const { cv_data } = cv;
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${cv_data.contact_information?.first_name || ""} ${cv_data.contact_information?.last_name || ""}`,
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: cv_data.contact_information?.job_title || "",
                  size: 22,
                }),
              ],
            }),
            new Paragraph({}),
            // Add all other sections here...
          ],
        },
      ],
    });

    return Packer.toBlob(doc);
  };

  const handleDownload = async (format: "pdf" | "docx") => {
    let fileBlob: Blob;
    let user: any = null;

    try {
      // Check authentication
      const { data, error: authError } = await supabase.auth.getUser();
      user = data?.user;

      if (authError || !user) {
        toast.error("Please sign in to download");
        router.push("/sign-in");
        return;
      }

      // Check if template is premium and user has access
      if (template.is_premium) {
        const { data: subscription, error: subError } = await supabase
          .from("user_subscriptions")
          .select("status, plan_id")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (subError || !subscription) {
          toast.error("Premium template requires an active subscription");
          router.push(
            `/protected/account/subscription?redirect=/cv/${cv.id}&template=${template.id}`
          );
          return;
        }

        const { data: plan, error: planError } = await supabase
          .from("subscription_plans")
          .select("features")
          .eq("id", subscription.plan_id)
          .single();

        const features: string[] = Array.isArray(plan?.features)
          ? plan.features
          : [];

        if (planError) {
          // || !features.includes("premium_templates")
          toast.error("Your plan doesn't include premium templates");
          router.push(
            `/protected/account/subscription?upgrade=true&template=${template.id}`
          );
          return;
        }
      }

      // Track download in database (optional but useful)
      const { error: trackError } = await supabase.from("downloads").insert({
        user_id: user.id,
        cv_id: cv.id,
        format,
        is_premium: template.is_premium || false,
      });

      if (trackError) {
        console.error("Failed to track download:", trackError);
        // Continue anyway
      }

      toast.loading(`Generating ${format.toUpperCase()}...`);

      // Generate file
      if (format === "pdf") {
        try {
          const result = await generatePDFWithPuppeteer();
          if (!result)
            throw new Error("PDF generation failed or access denied");
          fileBlob = result; // Now we are certain `result` is a `Blob`
        } catch (puppeteerError) {
          console.warn(
            "Puppeteer PDF generation failed, falling back:",
            puppeteerError
          );
          const fallbackResult = await generatePDF();
          if (!fallbackResult) {
            throw new Error("Fallback PDF generation failed");
          }
          fileBlob = fallbackResult; // This is also a `Blob`
        }
      } else {
        const docxResult = await generateDOCX();
        if (!docxResult) {
          throw new Error("DOCX generation failed");
        }
        fileBlob = docxResult; // This is also a `Blob`
      }

      const fileName = `${cv.title.replace(/\s+/g, "_")}_${new Date()
        .toISOString()
        .slice(0, 10)}.${format}`;

      saveAs(fileBlob, fileName);
      toast.dismiss();
      toast.success(`${format.toUpperCase()} download started!`);
    } catch (error) {
      toast.dismiss();

      if (error instanceof Error) {
        if (error.message.includes("network")) {
          toast.error("Network error - please check your connection");
        } else {
          toast.error(`Failed to generate ${format.toUpperCase()}`);
        }
      } else {
        toast.error("An unexpected error occurred");
      }

      console.error("Download error:", error);

      // Log error to Supabase
      await supabase.from("error_logs").insert({
        user_id: user?.id || null,
        error_type: "download_failed",
        details: JSON.stringify({
          cv_id: cv.id,
          template_id: template.id,
          format,
          error: error instanceof Error ? error.message : String(error),
        }),
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleDownload("pdf")}>
          PDF
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => handleDownload("docx")}>
          Word (DOCX)
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
