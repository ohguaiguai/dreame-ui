import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import dreameUI from '../packages/index.js';
import '../packages/theme-chalk/lib/index.css';
Vue.use(dreameUI);

// import ElementUI from 'element-ui';
import 'element-ui/packages/theme-chalk/lib/index.css';
import ElementUI from 'element-ui/src/index.js';

Vue.use(ElementUI);

// console.log(111, 'dreamUI', dreameUI);

const vm = new Vue({
  render: (h) => h(App),
}).$mount('#app');

// console.log(111, 'Vue', vm.$options.components);
