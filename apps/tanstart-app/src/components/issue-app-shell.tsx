import { SidebarProvider, SidebarInset } from '@issue-tracker/ui/components'
import { Header } from '@/components/header'
// TODO: import { IssueSidebar } from '@/components/sidebar/issue-sidebar'

interface IssueAppShellProps {
  projectId: string
  currentIssueId?: string
  children: React.ReactNode
}

export function IssueAppShell({
  projectId: _projectId,
  currentIssueId: _currentIssueId,
  children,
}: IssueAppShellProps) {
  return (
    <SidebarProvider>
      {/* TODO: replace with <IssueSidebar projectId={projectId} currentIssueId={currentIssueId} /> once the sidebar slice is added */}
      <div data-slot="sidebar-placeholder" />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
