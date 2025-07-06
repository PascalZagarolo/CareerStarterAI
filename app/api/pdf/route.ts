import puppeteer from 'puppeteer'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/resume-export', {
    waitUntil: 'networkidle2',
  });

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