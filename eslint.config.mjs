import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,

    // Allow require() only in Tailwind + PostCSS config files
    {
        files: [
            "tailwind.config.cjs",
            "tailwind.config.cjs",
            "postcss.config.js",
            "postcss.config.cjs"
        ],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },

    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;
