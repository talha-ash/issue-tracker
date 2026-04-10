import { Link, useLocation } from '@tanstack/react-router';
import { Plus, MoreHorizontal, LogOut } from 'lucide-react';
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
} from '@issue-tracker/ui/components';

import { useLanguage } from '@/lib/i18n';
import { projects, currentUser } from '@/lib/mock-data';
import { useLogout } from '#/feature/logout/useLogout';

export function ProjectSidebar() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const { handleLogout } = useLogout();
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">
              IT
            </span>
          </div>
          <span className="text-lg font-semibold">{t('app.name')}</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            {t('nav.projects')}
          </SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <Link to="/projects/new" title={t('project.new')}>
              <Plus className="size-4" />
            </Link>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map(project => {
                const isActive =
                  pathname === `/projects/${project.id}` ||
                  pathname.startsWith(`/projects/${project.id}/`);
                return (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={isActive ? 'border-l-2 border-primary' : ''}
                    >
                      <Link
                        to="/projects/$projectId"
                        params={{ projectId: project.id }}
                      >
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="truncate">{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal className="size-4" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem asChild>
                          <Link
                            to="/projects/$projectId"
                            params={{ projectId: project.id }}
                          >
                            {t('project.details')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            to="/projects/$projectId/edit"
                            params={{ projectId: project.id }}
                          >
                            {t('project.edit')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          {t('project.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                );
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
          <Button variant="ghost" size="icon-sm" asChild onClick={handleLogout}>
            <Link to="/login" title={t('nav.logout')}>
              <LogOut className="size-4" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
