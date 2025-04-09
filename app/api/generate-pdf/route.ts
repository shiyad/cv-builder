import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();

    if (!html) {
      return NextResponse.json(
        { error: "HTML content missing" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(
      `
        <html>
          <head>
            <style>
              @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
              body { font-family: sans-serif; padding: 0rem; }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `,
      { waitUntil: "networkidle0" }
    );

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
