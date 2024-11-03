import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

const publicPaths = [
  '/',
  '/about',
  '/blog',
  '/mentors',
  '/programs',
  '/events',
  '/auth/signin',
  '/auth/register',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('session');

  if (!sessionCookie?.value) {
    return Response.redirect(new URL('/auth/signin', request.url));
  }

  try {
    await verifyAuth(sessionCookie.value);
    return NextResponse.next();
  } catch {
    return Response.redirect(new URL('/auth/signin', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};