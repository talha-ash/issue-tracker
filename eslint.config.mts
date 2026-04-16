// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { globalIgnores } from 'eslint/config';
import pluginRouter from '@tanstack/eslint-plugin-router'
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importX from 'eslint-plugin-import-x';
import nodePlugin from 'eslint-plugin-n';
import prettier from 'eslint-config-prettier'; // Must be last — disables formatting rules that conflict with Prettier
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

export default tseslint.config(
    eslint.configs.recommended, // Core JS rules (no-undef, no-dupe-keys, etc.)
    tseslint.configs.strictTypeChecked, // Strict TS rules with type info (no-floating-promises, no-unsafe-assignment, etc.)
    importX.flatConfigs.recommended, // Import validation (no duplicates, no circular deps, named exports must exist)
    importX.flatConfigs.typescript, // TS-aware import resolution (understands path aliases, workspace packages)


    globalIgnores([
        "**/.next/**", "**/out/**", "**/build/**", "**/next-env.d.ts",
        '**/assets/**/*', '**/dist/**/*', 'dist', 'build', 'node_modules', 'coverage', '*.min.js', '.vinxi', '.output', '**/database.types.ts', '**/*.mjs', '**/*.cjs', '**/*.mts',
        'temp-app-ui/**',
    ]),
    // Accessibility — scoped to non-Next apps (Next.js bundles its own jsx-a11y)
    {
        ...jsxA11y.flatConfigs.recommended,
        files: ['apps/tanstart-app/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'],
    },

    // React + TypeScript config for all .ts/.tsx files
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            globals: {
                ...globals.browser, // window, document, fetch, etc.
                ...globals.es2020, // Promise, BigInt, globalThis, etc.
            },
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['vite.config.ts'],  // vite configs live outside src/ so no package tsconfig claims them
                },
                tsconfigRootDir: process.cwd(),
            },
        },
        settings: {
            react: { version: 'detect' },
            "import-x/resolver-next": [
                createTypeScriptImportResolver({ project: ['tsconfig.json', 'apps/*/tsconfig.json', 'packages/*/tsconfig.json'] })
            ],
        },
        plugins: {
            react: pluginReact,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...pluginReact.configs.recommended.rules, // Core React rules (jsx-key, no-direct-mutation, etc.)
            ...pluginReact.configs['jsx-runtime'].rules, // Disables react-in-jsx-scope (not needed with React 17+)
            ...reactHooks.configs.recommended.rules, // rules-of-hooks + exhaustive-deps
            // React
            // Off — Next.js and TanStack Start handle their own HMR internally;
            // shared UI (shadcn) exports variants/constants alongside components by convention,
            // causing false positives. The plugin adds noise without value in this monorepo.
            'react-refresh/only-export-components': 'off',
            'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce', 'ternary'] }], // Prevents {count && <Comp/>} rendering "0"
            'react/no-unstable-nested-components': ['error', { allowAsProps: true }], // Ban components defined inside render (causes remounts); allow when passed as a prop (common pattern in shadcn/Radix slot APIs)
            'react/jsx-handler-names': ['error', { eventHandlerPrefix: 'handle', eventHandlerPropPrefix: 'on' }], // Consistent handler naming
            'react/hook-use-state': 'off', // Allow single-value destructure: const [value] = useState()
            'react/prop-types': 'off', // TypeScript handles prop validation

            // Hooks
            'react-hooks/rules-of-hooks': 'error', // Hooks only at top level
            'react-hooks/exhaustive-deps': 'error', // All deps in dependency arrays (upgraded from warn)

            // TypeScript
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off', // TS infers return types
            '@typescript-eslint/explicit-module-boundary-types': 'off', // TS infers exported types
            '@typescript-eslint/no-explicit-any': 'error', // Use unknown instead
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }], // Allow async handlers on HTML attributes (e.g. onSubmit)
        },
    },

    // Next.js — scoped to next-app only (includes jsx-a11y internally)
    {
        files: ['apps/next-app/**/*.{ts,tsx,js,jsx}'],
        extends: [...nextVitals, ...nextTs],
    },
    // TanStack Router — route tree and loader validation
    {
        files: ['apps/tanstart-app/**/*.{ts,tsx,js,jsx}'],
        extends: [...pluginRouter.configs['flat/recommended']],
    },

    // Package-specific: allow numbers/booleans in template literals
    {
        files: ['packages/**/src/**/*.ts', 'packages/**/tests/**/*.ts'],
        rules: {
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowBoolean: true }],
        },
    },

    // Package boundary enforcement
    // backend may only use @issue-tracker/repo/backend — never the client entry point
    {
        files: ['packages/backend/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': ['error', {
                patterns: [{
                    group: ['@issue-tracker/repo/client'],
                    message: 'Backend package must not import from the client repo entry point. Use @issue-tracker/repo/backend instead.',
                }],
            }],
        },
    },
    // client may only use @issue-tracker/repo/client — never the backend entry point
    {
        files: ['packages/client/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': ['error', {
                patterns: [{
                    group: ['@issue-tracker/repo/backend'],
                    message: 'Client package must not import from the backend repo entry point. Use @issue-tracker/repo/client instead.',
                }],
            }],
        },
    },

    prettier, // Must be last — disables all formatting rules
)
