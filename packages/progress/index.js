import DmProgress from './src/main';

DmProgress.install = function (Vue) {
  Vue.component(DmProgress.name, DmProgress);
};

export default DmProgress;
