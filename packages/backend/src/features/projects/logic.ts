import type { Project } from "../../shared/types.js"

export function filterActiveProjects(projects: Project[]) {
    return projects.filter(p => p.visibility === "public")
}
