# ts 改造

1.

```
npm i @vue/cli-plugin-typescript(~4.5.0) typescript(~4.1.5) --save-dev
```

2. 新建 tsconfig.json
3. 修改 .js -> .ts
4. 新建 shims-vue.d.ts

##### 关于 @vue/cli-plugin-typescript

- 这个插件内部用了 `ts-loader`, babel.config.js 中不需要配置, 原因是在
  `node_modules/@vue/cli-service/lib/Service.js` 中会读取项目中的 `package.json` 中的 `devDependencies` 字段， 然后加载是`插件类型`的 npm 包

```js
resolvePlugins (inlinePlugins, useBuiltIn) {
    const idToPlugin = id => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(id)
    })

    let plugins

    const builtInPlugins = [
      './commands/serve',
      './commands/build',
      './commands/inspect',
      './commands/help',
      // config plugins are order sensitive
      './config/base',
      './config/css',
      './config/prod',
      './config/app'
    ].map(idToPlugin)
    console.log(111, 'inlinePlugins', inlinePlugins);
    if (inlinePlugins) {
      plugins = useBuiltIn !== false
        ? builtInPlugins.concat(inlinePlugins)
        : inlinePlugins
    } else {
      // 这里会读取项目中的 package.json 中的 devDependencies 字段， 然后加载是插件类型的 npm 包
      const projectPlugins = Object.keys(this.pkg.devDependencies || {})
        .concat(Object.keys(this.pkg.dependencies || {}))
        .filter(isPlugin)
        .map(id => {
          console.log(111, 'plugin id', id, this.pkg.optionalDependencies);
          if (
            this.pkg.optionalDependencies &&
            id in this.pkg.optionalDependencies
          ) {
            let apply = () => {}
            try {
              apply = require(id)
            } catch (e) {
              warn(`Optional dependency ${id} is not installed.`)
            }

            return { id, apply }
          } else {
            return idToPlugin(id)
          }
        })
      plugins = builtInPlugins.concat(projectPlugins)
    }

    // Local plugins
    if (this.pkg.vuePlugins && this.pkg.vuePlugins.service) {
      const files = this.pkg.vuePlugins.service
      if (!Array.isArray(files)) {
        throw new Error(`Invalid type for option 'vuePlugins.service', expected 'array' but got ${typeof files}.`)
      }
      plugins = plugins.concat(files.map(file => ({
        id: `local:${file}`,
        apply: loadModule(`./${file}`, this.pkgContext)
      })))
    }

    return plugins
  }
```

- 需要安装 `typescript`

##### 关于 `@babel/preset-typescript` 和 `ts-loader`

vue-cli 默认使用的是 ts-loader 作为处理 ts 和 tsx 的工具，ts-loader 的问题就是在进行生产环境打包，也就是 npm run build 的时候会非常慢，一个解决办法就是用 @babel/preset-typescript 来替换 ts-loader。@babel/preset-typescript 这个预设其实只包含一个插件 @babel/plugin-transform-typescript，它的作用就是把代码中所有的 typescript 语法全部去掉，所以打包非常快。

使用了这个 preset 之后，虽然打包速度变快了，但是我们无法在打包的时候对 ts 进行类型检查，ts-loader 则会在打包的时候进行类型检查，所以使用这个预设我们需要配合 eslint 来进行类型检查，或者依靠 tsc --watch 来进行检测。

使用 @babel/plugin-transform-typescript 我们需要先去掉 vue-cli 中的 Webpack 中的 ts-loader 的配置。方法也很简单，在 vue.config.js 中配置 chainWebpack 即可：

```js
chainWebpack: config => {
        config.module.rule('ts').uses.delete('ts-loader');
        config.module.rule('tsx').uses.delete('ts-loader');
    },
```

然后我们需要安装 @babel/preset-typescript，并在 babel.config.js 中配置即可。

##### 支持可选链式操作符

```js
npm i @babel/plugin-proposal-optional-chaining -D
```

在 babel.config.js 中配置

```js
plugins: ['@babel/plugin-proposal-optional-chaining'];
```

##### 消除 `babel.config.js` `.eslintrc.js` 中的 `'module' is not defined.`

在 .eslintrc.js 中配置

```js
  env: {
    node: true
  },
```

##### pre-commit 和 husky

- 这两个包是单独使用的
- pre-commit 默认会执行 `npm run test`
- husky 可以配合 lint-staged 和 commitlint 使用

##### Vue.extend & Vue.component

Vue.extend 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
Vue.extend 相当于一个扩展实例构造器，用于创建一个具有初始化选项的 Vue 子类，在实例化时可以进行扩展选项，最后使用$mount 方法绑定在元素上。

使用 Vue.extend 可以方便的定义组件的类型, **但是无法全局注册**

##### TODO:

- [x] husky 结合 lint-staged 和 commitlint 配置
  - prettier 格式化
  - eslint 校验
  - commitlint 规范
- [ ] 无限滚动+高性能虚拟列表
- [ ] form 表单
  - 支持异步校验
  - 可配置错误级别
  - 可配置检验方式
    - 失焦校验
    - 边输入边校验并可以配置节流时间
