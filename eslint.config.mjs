import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Allow syncing state from browser-only values (e.g. reading the URL) in
      // an effect after mount — the recommended pattern to avoid SSR/client
      // hydration mismatches.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;