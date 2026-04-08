import { useLocation } from '@tanstack/react-router'
import { Plus, MoreHorizontal, LogOut } from 'lucide-react'
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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  Button,
} from '@issue-tracker/ui/components'
import { projects, currentUser } from '@/components/sidebar/mock-data'

// NOTE: plain <a> elements are used for navigation here because the target
// routes (/dashboard, /projects/...) don't exist in the TanStack Router tree
// yet. Swap to <Link to="..."> from @tanstack/react-router as routes land.

export function ProjectSidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <a href="/dashboard" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">IT</span>
          </div>
          <span className="text-lg font-semibold">Issue Tracker</span>
        </a>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            Projects
          </SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <a href="/projects/new" title="New project">
              <Plus className="size-4" />
            </a>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => {
                const isActive =
                  pathname === `/projects/${project.id}` ||
                  pathname.startsWith(`/projects/${project.id}/`)
                return (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={isActive ? 'border-l-2 border-primary' : ''}
                    >
                      <a href={`/projects/${project.id}`}>
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="truncate">{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal className="size-4" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem asChild>
                          <a href={`/projects/${project.id}`}>Details</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/projects/${project.id}/edit`}>Edit</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
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
