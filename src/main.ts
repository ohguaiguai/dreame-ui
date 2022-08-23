import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import dreamerUI from './packages';
Vue.use(dreamerUI);

new Vue({
  render: (h) => h(App)
}).$mount('#app');

console.log(1);
