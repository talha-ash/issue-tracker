import { Api } from '@/apiClient';
import { AnalyticsBadge } from './analytics-badge';

export default async function Home() {
  const result = await Api().getProjects();

  const projects = result.isOk() ? result.value : [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <AnalyticsBadge />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Projects</h1>
      <div className="grid gap-4">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h2>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700">
                {project.key}
              </span>
            </div>
            {project.description ? (
              <p className="text-sm text-gray-500">{project.description}</p>
            ) : null}
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
              <span>{project.visibility}</span>
              <span>
                Created {new Date(project.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
