# Issue Tracker

A fully responsive issue tracking app inspired by Linear/Plane. Built as a monorepo with two frontend apps sharing a common UI package.

## Purpose 
Learn SSR Frameworks and compare their developer experience and performance. The Next.js app uses the App Router, while the TanStack Start app uses TanStack Router.

## Structure

- `apps/next-app` — Next.js 16 (App Router)
- `apps/tanstart-app` — TanStack Start + TanStack Router
- `packages/ui` — Shared shadcn/ui components

## Setup

```bash
pnpm install
```

## Development

```bash
# Next.js app
pnpm --filter @issue-tracker/next-app dev

# TanStack Start app
pnpm --filter @issue-tracker/tanstart-app dev
```

## Tech Stack

TypeScript, Tailwind CSS v4, shadcn/ui, Radix UI, Vitest
