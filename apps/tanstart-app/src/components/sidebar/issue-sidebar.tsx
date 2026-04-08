import { useLocation } from '@tanstack/react-router'
import { ArrowLeft, Plus, LogOut } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  Avatar,
  AvatarFallback,
  Button,
  ScrollArea,
} from '@issue-tracker/ui/components'
import {
  getProjectById,
  getIssuesByProjectId,
  currentUser,
  type Issue,
} from '@/components/sidebar/mock-data'

// NOTE: plain <a> elements are used for navigation here — see project-sidebar.tsx for context.

interface IssueSidebarProps {
  projectId: string
  currentIssueId?: string
}

function StatusDot({ status }: { status: Issue['status'] }) {
  const colors: Record<Issue['status'], string> = {
    open: 'bg-[var(--status-open)]',
    'in-progress': 'bg-[var(--status-in-progress)]',
    resolved: 'bg-[var(--status-resolved)]',
    closed: 'bg-[var(--status-closed)]',
  }

  return <span className={`size-2 shrink-0 rounded-full ${colors[status]}`} />
}

export function IssueSidebar({ projectId, currentIssueId }: IssueSidebarProps) {
  const { pathname } = useLocation()
  const project = getProjectById(projectId)
  const issues = getIssuesByProjectId(projectId)

  if (!project) return null

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <a
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to projects
        </a>
        <h2 className="mt-2 truncate text-lg font-bold">{project.name}</h2>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Issues</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <button title="New issue">
              <Plus className="size-4" />
            </button>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <SidebarMenu>
                {issues.map((issue) => {
                  const isActive =
                    pathname.includes(`/issues/${issue.id}`) ||
                    currentIssueId === issue.id
                  return (
                    <SidebarMenuItem key={issue.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={isActive ? 'border-l-2 border-primary' : ''}
                      >
                        <a href={`/projects/${projectId}/issues/${issue.id}`}>
                          <StatusDot status={issue.status} />
                          <span className="truncate">{issue.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
          </div>
          <Button variant="ghost" size="icon-sm" asChild>
            <a href="/login" title="Logout">
              <LogOut className="size-4" />
            </a>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
