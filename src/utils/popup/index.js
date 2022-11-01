import Vue from 'vue';
import PopupManager from './popup-manager';
import merge from '@src/utils/merge';
import getScrollBarWidth from '../scrollbar-width';
import { hasClass, addClass, removeClass, getStyle } from '../dom';

let idSeed = 1;
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    openDelay: {},
    closeDeay: {},
    zIndex: {},
    // 是否需要遮罩
    modal: {
      type: Boolean,
      defaut: false,
    },
    modalFade: {
      type: Boolean,
      default: true,
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      opened: false,
      _opening: false,
      _openTimer: null,
      rendered: false, // 结合 nextTick 达到当主体部分渲染完成后再打开 drawer
      _closing: false,
      _closeTimer: null,
      _popupId: '',
      withoutHiddenClass: true,
    };
  },
  beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    PopupManager.register(this._popupId, this);
  },
  watch: {
    visible(val) {
      if (val) {
        // 因为 可能设置了 openDelay, 为了避免多次调用
        if (this._opening) return;

        if (!this.rendered) {
          this.rendered = true;
          Vue.nextTick(() => {
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    },
  },
  methods: {
    open(options) {
      const props = merge({}, this.$props || this, options);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },
    // 真正的打开动作
    doOpen(props) {
      if (this.opened) return;

      this._opening = true;

      const dom = this.$el;

      const modal = props.modal;
      console.log(111, 'modal', modal);

      const zIndex = props.zIndex;
      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (modal) {
        // 中断 close 过程，直接 close
        if (this._closing) {
          console.log(111, '_closing', this._closing);

          PopupManager.closeModal(this._popupId);
          this._closing = false;
        }
        PopupManager.openModal(
          this._popupId,
          PopupManager.nextZIndex(),
          this.modalAppendToBody ? undefined : dom,
          props.modalClass,
          props.modalFade
        );

        // 防止滚动穿透
        if (props.lockScroll) {
          this.withoutHiddenClass = !hasClass(
            document.body,
            'dm-popup-parent--hidden'
          );

          // style 和 getComputedStyle 的区别  https://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
          if (this.withoutHiddenClass) {
            addClass(document.body, 'dm-popup-parent--hidden');
          }
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      // 上面先设置 modal 的 zIndex, 这里设置 wrapper 的 zIndex
      dom.style.zIndex = PopupManager.nextZIndex();
      this.opened = true;

      this.doAfterOPen();
    },
    doAfterOPen() {
      this._opening = false;
    },
    close() {
      if (this._openTimer) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._openTimer);

      const closeDelay = Number(this.closeDelay);
      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },
    doClose() {
      this._closing = true;

      if (this.lockScroll) {
        // modal 消失动画是 200ms
        setTimeout(this.restoreBodyClass, 200);
      }

      this.opened = false;

      this.doAfterClose();
    },
    doAfterClose() {
      this._closing = false;
      PopupManager.closeModal(this._popupId);
    },
    restoreBodyClass() {
      if (this.modal && this.withoutHiddenClass) {
        removeClass(document.body, 'dm-popup-parent--hidden');
      }
      this.withoutHiddenClass = true;
    },
  },
};
export { PopupManager };
