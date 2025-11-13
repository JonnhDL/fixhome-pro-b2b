'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<'admin' | 'client' | 'contractor'>;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no estamos cargando y no hay datos de usuario, redirigir a login
    if (!loading && !userData) {
      router.push('/auth/login');
      return;
    }

    // Si no estamos cargando, hay datos de usuario, pero su rol no está permitido
    if (!loading && userData && !allowedRoles.includes(userData.role)) {
      // Redirigir al dashboard principal para que él decida
      router.push('/dashboard');
    }
  }, [userData, loading, router, allowedRoles]);

  // Mientras se cargan los datos del usuario, mostrar un spinner
  if (loading || !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-foreground" />
      </div>
    );
  }

  // Si el rol del usuario no está permitido, no renderizar nada (ya se está redirigiendo)
  if (!allowedRoles.includes(userData.role)) {
    return null;
  }

  // Si todo está bien (autenticado y con rol permitido), mostrar el contenido de la página
  return <>{children}</>;
}