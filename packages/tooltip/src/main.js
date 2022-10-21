import Vue from 'vue';

import { on, off, addClass } from 'dream-ui/src/utils/dom';

import Popper from 'dream-ui/src/utils/vue-popper';

export default {
  name: 'DmTooltip',

  mixins: [Popper],

  props: {
    transition: {
      type: String,
      default: 'dm-fade-in-linear',
    },
    popperClass: String,
    content: String,
    openDelay: {
      type: Number,
      default: 0,
    },
  },
  beforeCreate() {
    // 创建 tooltip 的实例
    this.popperVM = new Vue({
      data: { node: '' },
      render(h) {
        return this.node;
      },
    }).$mount();
  },
  render() {
    if (this.popperVM) {
      // 这个节点怎么控制在鼠标悬浮在目标元素上后动态渲染？上面只是调用 $mount(), 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。这一步在 vue-popper 的 createPopper 中完成
      this.popperVM.node = (
        <transition name={this.transition}>
          <div
            ref="popper"
            v-show={this.showPopper}
            class={['dm-tooltip__popper', this.popperClass]}
          >
            {this.$slots.content || this.content}
          </div>
        </transition>
      );
    }

    const firstElement = this.getFirstElement();
    if (!firstElement) return null;

    return firstElement;
  },
  mounted() {
    this.referenceElm = this.$el;
    if (this.$el.nodeType === 1) {
      on(this.referenceElm, 'mouseenter', this.show);
      on(this.referenceElm, 'mouseleave', this.hide);
    }
  },
  destroyed() {
    if (this.referenceElm.nodeType === 1) {
      off(this.referenceElm, 'mouseenter', this.show);
      off(this.referenceElm, 'mouseleave', this.hide);
    }
  },
  methods: {
    show() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // showPoper 属性在 vue-Popper 中定义
        this.showPopper = true;
      }, this.openDelay);
    },
    hide() {
      clearTimeout(this.timeout);
      this.showPopper = false;
    },
    // 这个元素就是鼠标悬浮的那个元素
    getFirstElement() {
      const slots = this.$slots.default;
      if (!Array.isArray(slots)) return null;

      let element = null;
      for (let i = 0; i < slots.length; i++) {
        if (slots[i] && slots[i].tag) {
          element = slots[i];
          break;
        }
      }
      return element;
    },
  },
};
