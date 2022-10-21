# dream-ui

[![npm version](https://badge.fury.io/js/dream-ui.svg)](https://badge.fury.io/js/dream-ui)

## QuickStart

```bash
npm install dream-ui
```

## usage

```
import dreamUI from 'dream-ui';
import './dream-ui/dist/dream-ui.css;

Vue.use(dreamUI);
```

tips:

- 默认 vue-cli 不会编译第三方依赖，如果想调试这些第三方依赖需要

```js
// vue.config.js
module.exports = {
  transpileDependencies: ['element-ui'],
};
```

- eslint 如何支持 jsx?

> vue-cli 已经默认可以写 jsx

只需要配置

```js
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
```
