import type { Project } from "./model.js"

export function filterActiveProjects(projects: Project[]) {
    return projects.filter(p => p.visibility === "public")
}
