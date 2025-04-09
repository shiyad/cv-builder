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
    id: string;
    template_config: any;
  };
}) {
  const supabase = createClient();

  const generatePDF = async () => {
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
    const element = document.getElementById("cv-preview");
    if (!element) throw new Error("Preview not found");

    // Clone the element to modify for PDF
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = "794px";
    clone.style.padding = "0";
    clone.style.margin = "0";

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
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to generate PDF");
      return await res.blob();
    } finally {
      document.body.removeChild(clone);
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
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Track download in database
      const { error } = await supabase.from("downloads").insert({
        user_id: user.id,
        cv_id: cv.id,
        format,
      });

      if (error) throw error;

      toast.loading(`Generating ${format.toUpperCase()}...`);
      let fileBlob: Blob;

      if (format === "pdf") {
        try {
          fileBlob = await generatePDFWithPuppeteer();
        } catch (e) {
          console.warn("Puppeteer failed, falling back to client-side:", e);
          fileBlob = await generatePDF();
        }
      } else {
        fileBlob = await generateDOCX();
      }

      const fileName = `${cv.title.replace(/\s+/g, "_")}.${format}`;
      saveAs(fileBlob, fileName);

      toast.dismiss();
      toast.success(`Download started!`);
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to generate ${format.toUpperCase()}`);
      console.error("Download error:", error);
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
        <DropdownMenuItem onClick={() => handleDownload("docx")}>
          Word (DOCX)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
