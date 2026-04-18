'use client';

import { SidebarProvider, SidebarInset } from '@issue-tracker/ui/components';
import { Header } from '@/components/header';
import { ProjectSidebar } from '@/components/sidebar/project-sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProjectSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
