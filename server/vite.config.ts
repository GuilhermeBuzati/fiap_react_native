import { defineConfig } from "vite";
import { resolve } from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodeExternals } from "rollup-plugin-node-externals";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    minify: "esbuild",
    target: "ESNext",
    lib: {
      entry: resolve("src", "main.ts"),
      formats: ["es"],
      fileName: "main",
    },
    rollupOptions: {
      plugins: [nodeExternals()],
    },
  },
});
