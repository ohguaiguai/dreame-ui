import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import dreameUI from './packages';
Vue.use(dreameUI);

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

console.log(111, 'dreamUI', dreameUI);

const vm = new Vue({
  render: (h) => h(App),
}).$mount('#app');

console.log(111, 'Vue', vm.$options.components);
