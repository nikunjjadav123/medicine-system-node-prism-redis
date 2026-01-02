import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        beforeAll: "readonly",
        afterEach: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        __dirname: "readonly",
      }
    },
    rules: {
      "no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_"
      }],
      "no-console": "off"
    }
  }
];
