# TypeScript Configuration — Decision Log

This project uses a multi-tsconfig setup across a pnpm monorepo. Each package/app extends the root `tsconfig.json` and adds its own overrides.

---

## Root `tsconfig.json`

### `exactOptionalPropertyTypes: true`

Forces a strict distinction between a property being absent (`undefined`) and a property explicitly set to `undefined`. Without this, TypeScript treats `{ foo?: string }` as identical to `{ foo?: string | undefined }`, which lets you write `obj.foo = undefined` even when the intent was that the property should simply not exist. Catches a subtle class of bugs especially common when spreading objects or mapping over optional fields.

### `noUncheckedIndexedAccess: true`

Array and object index access returns `T | undefined` instead of `T`. Forces you to handle the case where `arr[0]` might not exist. Without this, TypeScript pretends `arr[0]` is always a valid `T`, which is a lie for any dynamic index.

### `noUnusedLocals: true` / `noUnusedParameters: true`

Flags declared-but-unused variables and function parameters as errors. Keeps code clean and prevents dead code from accumulating. The `_` prefix convention (e.g., `_event`) is used in the few places where an unused parameter is intentional (callbacks with required positional signatures).

### `isolatedModules: true`

Ensures every file can be transpiled independently without type information from other files. Required for Vite, esbuild, and SWC — all of which transpile per-file rather than doing a full type-checked compile. Catches patterns that break per-file transpilation, like re-exporting a type without the `type` keyword.

### `include: ["packages/**/src/**/*", "**/vite.config.ts", ...]`

> **Note**: `**/vite.config.ts` was later **removed** from root include.
>
> **Why it was there**: To give the TS language server coverage over Vite config files, which are not inside any package's `src/` directory.
>
> **Why it was removed**: The root tsconfig has `exactOptionalPropertyTypes: true`. The `rollup-plugin-node-externals` plugin returns a Rollup `Plugin<any>` type. Rollup's plugin type has `filter.id` typed as `StringFilter<RegExp> | undefined`, but Vite's `PluginOption` expects `StringFilter<RegExp>` (no `undefined`). With `exactOptionalPropertyTypes: true`, these two types are incompatible and the language server shows a type error on every `nodeExternals()` call. Since we can't change a third-party plugin's types, we handle this via per-package `tsconfig.node.json` files (see below).

---

## Per-package `tsconfig.json`

Each package (`repo`, `backend`, `client`, `ui`) has its own `tsconfig.json` that extends the root. The common pattern:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
}
```

### `module: "esnext"` + `moduleResolution: "bundler"`

Package source is bundled by Vite, not executed directly by Node. `moduleResolution: "bundler"` matches how Vite/esbuild resolve imports — it allows extensionless imports, `exports` field in package.json, and path aliases. The root uses `NodeNext` (for config files, scripts, and tools run directly by Node).

### `include: ["src"]`

Scopes type-checking to the package's source only. Config files (`vite.config.ts`), test setup, and other root-level files are intentionally excluded from the strict build tsconfig. They are covered by `tsconfig.node.json` (see below).

### `declaration: true` + `declarationMap: true`

Emits `.d.ts` type declaration files and source maps alongside the JS output. Other packages (apps, peer packages) import these types. `declarationMap` enables "Go to Definition" in your editor to jump to the original `.ts` source instead of the emitted `.d.ts` file.

### `ui` package: `exactOptionalPropertyTypes: false`

The `ui` package uses shadcn/ui and Radix UI primitives. These libraries' types were authored without strict optional property checking in mind — many props are typed as `string | undefined` when they should be `string?`. Enabling `exactOptionalPropertyTypes` in `ui` would produce dozens of false-positive errors on third-party component props that we can't change.

---

## Per-package `tsconfig.node.json`

Located at `packages/{repo,backend,client,ui}/tsconfig.node.json`. Each one covers only `vite.config.ts`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "exactOptionalPropertyTypes": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false
  },
  "include": ["vite.config.ts"]
}
```

### Why it exists

Each `vite.config.ts` lives at the package root, outside `src/`. The package `tsconfig.json` only includes `src/`, so `vite.config.ts` is not covered by it. Without a separate tsconfig that claims this file, the TS language server reports:

> `vite.config.ts` was not found by the project service. Consider either including it in the tsconfig.json or including it in allowDefaultProject.

### Why not just add it to the package `tsconfig.json`

Including `vite.config.ts` in the main package tsconfig (with `exactOptionalPropertyTypes: true`) causes a type error on the `nodeExternals()` call. This is a known type incompatibility between rollup's `Plugin` type and Vite's `PluginOption` type — specifically `filter.id` being `StringFilter<RegExp> | undefined` vs `StringFilter<RegExp>`. This is not a bug in our code; it's a mismatch between two third-party type definitions. The only fix without changing third-party types is to use a tsconfig with `exactOptionalPropertyTypes: false` for these files.

### Why `moduleResolution: "bundler"`

Vite config files are bundled by Vite itself when it reads them. The `bundler` resolution mode correctly models how Vite resolves imports inside `vite.config.ts`.

### Why `noUnusedLocals: false` + `noUnusedParameters: false`

Config files sometimes import utilities just for side effects or type inference, and it's common to have plugin options that pass parameters you don't reference. These rules produce noise without value in config files.

### How the TS language server discovers it

The TypeScript language server (v5+ project service mode) automatically discovers all `tsconfig.json` and `tsconfig.*.json` files within a workspace. When it encounters `vite.config.ts`, it finds `tsconfig.node.json` (which includes it) and uses that config for the file — instead of escalating to the root `tsconfig.json`.

### `tsconfig.node.json` vs `allowDefaultProject` — they are not related

A common misconception is that `tsconfig.node.json` is a fallback that ESLint falls back to when it can't find a regular tsconfig. This is wrong. They are two completely separate systems solving the same problem from different sides:

|                            | `tsconfig.node.json`                        | `allowDefaultProject`                                         |
| -------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| **What uses it**           | TypeScript language server (VS Code editor) | ESLint's project service                                      |
| **What it fixes**          | Editor red squiggles / "not found" in TS LS | ESLint "not found by project service" error                   |
| **How it works**           | A real tsconfig that claims the file        | Tells ESLint to use a bare default config for unmatched files |
| **Knows about the other?** | No                                          | No                                                            |

Removing `tsconfig.node.json` breaks the editor. Removing `allowDefaultProject` breaks ESLint. Neither is a fallback for the other.

---

## App `tsconfig.json` files

Both apps (`next-app`, `tanstart-app`) also extend the root tsconfig and follow the same pattern. They may add app-specific settings (e.g., `jsxImportSource`, framework-specific types).

---

## Troubleshooting

| Error                                                       | Cause                                                                                                        | Fix                                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| "was not found by the project service" (TS language server) | File is not in any tsconfig's `include`                                                                      | Add a `tsconfig.node.json` in the same directory that includes the file                        |
| "was not found by the project service" (ESLint)             | ESLint's `projectService` has its own separate tsconfig discovery — `tsconfig.node.json` alone is not enough | Add the glob to `allowDefaultProject` in `parserOptions.projectService` in `eslint.config.mts` |
| `Plugin<any>` not assignable to `PluginOption`              | `exactOptionalPropertyTypes: true` + rollup/vite plugin type mismatch                                        | Use `tsconfig.node.json` with `exactOptionalPropertyTypes: false` for config files             |
| Declaration emit errors                                     | `outDir` not set or `rootDir` mismatch                                                                       | Ensure `outDir: "./dist"` and that all source files are under `src/`                           |
| Path alias `@/*` not resolving                              | `paths` not set in the tsconfig the tool reads                                                               | Add `paths: { "@/*": ["./src/*"] }` to the package tsconfig                                    |
| Editor "Go to Definition" lands in `.d.ts`                  | `declarationMap` not enabled                                                                                 | Add `"declarationMap": true` to the package tsconfig                                           |
