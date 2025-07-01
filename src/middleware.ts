import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSessionToken } from '@/lib/session';

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/api/protected',
  '/resume-builder',
  '/cover-letter',
  '/interview-prep',
  '/job-search',
  '/networking',
  '/career-path',
  '/ai-headshot',
  '/career-blog',
  '/career-resources'
];

// Define auth routes (should redirect if already logged in)
const authRoutes = [
  '/signin',
  '/signup'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Get session token from cookie
  const sessionToken = request.cookies.get('session_token')?.value;

  // For protected routes, check authentication
  if (isProtectedRoute) {
    if (!sessionToken) {
      // Redirect to signin if no session token
      const signinUrl = new URL('/signin', request.url);
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }

    try {
      // Validate session token
      const session = await validateSessionToken(sessionToken);
      if (!session) {
        // Invalid session, redirect to signin
        const signinUrl = new URL('/signin', request.url);
        signinUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(signinUrl);
      }
    } catch (error) {
      // Session validation failed, redirect to signin
      const signinUrl = new URL('/signin', request.url);
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // For auth routes, redirect to dashboard if already authenticated
  if (isAuthRoute && sessionToken) {
    try {
      const session = await validateSessionToken(sessionToken);
      if (session) {
        // Valid session, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // Session validation failed, continue to auth page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 