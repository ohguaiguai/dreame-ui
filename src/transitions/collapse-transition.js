import { addClass, removeClass } from 'dream-ui/src/utils/dom';
const transitionClass = 'collapse-transition';

const transition = {
  beforeEnter(el) {
    addClass(el, transitionClass);
    if (!el.dataset) el.dataset = {};

    // 原始数据保存在 dataset 中，后面要回复原状
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = '0';
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },
  enter(el) {
    el.dataset.oldOverflow = el.style.overflow;

    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '';
    }
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;

    // IMP: 关键， 目的是为了隐藏children部分，不加的话 children 部分会在动画开始时就显示出来
    el.style.overflow = 'hidden';
  },
  afterEnter(el) {
    removeClass(el, transitionClass);

    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  },
  beforeLeave(el) {
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = el.scrollHeight + 'px';

    // IMP: 关键，目的是为了隐藏children部分， 不加的话 children 部分会到动画结束后才隐藏
    el.style.overflow = 'hidden';
  },
  leave(el) {
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      addClass(el, 'collapse-transition');
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },
  afterLeave(el) {
    removeClass(el, 'collapse-transition');
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  },
};
export default {
  name: 'DmCollapseTransition',
  functional: true,
  render(h, { children }) {
    const data = {
      on: { ...transition },
    };
    return h('transition', data, children);
  },
};
