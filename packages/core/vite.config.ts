import { resolve } from "path"
import { defineConfig } from "vite"
import { nodeExternals } from "rollup-plugin-node-externals"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
    }),
    nodeExternals(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "context/auth/index": resolve(__dirname, "src/context/auth/index.ts"),
        "context/projects/index": resolve(__dirname, "src/context/projects/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
})
