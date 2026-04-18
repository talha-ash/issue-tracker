/// <reference types="vitest/config" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { nodeExternals } from 'rollup-plugin-node-externals';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
    }),
    nodeExternals(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        backend: resolve(__dirname, 'src/backend.ts'),
        client: resolve(__dirname, 'src/client.ts'),
        'shared/index': resolve(__dirname, 'src/shared/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
  },
});
