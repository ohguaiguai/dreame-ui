module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended', // 必须要配的
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'prettier', // 使用 prettier 覆盖 eslint-plugin-vue
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': 1,
    'no-debugger': 1,
    'vue/component-definition-name-casing': 0,
    'vue/require-default-prop': 0,
    'vue/this-in-template': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
  },
};
