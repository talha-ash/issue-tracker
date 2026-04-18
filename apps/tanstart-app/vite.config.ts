/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

const monorepoRoot = path.resolve(import.meta.dirname, '../..');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, monorepoRoot, '');
  process.env['SUPABASE_URL'] = env['SUPABASE_URL'];
  process.env['SUPABASE_ANON_KEY'] = env['SUPABASE_ANON_KEY'];

  return {
    plugins: [
      devtools(),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
    ],
    envDir: monorepoRoot,
    test: {
      environment: 'jsdom',
      include: ['**/*.test.{ts,tsx}'],
    },
  };
});
