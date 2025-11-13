import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'create') {
      // Criar cookie de sessão
      const cookieStore = await cookies();
      cookieStore.set('__session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
      });
      
      return NextResponse.json({ success: true });
    }
    
    if (action === 'delete') {
      // Remover cookie de sessão
      const cookieStore = await cookies();
      cookieStore.delete('__session');
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Erro na API de sessão:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}