import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { UserNav } from './components/user-nav';
import { SidebarNav } from './components/sidebar-nav';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader>
            <Logo inSidebar />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="p-2">
             <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">Definições</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-500" asChild>
              <Link href="/">
                <LogOut className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">Sair</span>
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-card px-6 sticky top-0 z-30">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex-1">
              {/* Maybe a search bar or breadcrumbs in the future */}
            </div>
            <UserNav />
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
