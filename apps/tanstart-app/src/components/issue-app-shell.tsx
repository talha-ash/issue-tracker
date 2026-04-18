'use client';

import { SidebarProvider, SidebarInset } from '@issue-tracker/ui/components';
import { Header } from '@/components/header';
import { IssueSidebar } from '@/components/sidebar/issue-sidebar';

interface IssueAppShellProps {
  projectId: string;
  currentIssueId?: string;
  children: React.ReactNode;
}

export function IssueAppShell({
  projectId,
  currentIssueId,
  children,
}: IssueAppShellProps) {
  return (
    <SidebarProvider>
      <IssueSidebar projectId={projectId} currentIssueId={currentIssueId} />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
