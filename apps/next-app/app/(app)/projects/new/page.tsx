import { CreateProjectForm } from '@/feature/createProject/components/create-project-form';

export default function NewProjectPage() {
  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">
          Create New Project
        </h1>
        <p className="mt-1 text-muted-foreground">
          Set up your project and start tracking issues
        </p>
      </div>

      <CreateProjectForm className="mt-8" />
    </div>
  );
}
