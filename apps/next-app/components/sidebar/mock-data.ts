// Placeholder data for the sidebar UI shells.
// TODO: replace with real data sourced from `@issue-tracker/core` feature slices
// (project list use-case + issue list use-case) once those land.

export interface Project {
  id: string
  name: string
  color: string
}

export interface Issue {
  id: string
  title: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
}

export interface CurrentUser {
  name: string
  initials: string
}

export const projects: Project[] = [
  { id: 'web', name: 'Web App', color: '#6366f1' },
  { id: 'api', name: 'API', color: '#10b981' },
  { id: 'mobile', name: 'Mobile', color: '#f59e0b' },
]

export const currentUser: CurrentUser = {
  name: 'Jane Doe',
  initials: 'JD',
}

const issuesByProject: Record<string, Issue[]> = {
  web: [
    { id: 'web-1', title: 'Dark mode flicker', status: 'open' },
    { id: 'web-2', title: 'Login redirect loop', status: 'in-progress' },
  ],
  api: [{ id: 'api-1', title: 'Rate limiting', status: 'resolved' }],
  mobile: [],
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getIssuesByProjectId(id: string): Issue[] {
  return issuesByProject[id] ?? []
}
