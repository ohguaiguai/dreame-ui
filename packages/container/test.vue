<template>
  <dm-container>
    <dm-header>header</dm-header>
    <div class="shadow"></div>
    <dm-main>
      ` vue logo Vue.js 学习 生态系统 团队 资源列表 支持 Vue 多语言 参与翻译
      特别赞助商 DCloud 稀土掘金技术社区 教程 2.x 基础 安装 介绍 Vue 实例
      模板语法 计算属性和侦听器 Class 与 Style 绑定 条件渲染 列表渲染 事件处理
      表单输入绑定 组件基础 深入了解组件 组件注册 Prop 自定义事件 插槽 动态组件
      & 异步组件 处理边界情况 过渡 & 动画 进入/离开 & 列表过渡 状态过渡 可复用性
      & 组合 混入 自定义指令 简介 钩子函数 钩子函数参数 动态指令参数 函数简写
      对象字面量 渲染函数 & JSX 插件 过滤器 工具 单文件组件 测试 TypeScript 支持
      生产环境部署 规模化 路由 状态管理 服务端渲染 安全 内在 深入响应式原理 迁移
      从 Vue 1.x 迁移 从 Vue Router 0.7.x 迁移 从 Vuex 0.6.x 迁移到 1.0 更多
      对比其他框架 加入 Vue.js 社区 认识团队 您正在浏览的是 Vue 2.x 的文档。Vue
      3 的文档在这里。 万维广告联盟
      敏捷，低代码，流程，开发平台。专注于解决企业【跨应用】工作流实施难的问题！全开源。
      广告 自定义指令 简介 Watch a free video lesson on Vue School
      除了核心功能默认内置的指令 (v-model 和 v-show)，Vue
      也允许注册自定义指令。注意，在 Vue2.0
      中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM
      元素进行底层操作，这时候就会用到自定义指令。举个聚焦输入框的例子，如下：
      当页面加载时，该元素将获得焦点 (注意：autofocus 在移动版 Safari
      上不工作)。事实上，只要你在打开这个页面后还没点击过任何内容，这个输入框就应当还是处于聚焦状态。现在让我们用指令来实现这个功能：
      // 注册一个全局自定义指令 `v-focus` Vue.directive('focus', { //
      当被绑定的元素插入到 DOM 中时…… inserted: function (el) { // 聚焦元素
      el.focus() } }) 如果想注册局部指令，组件中也接受一个 directives 的选项：
      directives: { focus: { // 指令的定义 inserted: function (el) { el.focus()
      } } } 然后你可以在模板中任何元素上使用新的 v-focus property，如下：

      <input v-focus />
      钩子函数 一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
      bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      inserted：被绑定元素插入父节点时调用
      (仅保证父节点存在，但不一定已被插入文档中)。 update：所在组件的 VNode
      更新时调用，但是可能发生在其子 VNode
      更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
      (详细的钩子函数参数见下)。 我们会在稍后讨论渲染函数时介绍更多 VNodes
      的细节。 componentUpdated：指令所在组件的 VNode 及其子 VNode
      全部更新后调用。 unbind：只调用一次，指令与元素解绑时调用。
      接下来我们来看一下钩子函数的参数 (即 el、binding、vnode 和 oldVnode)。
      钩子函数参数 指令钩子函数会被传入以下参数：
      el：指令所绑定的元素，可以用来直接操作 DOM。 binding：一个对象，包含以下
      property： name：指令名，不包括 v- 前缀。
      value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
      oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated
      钩子中可用。无论值是否改变都可用。
      expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1"
      中，表达式为 "1 + 1"。 arg：传给指令的参数，可选。例如 v-my-directive:foo
      中，参数为 "foo"。
      modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar
      中，修饰符对象为 { foo: true, bar: true }。 vnode：Vue
      编译生成的虚拟节点。移步 VNode API 来了解更多详情。
      oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
      除了 el
      之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的
      dataset 来进行。 这是一个使用了这些 property 的自定义钩子样例：

      <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
      Vue.directive('demo', { bind: function (el, binding, vnode) { var s =
      JSON.stringify el.innerHTML = 'name: ' + s(binding.name) + '<br />' +
      'value: ' + s(binding.value) + '<br />' + 'expression: ' +
      s(binding.expression) + '<br />' + 'argument: ' + s(binding.arg) + '<br />'
      + 'modifiers: ' + s(binding.modifiers) + '<br />' + 'vnode keys: ' +
      Object.keys(vnode).join(', ') } }) new Vue({ el:
      '#hook-arguments-example', data: { message: 'hello!' } }) 动态指令参数
      指令的参数可以是动态的。例如，在 v-mydirective:[argument]="value"
      中，argument
      参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。
      例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。我们可以像这样创建一个通过指令值来更新竖直位置像素值的自定义指令：

      <div id="baseexample">
        <p>Scroll down the page</p>
        <p v-pin="200">Stick me 200px from the top of the page</p>
      </div>
      Vue.directive('pin', { bind: function (el, binding, vnode) {
      el.style.position = 'fixed' el.style.top = binding.value + 'px' } }) new
      Vue({ el: '#baseexample' }) 这会把该元素固定在距离页面顶部 200
      像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新。

      <div id="dynamicexample">
        <h3>Scroll down inside this section ↓</h3>
        <p v-pin:[direction]="200">
          I am pinned onto the page at 200px to the left.
        </p>
      </div>
      Vue.directive('pin', { bind: function (el, binding, vnode) {
      el.style.position = 'fixed' var s = (binding.arg == 'left' ? 'left' :
      'top') el.style[s] = binding.value + 'px' } }) new Vue({ el:
      '#dynamicexample', data: function () { return { direction: 'left' } } })
      结果： 这样这个自定义指令现在的灵活性就足以支持一些不同的用例了。 函数简写
      在很多时候，你可能想在 bind 和 update
      时触发相同行为，而不关心其它的钩子。比如这样写：
      Vue.directive('color-swatch', function (el, binding) {
      el.style.backgroundColor = binding.value }) 对象字面量
      如果指令需要多个值，可以传入一个 JavaScript
      对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

      <div v-demo="{ color: 'white', text: 'hello!' }"></div>
      Vue.directive('demo', function (el, binding) {
      console.log(binding.value.color) // => "white"
      console.log(binding.value.text) // => "hello!" }) ← 混入渲染函数 & JSX →
      发现错误？想参与编辑？ 在 GitHub 上编辑此页！ `
    </dm-main>
    <dm-footer>footer</dm-footer>
  </dm-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scope>
.shadow::before {
  content: '';
  box-shadow: 0 0 10px 1px #333;
  position: fixed;
  width: 100%;
}
.shadow::after {
  content: '';
  width: 100%;
  height: 30px;
  background: linear-gradient(to bottom, #fff 50%, transparent);
  position: absolute;
}
</style>
