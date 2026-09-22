// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "import/no-named-as-default-member": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["app.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
      },
    },
  },
  {
    files: ["src/**/*.styles.ts"],
    rules: {
      "object-curly-newline": ["error", { ObjectExpression: "always" }],
      "object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],
    },
  },
  {
    ignores: ["dist/*", ".expo/*", "node_modules/*", "expo-env.d.ts"],
  },
]);
