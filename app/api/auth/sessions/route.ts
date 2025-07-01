import { NextRequest, NextResponse } from 'next/server';
import { getUserActiveSessions, logout } from '@/lib/auth';

export async function GET() {
  try {
    const sessions = await getUserActiveSessions();

    if (sessions === null) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      sessions: sessions.map(session => ({
        id: session.id,
        ip: session.ip,
        browserAgent: session.browserAgent,
        createdAt: session.createdAt,
        // Don't include secretHash for security
      }))
    });

  } catch (error) {
    console.error('Get sessions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { allDevices } = await request.json();
    
    const result = await logout(allDevices === true);

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