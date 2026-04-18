'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export type Language = 'en' | 'es';

type Translations = {
  [key: string]: {
    en: string;
    es: string;
  };
};

export const translations: Translations = {
  // Navigation & General
  'app.name': { en: 'IssueTrack', es: 'IssueTrack' },
  'nav.projects': { en: 'Projects', es: 'Proyectos' },
  'nav.issues': { en: 'Issues', es: 'Incidencias' },
  'nav.dashboard': { en: 'Dashboard', es: 'Panel' },
  'nav.back': { en: 'Back', es: 'Volver' },
  'nav.logout': { en: 'Logout', es: 'Cerrar sesión' },

  // Actions
  'action.new': { en: 'New', es: 'Nuevo' },
  'action.create': { en: 'Create', es: 'Crear' },
  'action.edit': { en: 'Edit', es: 'Editar' },
  'action.delete': { en: 'Delete', es: 'Eliminar' },
  'action.save': { en: 'Save Changes', es: 'Guardar cambios' },
  'action.cancel': { en: 'Cancel', es: 'Cancelar' },
  'action.filter': { en: 'Filter', es: 'Filtrar' },
  'action.sort': { en: 'Sort', es: 'Ordenar' },
  'action.search': { en: 'Search', es: 'Buscar' },
  'action.add': { en: 'Add', es: 'Agregar' },
  'action.remove': { en: 'Remove', es: 'Eliminar' },
  'action.view': { en: 'View', es: 'Ver' },
  'action.reply': { en: 'Reply', es: 'Responder' },
  'action.post': { en: 'Post Comment', es: 'Publicar comentario' },

  // Auth
  'auth.welcome': { en: 'Welcome back', es: 'Bienvenido de nuevo' },
  'auth.signin': { en: 'Sign In', es: 'Iniciar sesión' },
  'auth.signup': { en: 'Sign Up', es: 'Registrarse' },
  'auth.signin.subtitle': {
    en: 'Sign in to continue to your workspace',
    es: 'Inicia sesión para continuar a tu espacio de trabajo',
  },
  'auth.signup.title': { en: 'Create your account', es: 'Crea tu cuenta' },
  'auth.email': { en: 'Email', es: 'Correo electrónico' },
  'auth.password': { en: 'Password', es: 'Contraseña' },
  'auth.confirm.password': {
    en: 'Confirm Password',
    es: 'Confirmar contraseña',
  },
  'auth.fullname': { en: 'Full Name', es: 'Nombre completo' },
  'auth.forgot': { en: 'Forgot password?', es: '¿Olvidaste tu contraseña?' },
  'auth.no.account': { en: "Don't have an account?", es: '¿No tienes cuenta?' },
  'auth.have.account': {
    en: 'Already have an account?',
    es: '¿Ya tienes cuenta?',
  },
  'auth.or': { en: 'or', es: 'o' },
  'auth.google': { en: 'Continue with Google', es: 'Continuar con Google' },
  'auth.github': { en: 'Continue with GitHub', es: 'Continuar con GitHub' },

  // Projects
  'project.new': { en: 'New Project', es: 'Nuevo proyecto' },
  'project.create': { en: 'Create New Project', es: 'Crear nuevo proyecto' },
  'project.update': { en: 'Update Project', es: 'Actualizar proyecto' },
  'project.name': { en: 'Project Name', es: 'Nombre del proyecto' },
  'project.key': { en: 'Project Key', es: 'Clave del proyecto' },
  'project.description': { en: 'Description', es: 'Descripción' },
  'project.visibility': { en: 'Visibility', es: 'Visibilidad' },
  'project.private': { en: 'Private', es: 'Privado' },
  'project.private.desc': {
    en: 'Only invited members can access',
    es: 'Solo miembros invitados pueden acceder',
  },
  'project.public': { en: 'Public', es: 'Público' },
  'project.public.desc': {
    en: 'Anyone in the workspace can view',
    es: 'Cualquiera en el espacio puede ver',
  },
  'project.members': { en: 'Members', es: 'Miembros' },
  'project.add.members': { en: 'Add Members', es: 'Agregar miembros' },
  'project.search.members': {
    en: 'Search by name or email...',
    es: 'Buscar por nombre o correo...',
  },
  'project.details': { en: 'View Details', es: 'Ver detalles' },
  'project.edit': { en: 'Edit Project', es: 'Editar proyecto' },
  'project.delete': { en: 'Delete Project', es: 'Eliminar proyecto' },
  'project.setup': {
    en: 'Set up a new project and invite your team',
    es: 'Configura un nuevo proyecto e invita a tu equipo',
  },

  // Issues
  'issue.new': { en: 'New Issue', es: 'Nueva incidencia' },
  'issue.create': { en: 'Create New Issue', es: 'Crear nueva incidencia' },
  'issue.update': { en: 'Update Issue', es: 'Actualizar incidencia' },
  'issue.title': { en: 'Title', es: 'Título' },
  'issue.description': { en: 'Description', es: 'Descripción' },
  'issue.status': { en: 'Status', es: 'Estado' },
  'issue.priority': { en: 'Priority', es: 'Prioridad' },
  'issue.assignee': { en: 'Assignee', es: 'Asignado a' },
  'issue.reporter': { en: 'Reporter', es: 'Reportado por' },
  'issue.due.date': { en: 'Due Date', es: 'Fecha límite' },
  'issue.created': { en: 'Created', es: 'Creado' },
  'issue.updated': { en: 'Last Updated', es: 'Última actualización' },
  'issue.edit': { en: 'Edit Issue', es: 'Editar incidencia' },
  'issue.delete': { en: 'Delete Issue', es: 'Eliminar incidencia' },
  'issue.comments': { en: 'Comments', es: 'Comentarios' },
  'issue.write.comment': {
    en: 'Write a comment...',
    es: 'Escribe un comentario...',
  },

  // Status
  'status.open': { en: 'Open', es: 'Abierto' },
  'status.in.progress': { en: 'In Progress', es: 'En progreso' },
  'status.resolved': { en: 'Resolved', es: 'Resuelto' },
  'status.closed': { en: 'Closed', es: 'Cerrado' },

  // Priority
  'priority.urgent': { en: 'Urgent', es: 'Urgente' },
  'priority.high': { en: 'High', es: 'Alta' },
  'priority.medium': { en: 'Medium', es: 'Media' },
  'priority.low': { en: 'Low', es: 'Baja' },

  // Empty states
  'empty.issues': { en: 'No issues yet', es: 'Sin incidencias aún' },
  'empty.issues.desc': {
    en: 'This project has no issues. Start by creating one.',
    es: 'Este proyecto no tiene incidencias. Comienza creando una.',
  },
  'empty.projects': { en: 'No projects yet', es: 'Sin proyectos aún' },
  'empty.projects.desc': {
    en: 'Create your first project to get started.',
    es: 'Crea tu primer proyecto para comenzar.',
  },

  // Table headers
  'table.number': { en: '#', es: '#' },
  'table.title': { en: 'Title', es: 'Título' },
  'table.member': { en: 'Member', es: 'Miembro' },
  'table.role': { en: 'Role', es: 'Rol' },
  'table.joined': { en: 'Joined', es: 'Se unió' },
  'table.actions': { en: 'Actions', es: 'Acciones' },

  // Tabs
  'tab.issues': { en: 'Issues', es: 'Incidencias' },
  'tab.members': { en: 'Members', es: 'Miembros' },

  // Theme
  'theme.light': { en: 'Light', es: 'Claro' },
  'theme.dark': { en: 'Dark', es: 'Oscuro' },
  'theme.system': { en: 'System', es: 'Sistema' },

  // Roles
  'role.admin': { en: 'Admin', es: 'Admin' },
  'role.member': { en: 'Member', es: 'Miembro' },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }
      return translation[language];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
