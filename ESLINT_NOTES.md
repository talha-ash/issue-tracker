# ESLint Configuration — Line-by-Line Documentation

This project uses ESLint 9 **flat config** format (`eslint.config.mts`).

---

## Imports (Lines 2–17)

### Line 3: `import eslint from '@eslint/js'`
**Package: `@eslint/js`** — The official ESLint core rules package. Provides `eslint.configs.recommended` which includes ~50 battle-tested JS rules like `no-undef`, `no-dupe-keys`, `no-unreachable`, `no-unused-vars` (JS version). This is the baseline every JS project should have.

### Line 4: `import tseslint from 'typescript-eslint'`
**Package: `typescript-eslint`** — The unified package for TypeScript ESLint support. Replaces the older separate `@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin` imports. Provides the parser (so ESLint understands TS syntax), type-aware rule configs (`strictTypeChecked`), and the `tseslint.config()` helper for type-safe flat config authoring.

### Line 5: `import pluginReact from 'eslint-plugin-react'`
**Package: `eslint-plugin-react`** — React-specific linting rules. Catches issues like missing `key` props in lists, direct state mutation, usage of deprecated APIs, and unsafe patterns in JSX. The `recommended` preset enables ~25 rules. The `jsx-runtime` preset disables `react-in-jsx-scope` (not needed since React 17's automatic JSX transform).

### Line 6: `import globals from 'globals'`
**Package: `globals`** — A JSON database of global variables for different environments. We use `globals.browser` (adds `window`, `document`, `fetch`, `localStorage`, etc.) and `globals.es2020` (adds `Promise`, `BigInt`, `globalThis`, etc.) so ESLint doesn't flag these as undefined.

### Line 7: `import jsxA11y from 'eslint-plugin-jsx-a11y'`
**Package: `eslint-plugin-jsx-a11y`** — Accessibility rules for JSX. Checks things like: images must have `alt` text, clickable elements must be keyboard-accessible, `<label>` must be associated with a form control, no `autoFocus`, no redundant roles. Helps meet WCAG guidelines.

### Line 8: `import nextVitals from "eslint-config-next/core-web-vitals"`
**Package: `eslint-config-next`** (sub-export `core-web-vitals`) — Next.js official ESLint config focused on Core Web Vitals. Includes rules for proper `<Image>` usage, no `<a>` tags (use `<Link>`), font optimization, and other Next.js-specific performance patterns. Stricter than the base `eslint-config-next`.

### Line 9: `import nextTs from "eslint-config-next/typescript"`
**Package: `eslint-config-next`** (sub-export `typescript`) — Next.js TypeScript-specific rules. Catches type issues specific to Next.js APIs like `getServerSideProps`, page components, and API routes.

### Line 10: `import { globalIgnores } from 'eslint/config'`
**Package: `eslint`** (built-in) — Helper to create a global ignore config object. In flat config, ignores must be a standalone object (no `files` or `rules` alongside) to apply globally. This helper ensures the correct shape.

### Line 11: `import pluginRouter from '@tanstack/eslint-plugin-router'`
**Package: `@tanstack/eslint-plugin-router`** — TanStack Router ESLint plugin. Validates route definitions, ensures loaders return correct types, and catches common routing mistakes specific to TanStack Router/Start.

### Line 12: `import reactHooks from 'eslint-plugin-react-hooks'`
**Package: `eslint-plugin-react-hooks`** — Official React team plugin. Two critical rules: `rules-of-hooks` (hooks only at top level, not inside conditions/loops) and `exhaustive-deps` (dependency arrays must include all referenced values). These prevent some of the most common and hard-to-debug React bugs.

### Line 13: `import reactRefresh from 'eslint-plugin-react-refresh'`
**Package: `eslint-plugin-react-refresh`** — Ensures files only export React components so that Fast Refresh (HMR) works correctly during development. If a file exports both a component and a constant, HMR can't safely hot-reload it and falls back to a full reload.

### Line 14: `import importX from 'eslint-plugin-import-x'`
**Package: `eslint-plugin-import-x`** — A maintained fork of `eslint-plugin-import` with flat config support. Validates imports: no duplicates, no circular dependencies, named exports must exist in the target module, consistent import ordering. The `typescript` sub-config teaches it to resolve `.ts`/`.tsx` files.

### Line 15: `import nodePlugin from 'eslint-plugin-n'`
**Package: `eslint-plugin-n`** — Node.js specific rules. The `flat/recommended-module` config is for ESM projects. Catches: usage of deprecated Node APIs (`fs.exists`), unsupported syntax for your Node version, missing hashbang in CLI scripts, and ensures `engines` field compatibility.

### Line 16: `import prettier from 'eslint-config-prettier'`
**Package: `eslint-config-prettier`** — Not a plugin — it's a config that **disables** all ESLint rules that would conflict with Prettier's formatting (indentation, quotes, semicolons, trailing commas, etc.). **Must always be the last config** in the array so it overrides everything before it.

### Line 17: `import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'`
**Package: `eslint-import-resolver-typescript`** — Teaches `eslint-plugin-import-x` how to resolve TypeScript-specific import patterns: path aliases (`@/*`, `#/*` defined in tsconfig `paths`), `.ts`/`.tsx` extensions, `exports` field in package.json, and workspace packages in a monorepo. Without this, `import-x` would flag aliased imports as unresolved.

---

## Config Array (Lines 19–110)

### Line 19: `export default tseslint.config(...)`
The `tseslint.config()` wrapper is a typed helper — it provides autocomplete and type checking for the config objects inside. Functionally identical to exporting a plain array, but catches config mistakes at authoring time.

---

### Lines 20–24: Shared Presets (applied to ALL files)

```ts
eslint.configs.recommended,              // Line 20
tseslint.configs.strictTypeChecked,      // Line 21
importX.flatConfigs.recommended,         // Line 22
importX.flatConfigs.typescript,          // Line 23
nodePlugin.configs['flat/recommended-module'], // Line 24
```

These apply globally to every file ESLint processes. Order matters — later configs override earlier ones for the same rules.

- **Line 20** — ~50 core JS rules. The non-negotiable baseline.
- **Line 21** — `strictTypeChecked` is the strictest TypeScript preset. It includes everything from `recommended` plus type-aware rules that actually read your TypeScript types (e.g., `no-floating-promises` catches unhandled async calls, `no-unsafe-assignment` catches `any` leaking into typed code). Requires `parserOptions.projectService` to work.
- **Line 22** — Import validation rules: no duplicate imports, no self-imports, named imports must exist.
- **Line 23** — Makes import-x understand TypeScript: `.ts` extensions, `type` imports, declaration files.
- **Line 24** — `flat/recommended-module` specifically for ESM projects (not CommonJS). Catches deprecated Node APIs and unsupported features for your Node version.

---

### Lines 26–28: Global Ignores

```ts
globalIgnores([
    "**/.next/**", "**/out/**", "**/build/**", "**/next-env.d.ts",
    '**/assets/**/*', '**/dist/**/*', 'dist', 'build', 'node_modules', 'coverage',
    '*.min.js', '.vinxi', '.output', '**/database.types.ts',
    '**/*.mjs', '**/*.cjs', '**/*.mts',
]),
```

| Pattern | Why |
|---------|-----|
| `**/.next/**` | Next.js build output. Uses `**/` prefix because it's at `apps/next-app/.next/`, not root |
| `**/out/**` | Next.js static export output |
| `**/build/**`, `**/dist/**` | Compiled/bundled output from any package |
| `**/next-env.d.ts` | Auto-generated Next.js type declarations |
| `**/assets/**/*` | Static assets (images, fonts) |
| `node_modules` | Dependencies — never lint these |
| `coverage` | Test coverage reports |
| `*.min.js` | Minified vendor files |
| `.vinxi`, `.output` | TanStack Start / Vinxi build artifacts |
| `**/database.types.ts` | Auto-generated by Supabase CLI. Contains redundant type unions that trigger false positives. Re-generated on schema changes, so manual fixes would be overwritten |
| `**/*.mjs`, `**/*.cjs`, `**/*.mts` | Config files (postcss.config.mjs, eslint.config.mts). These aren't included in any tsconfig, so type-aware rules from `strictTypeChecked` would crash with "parserOptions not set" |

---

### Lines 30–34: Accessibility (jsx-a11y)

```ts
{
    ...jsxA11y.flatConfigs.recommended,
    files: ['apps/tanstart-app/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'],
},
```

Scoped to TanStack app and packages **only**. Not applied to Next.js app because `eslint-config-next` (line 87) bundles its own jsx-a11y rules internally — applying both would cause duplicate or conflicting rule definitions.

---

### Lines 36–81: Main TypeScript + React Config

#### Line 38: `files: ['**/*.{ts,tsx,js,jsx}']`
Applies this config block to all TS/JS files. This is the primary config where most rules live.

#### Lines 39–47: Language Options

```ts
languageOptions: {
    globals: {
        ...globals.browser,    // Line 41 — window, document, fetch, localStorage, etc.
        ...globals.es2020,     // Line 42 — Promise, BigInt, globalThis, Map, Set, etc.
    },
    parserOptions: {
        projectService: true,  // Line 45
        tsconfigRootDir: process.cwd(), // Line 46
    },
},
```

- **Line 45: `projectService: true`** — The modern way to connect ESLint to TypeScript's type system. It uses the same TypeScript language service your IDE uses. This is what enables rules like `no-floating-promises`, `no-unsafe-assignment`, `await-thenable` — they need to actually know the types of your variables. Replaced the older `project: ['./tsconfig.json']` approach which was slower and less reliable.
- **Line 46: `tsconfigRootDir`** — Tells the project service where to find tsconfig files. `process.cwd()` = the repo root.

#### Lines 48–53: Settings

```ts
settings: {
    react: { version: 'detect' },
    "import-x/resolver-next": [
        createTypeScriptImportResolver({
            project: ['tsconfig.json', 'apps/*/tsconfig.json', 'packages/*/tsconfig.json']
        })
    ]
},
```

- **Line 50: `react: { version: 'detect' }`** — Auto-detects React version from the nearest package.json. Without this, eslint-plugin-react warns "React version not specified" and some version-dependent rules may behave incorrectly.
- **Lines 51–53: `import-x/resolver-next`** — Tells `eslint-plugin-import-x` how to resolve imports. The `project` array lists all tsconfig files in the monorepo. This is how `import-x` understands:
  - Path aliases: `@/*` in next-app, `#/*` in tanstart-app
  - Workspace packages: `@issue-tracker/ui`, `@issue-tracker/backend`
  - TypeScript file extensions without explicit `.ts` suffixes

#### Lines 54–58: Plugin Registration

```ts
plugins: {
    react: pluginReact,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
},
```

Registers plugins so their rules can be used in the `rules` section below. In flat config, plugins must be registered as key-value pairs (key = prefix used in rule names).

Note: `typescript-eslint`, `import-x`, `n`, and `jsx-a11y` are already registered by their preset configs above (lines 20–24, 32). Only plugins not included in a preset need explicit registration here.

#### Lines 60–63: React Rule Presets

```ts
...pluginReact.configs.recommended.rules,  // Line 61
...pluginReact.configs['jsx-runtime'].rules, // Line 62
...reactHooks.configs.recommended.rules,   // Line 63
```

- **Line 61** — Spreads ~25 recommended React rules (jsx-key, no-direct-mutation, no-string-refs, etc.)
- **Line 62** — Disables `react/react-in-jsx-scope`. Since React 17, the JSX transform is automatic — you don't need `import React from 'react'` at the top of every file.
- **Line 63** — Enables `rules-of-hooks` (error) and `exhaustive-deps` (warn, upgraded to error on line 74).

#### Lines 65–70: Custom React Rules

| Line | Rule | Setting | What it does |
|------|------|---------|-------------|
| 65 | `react-refresh/only-export-components` | warn | Warns if a file exports non-components alongside components. This breaks Fast Refresh (HMR) — the bundler can't safely hot-reload the file and does a full page reload instead. `allowConstantExport: true` permits exporting constants (like `loader`) alongside components. |
| 66 | `react/jsx-no-leaked-render` | error, coerce | Prevents `{count && <Comp/>}`. When `count` is `0`, React renders the string `"0"` instead of nothing. The `coerce` strategy requires `{!!count && <Comp/>}` or `{Boolean(count) && <Comp/>}`. |
| 67 | `react/no-unstable-nested-components` | error | Bans defining components inside other components' render. Each render creates a new component identity, causing React to unmount/remount it — destroying state, losing focus, killing performance. |
| 68 | `react/jsx-handler-names` | error | Enforces naming convention: event handler functions start with `handle` (e.g., `handleClick`), event handler props start with `on` (e.g., `onClick`). Makes it easy to identify what's a handler vs a regular function. |
| 69 | `react/hook-use-state` | error | Enforces `const [value, setValue] = useState()` pattern. Catches `const [setValue, value] = useState()` (swapped) or single-variable destructuring. |
| 70 | `react/prop-types` | off | Disabled because TypeScript interfaces/types handle prop validation at compile time. Runtime PropTypes are redundant in a TS codebase. |

#### Lines 73–74: Hook Rules

| Line | Rule | Setting | What it does |
|------|------|---------|-------------|
| 73 | `react-hooks/rules-of-hooks` | error | Hooks must be called at the top level — not inside conditions, loops, or nested functions. React relies on call order to track hook state. Violating this corrupts state. |
| 74 | `react-hooks/exhaustive-deps` | error | Every variable referenced inside `useEffect`/`useMemo`/`useCallback` must be in the dependency array. Missing deps cause stale closures — your effect reads old values. **Upgraded from default `warn` to `error`** because stale closure bugs are extremely hard to debug. |

#### Lines 77–80: TypeScript Rules

| Line | Rule | Setting | What it does |
|------|------|---------|-------------|
| 77 | `@typescript-eslint/no-unused-vars` | error, ignore `_` prefix | Flags variables/args that are declared but never used. The `argsIgnorePattern: '^_'` and `varsIgnorePattern: '^_'` exceptions allow `_unused` naming for intentionally unused params (common in callbacks: `array.map((_item, index) => ...)`). |
| 78 | `@typescript-eslint/explicit-function-return-type` | off | Doesn't require explicit return types on functions. TypeScript's inference is accurate enough — adding `: string` to every function that clearly returns a string is noise. |
| 79 | `@typescript-eslint/explicit-module-boundary-types` | off | Same philosophy — doesn't require explicit types on exported functions. The inference is sufficient and reducing boilerplate improves readability. |
| 80 | `@typescript-eslint/no-explicit-any` | error | Bans `any` type. Use `unknown` instead — it's type-safe (`unknown` requires narrowing before use, `any` silently disables all type checking). This prevents `any` from spreading through your codebase and silently breaking type safety. |

---

### Lines 84–92: App-Specific Configs

#### Lines 84–88: Next.js

```ts
{
    files: ['apps/next-app/**/*.{ts,tsx,js,jsx}'],
    extends: [...nextVitals, ...nextTs],
},
```

Applies Next.js rules **only** to the Next.js app. `nextVitals` includes Core Web Vitals rules (image optimization, font loading, link usage). `nextTs` adds TypeScript checks for Next.js APIs. These would be irrelevant (and potentially conflicting) if applied to the TanStack app or packages.

#### Lines 89–92: TanStack Router

```ts
{
    files: ['apps/tanstart-app/**/*.{ts,tsx,js,jsx}'],
    extends: [...pluginRouter.configs['flat/recommended']],
},
```

TanStack Router rules only for the TanStack Start app. Validates route tree definitions, loader return types, and routing patterns specific to TanStack Router.

---

### Lines 95–100: Package Overrides

```ts
{
    files: ['packages/**/src/**/*.ts', 'packages/**/tests/**/*.ts'],
    rules: {
        '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowBoolean: true }],
    },
},
```

`restrict-template-expressions` normally errors on `` `id: ${numericId}` `` because it only allows strings in template literals. Backend code frequently interpolates numbers and booleans, so this relaxes the rule for packages only.

---

### Lines 102–107: Node Plugin Overrides

```ts
{
    rules: {
        'n/no-missing-import': 'off',
        'n/no-unpublished-import': 'off',
    },
},
```

- **`n/no-missing-import`: off** — This rule checks if imported modules can be resolved by Node. But in this project, bundlers (Vite, Next.js) handle resolution — they understand path aliases, workspace packages, and framework-specific imports that Node can't resolve on its own.
- **`n/no-unpublished-import`: off** — This rule flags imports from packages not listed in `dependencies` (only in `devDependencies` or not at all). Workspace packages like `@issue-tracker/ui` aren't published to npm, so they'd always be flagged. Also, in a monorepo with bundlers, the published/unpublished distinction doesn't apply.

---

### Line 109: Prettier (MUST be last)

```ts
prettier,
```

Disables every ESLint rule that conflicts with Prettier's formatting. This includes rules about: indentation, quotes, semicolons, trailing commas, bracket spacing, arrow function parens, etc. **If any config comes after this, its formatting rules would be re-enabled and fight with Prettier.** That's why it's always the last entry.

---

## Removed Plugins

### eslint-plugin-neverthrow
**Why removed**: Uses the legacy `parserServices.esTreeNodeToTSNodeMap` API, incompatible with `typescript-eslint` v8 + `projectService`. The plugin hasn't been updated in 3+ years. TypeScript's type system already forces proper `Result` handling — if you ignore a `Result`, the type checker catches it.

---

## Running ESLint

```bash
# Lint everything
pnpm eslint

# Lint specific package
pnpm eslint packages/backend/src/

# Auto-fix
pnpm eslint --fix
```

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| "types not available" / "parserOptions not set" | File not in any tsconfig | Add to tsconfig `include` or add to `globalIgnores` |
| "not found by the project service" | Same — file exists but no tsconfig claims it | Add to relevant tsconfig `include` or `allowDefaultProject` |
| VS Code not showing errors | Extension doesn't use flat config | Add `"eslint.useFlatConfig": true` to `.vscode/settings.json` |
| Import path not resolving (`@/...`) | Resolver doesn't know the alias | Check `import-x/resolver-next` `project` array includes the right tsconfig |
| Rule conflicts with Prettier | Something added after `prettier` in config | Move `prettier` back to last position |
