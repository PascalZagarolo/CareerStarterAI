import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    let allDevices = false;
    
    // Try to parse request body, but handle cases where no body is sent
    try {
      const body = await request.json();
      allDevices = body.allDevices === true;
    } catch (error) {
      // No body sent, default to current device only
      allDevices = false;
    }
    
    const result = await logout(allDevices);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: allDevices ? 'Logged out from all devices' : 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 