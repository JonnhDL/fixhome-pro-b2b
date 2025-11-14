'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Briefcase, User, FileText, CheckSquare, PlusCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: ('admin' | 'contractor' | 'client')[];
};

const navItems: NavItem[] = [
  // Admin navigation
  { 
    href: '/dashboard/admin', 
    label: 'Dashboard Admin', 
    icon: LayoutDashboard, 
    roles: ['admin'] 
  },
  { 
    href: '/dashboard/admin', 
    label: 'Gerir Projetos', 
    icon: Briefcase, 
    roles: ['admin'] 
  },
  { 
    href: '/dashboard/admin', 
    label: 'Gerir Utilizadores', 
    icon: User, 
    roles: ['admin'] 
  },
  
  // Contractor navigation
  { 
    href: '/dashboard/contractor', 
    label: 'Dashboard Profissional', 
    icon: LayoutDashboard, 
    roles: ['contractor'] 
  },
  { 
    href: '/dashboard/contractor', 
    label: 'Projetos Disponíveis', 
    icon: Briefcase, 
    roles: ['contractor'] 
  },
  { 
    href: '/dashboard/contractor', 
    label: 'Minhas Propostas', 
    icon: FileText, 
    roles: ['contractor'] 
  },
  
  // Client navigation
  { 
    href: '/dashboard/client', 
    label: 'Dashboard Cliente', 
    icon: LayoutDashboard, 
    roles: ['client'] 
  },
  { 
    href: '/dashboard/client', 
    label: 'Meus Projetos', 
    icon: CheckSquare, 
    roles: ['client'] 
  },
  { 
    href: '/dashboard/client', 
    label: 'Novo Projeto', 
    icon: PlusCircle, 
    roles: ['client'] 
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { userData, loading } = useAuth();

  // Aguardar carregamento
  if (loading) {
    return (
      <div className="px-2 py-4">
        <div className="h-8 bg-sidebar-accent animate-pulse rounded-md mb-2" />
        <div className="h-8 bg-sidebar-accent animate-pulse rounded-md mb-2" />
        <div className="h-8 bg-sidebar-accent animate-pulse rounded-md" />
      </div>
    );
  }

  // Se não há usuário autenticado, não mostrar nada
  if (!userData) {
    return null;
  }

  // Filtrar itens baseado no role REAL do usuário
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(userData.role)
  );

  return (
    <>
      <p className="text-xs font-semibold text-sidebar-foreground/70 px-2 pb-2 group-data-[collapsible=icon]:hidden">
        Navegação Principal
      </p>
      <SidebarMenu>
        {filteredNavItems.map((item, index) => (
          <SidebarMenuItem key={`${item.href}-${index}`}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}