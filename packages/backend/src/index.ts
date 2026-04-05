import { projectHandler } from "./features/projects/index.js"
import { createDbClient } from "./shared/db.js"

export * from "./features/projects/type.js"

export function createApiClient(url: string, anonKey: string) {
    const client = createDbClient(url, anonKey)

    return {
        ...projectHandler(client)
    }
}
