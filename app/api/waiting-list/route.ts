
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { waitingList } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    console.log("Waiting list submission")
    // Check if request has a body
   

  
    const values  = await request.json()

    console.log(values?.email)

    // Validate required fields
    if (!values?.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values?.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEntry = await db
      .select()
      .from(waitingList)
      .where(eq(waitingList.email, values?.email))
      .limit(1);

    if (existingEntry.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Get IP address and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Get UTM parameters from URL
    const url = new URL(request.url);
    const utmSource = url.searchParams.get('utm_source');
    const utmMedium = url.searchParams.get('utm_medium');
    const utmCampaign = url.searchParams.get('utm_campaign');

    // Insert new waiting list entry
    const newEntry = await db.insert(waitingList).values({
      email: values?.email as string,
      firstName: null,
      lastName: null,
      company: null,
      jobTitle: null,
      industry: null,
      companySize: null,
      interests: [],
      referralSource: null,
      expectedUsage: null,
      budget: null,
      timeline: null,
      additionalInfo: null,
      ipAddress,
      userAgent,
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      utmCampaign: utmCampaign || null,
    }).returning();

    console.log('Waiting list submission saved to database:', {
      id: newEntry[0].id,
      email: values?.email,
      ipAddress,
      userAgent,
      utmSource,
      utmMedium,
      utmCampaign,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waiting list',
        id: newEntry[0].id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding to waiting list:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const entries = await db
      .select()
      .from(waitingList)
      .orderBy(waitingList.createdAt);

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Error fetching waiting list:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 