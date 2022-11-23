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
    // el.dataset.oldOverflow = el.style.overflow;

    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '';
    }
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  },
  afterEnter(el) {
    removeClass(el, transitionClass);

    el.style.height = '';
    // el.style.overflow = el.dataset.oldOverflow;
  },
  beforeLeave() {},
  leave() {},
  afterLeave() {},
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
