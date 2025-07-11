import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

// Define allowed routes when not in development (waiting list mode)
const allowedRoutesInWaitingList = [
  '/waiting-list',
  '/about',
  '/pricing',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/public'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if we're not in development environment
  const isDevelopment = process.env.ENVIRONMENT === 'development';
  
  if (isDevelopment) {
    // Check if the current path is allowed in waiting list mode
    const isAllowedRoute = allowedRoutesInWaitingList.some(route => 
      pathname.startsWith(route)
    );
    
    // If not an allowed route, redirect to waiting list
    if (!isAllowedRoute) {
      return NextResponse.redirect(new URL('/waiting-list', request.url));
    }
  }

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

    // Note: We can't validate the session token in middleware due to Edge Runtime limitations
    // The actual validation will happen in the API routes or server components
    // For now, we just check if the token exists
  }

  // For auth routes, redirect to dashboard if already authenticated
  if (isAuthRoute && sessionToken) {
    // Note: We can't validate the session token in middleware due to Edge Runtime limitations
    // The actual validation will happen in the API routes or server components
    // For now, we just check if the token exists
    return NextResponse.redirect(new URL('/dashboard', request.url));
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