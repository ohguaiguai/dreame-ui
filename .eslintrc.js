module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: ['plugin:vue/recommended', 'prettier'],
  plugins: ['no-loops', 'prettier'],
  rules: {
    'no-console': 0,
    'no-loops/no-loops': 0,
    'vue/component-definition-name-casing': 0,
    'vue/require-default-prop': 0,
    'vue/this-in-template': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
  },
};
