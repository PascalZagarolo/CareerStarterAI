import puppeteer from 'puppeteer'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Forward all query params to the export page
  const url = new URL(request.url);
  const params = url.searchParams.toString();
  const exportUrl = `http://localhost:3000/resume-export${params ? '?' + params : ''}`;
  console.log("exportUrl", exportUrl);

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Go to about:blank first to clear state
  await page.goto('about:blank');
  // Now go to the export page
  await page.goto(exportUrl, { waitUntil: 'networkidle2' });

  // Wait a bit to ensure JS parsing (optional, but can help)
  await new Promise(r => setTimeout(r, 2500));

  // Generate PDF as a buffer (do not use the 'path' option)
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  // Return the PDF buffer as a response
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="hn.pdf"',
    },
  });
} 