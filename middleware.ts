import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('🔒 MIDDLEWARE:', pathname);
  
  if (pathname.startsWith('/dashboard')) {
    const session = request.cookies.get('__session');
    
    console.log('🛡️ Dashboard - Session:', session?.value || 'NONE');
    
    if (!session) {
      console.log('❌ BLOQUEANDO');
      return NextResponse.redirect(new URL('/auth/login?blocked=true', request.url));
    }
    
    console.log('✅ PERMITINDO');
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};