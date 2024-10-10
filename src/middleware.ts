// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define ignored routes
const ignoredRoutes = [
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait',
];

// Define public routes
const publicRoutes = [
  '/',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
  '/api/payment/success',
  '/sign-in(.*)', // Regex to match sign-in routes
  '/sign-up(.*)', // Regex to match sign-up routes
];

// Check if the pathname matches any public or ignored route
const isPublicRoute = (pathname: string) => {
  return publicRoutes.some(route => new RegExp(route).test(pathname)) ||
         ignoredRoutes.some(route => new RegExp(route).test(pathname));
};

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;

  // If the route is not public or ignored, protect it
  if (!isPublicRoute(pathname)) {
    const { userId } = auth(); // Get the authenticated user ID

    if (!userId) {
      // If not authenticated, redirect to sign-in page
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next(); // Proceed to the next middleware
});

// Configuration for matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}


// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly