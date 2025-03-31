import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without authentication)
  const isPublicPath = path === '/';
  
  // Define authentication paths
  const isAuthPath = path === '/sign-in' || path === '/sign-up';
  
  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';
  
  // If the user is on the landing page (/) and is logged in, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If the user is on auth pages and is logged in, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If the user is not on a public path and is not logged in, redirect to landing page
  if (!isPublicPath && !isAuthPath && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/dashboard/:path*',
    '/interview/:path*',
  ],
}
