import { SidebarProvider, SidebarInset } from '@issue-tracker/ui/components'
import { Header } from '@/components/header'
// TODO: import { ProjectSidebar } from '@/components/sidebar/project-sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* TODO: replace with <ProjectSidebar /> once the sidebar slice is added */}
      <div data-slot="sidebar-placeholder" />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
