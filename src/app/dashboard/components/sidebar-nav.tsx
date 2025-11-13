'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Briefcase, HardHat, User, FileText, CheckSquare, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: ('Empresa' | 'Profissional' | 'Cliente')[];
};

const navItems: NavItem[] = [
  { href: '/dashboard/admin', label: 'Dashboard Admin', icon: LayoutDashboard, roles: ['Empresa'] },
  { href: '/dashboard/contractor', label: 'Dashboard Profissional', icon: LayoutDashboard, roles: ['Profissional'] },
  { href: '/dashboard/client', label: 'Dashboard Cliente', icon: LayoutDashboard, roles: ['Cliente'] },
  { href: '/dashboard/admin', label: 'Gerir Projetos', icon: Briefcase, roles: ['Empresa'] },
  { href: '/dashboard/admin/users', label: 'Gerir Utilizadores', icon: User, roles: ['Empresa'] },
  { href: '/dashboard/contractor', label: 'Projetos Disponíveis', icon: Briefcase, roles: ['Profissional'] },
  { href: '/dashboard/contractor/proposals', label: 'Minhas Propostas', icon: FileText, roles: ['Profissional'] },
  { href: '/dashboard/client', label: 'Meus Projetos', icon: CheckSquare, roles: ['Cliente'] },
  { href: '/dashboard/client/new', label: 'Novo Projeto', icon: Briefcase, roles: ['Cliente'] },
];

function getRoleFromPath(pathname: string): 'Empresa' | 'Profissional' | 'Cliente' | null {
  if (pathname.startsWith('/dashboard/admin')) return 'Empresa';
  if (pathname.startsWith('/dashboard/contractor')) return 'Profissional';
  if (pathname.startsWith('/dashboard/client')) return 'Cliente';
  return 'Empresa'; // Default for demo
}

export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const currentRole = getRoleFromPath(pathname);

  const filteredNavItems = navItems.filter(item => currentRole && item.roles.includes(currentRole));
  
  // This is for demo purposes to allow switching between roles
  const roleSwitchItems = [
    { href: '/dashboard/admin', label: 'Ver como Admin', icon: Briefcase, },
    { href: '/dashboard/contractor', label: 'Ver como Profissional', icon: HardHat, },
    { href: '/dashboard/client', label: 'Ver como Cliente', icon: User, },
  ]

  return (
    <>
      <p className="text-xs font-semibold text-sidebar-foreground/70 px-2 pb-2 group-data-[collapsible=icon]:hidden">Navegação Principal</p>
      <SidebarMenu>
        {filteredNavItems.map((item) => (
          <SidebarMenuItem key={item.href}>
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
      
      {state === 'expanded' && (
        <div className="mt-8">
          <p className="text-xs font-semibold text-sidebar-foreground/70 px-2 pb-2">Mudar de Perfil (Demo)</p>
          <SidebarMenu>
            {roleSwitchItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    variant='outline'
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      )}
    </>
  );
}
