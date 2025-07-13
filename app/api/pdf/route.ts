import puppeteer from 'puppeteer'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  let browser;
  try {
    // Forward all query params to the export page
    const url = new URL(request.url);
    const params = url.searchParams.toString();
    const exportUrl = `http://localhost:3000/resume-export${params ? '?' + params : ''}`;
    console.log("exportUrl", exportUrl);

    browser = await puppeteer.launch({
      headless: true, // Use headless mode (invisible)
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });

    // Now go to the export page
    await page.goto(exportUrl, { waitUntil: 'networkidle2' });

    // Wait for content to be fully rendered
    await page.waitForSelector('.resume-preview-print', { timeout: 10000 });
    
    // Additional wait to ensure all fonts and styles are loaded
    await new Promise(r => setTimeout(r, 1000));

    // Generate PDF as a buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Return the PDF buffer directly
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Ensure browser is closed even if there's an error
    if (browser) {
      await browser.close();
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 