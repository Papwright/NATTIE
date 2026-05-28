// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Set base path for GitHub Pages (repository deployed at https://<user>.github.io/NATTIE)
  vite: {
    base: "/NATTIE/",
    // Enable source maps in production build so runtime stack traces map to
    // original source — useful for debugging hydration/invariant errors.
    // Remove or disable this after debugging to avoid shipping source maps.
    build: {
      sourcemap: true,
    },
  },
});
