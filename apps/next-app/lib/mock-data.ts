export type Status = 'open' | 'in-progress' | 'resolved' | 'closed';
export type Priority = 'urgent' | 'high' | 'medium' | 'low';
export type Role = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  color: string;
  visibility: 'private' | 'public';
  createdAt: string;
  issueCount: number;
  memberCount: number;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  projectId: string;
  assignee?: User;
  reporter: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  issueId: string;
  author: User;
  content: string;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
}

export interface Member {
  id: string;
  user: User;
  projectId: string;
  role: Role;
  joinedAt: string;
}

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  initials: 'JD',
};

export const users: User[] = [
  currentUser,
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', initials: 'JS' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', initials: 'BW' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', initials: 'AB' },
  {
    id: '5',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    initials: 'CD',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    key: 'WEB',
    description:
      'Complete redesign of the company website with modern UI/UX principles and improved performance.',
    color: '#6366f1',
    visibility: 'private',
    createdAt: '2025-01-15',
    issueCount: 24,
    memberCount: 8,
  },
  {
    id: '2',
    name: 'Mobile App',
    key: 'MOB',
    description: 'Native mobile application for iOS and Android platforms.',
    color: '#22c55e',
    visibility: 'private',
    createdAt: '2025-02-01',
    issueCount: 18,
    memberCount: 5,
  },
  {
    id: '3',
    name: 'API Development',
    key: 'API',
    description: 'RESTful API development for backend services.',
    color: '#f59e0b',
    visibility: 'public',
    createdAt: '2025-01-20',
    issueCount: 12,
    memberCount: 4,
  },
  {
    id: '4',
    name: 'Documentation',
    key: 'DOC',
    description: 'Technical documentation and user guides.',
    color: '#ec4899',
    visibility: 'public',
    createdAt: '2025-03-01',
    issueCount: 6,
    memberCount: 3,
  },
];

export const issues: Issue[] = [
  {
    id: '1',
    number: 1,
    title: 'Implement user authentication flow',
    description:
      'Create a complete authentication system including login, signup, password reset, and session management. The system should support OAuth providers (Google, GitHub) and email/password authentication.',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    assignee: users[1] as User,
    reporter: currentUser,
    dueDate: '2025-04-15',
    createdAt: '2025-03-20',
    updatedAt: '2025-03-28',
  },
  {
    id: '2',
    number: 2,
    title: 'Design system documentation',
    description:
      'Document all design tokens, components, and patterns used in the application.',
    status: 'open',
    priority: 'medium',
    projectId: '1',
    assignee: users[2] as User,
    reporter: users[1] as User,
    dueDate: '2025-04-20',
    createdAt: '2025-03-22',
    updatedAt: '2025-03-22',
  },
  {
    id: '3',
    number: 3,
    title: 'Fix navigation menu on mobile',
    description:
      'The navigation menu is not properly closing on mobile devices after selecting a menu item.',
    status: 'resolved',
    priority: 'urgent',
    projectId: '1',
    assignee: users[0] as User,
    reporter: users[3] as User,
    createdAt: '2025-03-25',
    updatedAt: '2025-03-30',
  },
  {
    id: '4',
    number: 4,
    title: 'Optimize image loading',
    description:
      'Implement lazy loading for images and use next-gen formats like WebP.',
    status: 'open',
    priority: 'low',
    projectId: '1',
    reporter: users[2] as User,
    dueDate: '2025-05-01',
    createdAt: '2025-03-28',
    updatedAt: '2025-03-28',
  },
  {
    id: '5',
    number: 5,
    title: 'Add dark mode support',
    description:
      'Implement a dark mode theme with proper color contrast and user preference persistence.',
    status: 'closed',
    priority: 'medium',
    projectId: '1',
    assignee: users[4] as User,
    reporter: currentUser,
    createdAt: '2025-03-10',
    updatedAt: '2025-03-29',
  },
  {
    id: '6',
    number: 1,
    title: 'Setup React Native project',
    description:
      'Initialize the React Native project with TypeScript and required dependencies.',
    status: 'resolved',
    priority: 'high',
    projectId: '2',
    assignee: users[3] as User,
    reporter: currentUser,
    createdAt: '2025-02-05',
    updatedAt: '2025-02-15',
  },
  {
    id: '7',
    number: 2,
    title: 'Implement push notifications',
    description: 'Add support for push notifications on both iOS and Android.',
    status: 'in-progress',
    priority: 'high',
    projectId: '2',
    assignee: users[1] as User,
    reporter: users[3] as User,
    dueDate: '2025-04-10',
    createdAt: '2025-03-15',
    updatedAt: '2025-03-30',
  },
];

export const comments: Comment[] = [
  {
    id: '1',
    issueId: '1',
    author: users[1] as User,
    content:
      'I have started working on the OAuth integration. The Google authentication is almost complete.',
    createdAt: '2025-03-25T10:30:00',
    replies: [
      {
        id: '2',
        issueId: '1',
        author: currentUser,
        content:
          'Great progress! Let me know if you need any help with the GitHub integration.',
        createdAt: '2025-03-25T11:15:00',
        parentId: '1',
      },
    ],
  },
  {
    id: '3',
    issueId: '1',
    author: users[2] as User,
    content: 'Should we also consider adding Microsoft authentication?',
    createdAt: '2025-03-26T09:00:00',
  },
];

export const members: Member[] = [
  {
    id: '1',
    user: currentUser,
    projectId: '1',
    role: 'admin',
    joinedAt: '2025-01-15',
  },
  {
    id: '2',
    user: users[1] as User,
    projectId: '1',
    role: 'member',
    joinedAt: '2025-01-16',
  },
  {
    id: '3',
    user: users[2] as User,
    projectId: '1',
    role: 'member',
    joinedAt: '2025-01-20',
  },
  {
    id: '4',
    user: users[3] as User,
    projectId: '1',
    role: 'member',
    joinedAt: '2025-02-01',
  },
  {
    id: '5',
    user: users[4] as User,
    projectId: '1',
    role: 'member',
    joinedAt: '2025-02-15',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getIssuesByProjectId(projectId: string): Issue[] {
  return issues.filter(i => i.projectId === projectId);
}

export function getIssueById(id: string): Issue | undefined {
  return issues.find(i => i.id === id);
}

export function getCommentsByIssueId(issueId: string): Comment[] {
  return comments.filter(c => c.issueId === issueId && !c.parentId);
}

export function getMembersByProjectId(projectId: string): Member[] {
  return members.filter(m => m.projectId === projectId);
}
