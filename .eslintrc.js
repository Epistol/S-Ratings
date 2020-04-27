module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "nuxt/no-cjs-in-config": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "curly": "off",
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "no-unused-expressions": "error",
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "ignore"
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
}
