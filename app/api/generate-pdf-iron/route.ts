// app/api/generate-pdf-iron/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Required for IronPDF

export async function POST(request: Request) {
  try {
    // Dynamic import to avoid SSR issues
    const { IronPdfGlobalConfig, PdfDocument } = await import(
      "@ironsoftware/ironpdf"
    );

    // Configure license if needed
    // IronPdfGlobalConfig.setLicenseKey(process.env.IRONPDF_LICENSE_KEY || '');

    const { html, options } = await request.json();

    // Initialize the renderer
    const renderer = await PdfDocument.fromHtml(html, {
      ...options,
      customCssUrl: options.customCssUrl || undefined,
    });

    // Save to buffer
    const pdfBuffer = await renderer.saveAsBuffer();

    // Return the PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: new Headers({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      }),
    });
  } catch (error) {
    console.error("IronPDF generation error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to generate PDF",
      },
      { status: 500 }
    );
  }
}
