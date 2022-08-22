module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['no-loops'],
  extends: ['plugin:vue/recommended', 'prettier'],
  rules: {
    'no-console': 0,
    'no-loops/no-loops': 0,
    'vue/component-definition-name-casing': 0,
    'vue/require-default-prop': 0,
    'vue/this-in-template': 0
  }
};
