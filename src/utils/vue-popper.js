import PopperJS from './popper';
import { PopupManager } from 'dream-ui/src/utils/popup';

export default {
  props: {
    placement: {
      type: String,
      default: 'bottom',
    },
    popperOptions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      showPopper: false,
    };
  },
  watch: {
    showPopper(val) {
      val ? this.updatePopper() : this.destroyPopper();
    },
  },
  methods: {
    createPopper() {
      // ref 是在 main 中定义的, 指向的就是鼠标悬浮的那个元素
      const popper = this.$refs.popper;
      const reference = this.referenceElm;

      if (!popper || !reference) return;

      // 动态插入 tooltip, 这个时候还没有对应的位置信息
      // element 是直接把 popper 插在 body 中了，PopperJS 是支持可以不插在 body 中。
      document.body.appendChild(popper);
      const options = this.popperOptions;
      options.placement = this.placement;
      this.popperJS = new PopperJS(reference, popper, options);
      this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
    },
    updatePopper() {
      const popperJS = this.popperJS;
      if (popperJS) {
        popperJS.update();
      } else {
        this.createPopper();
      }
    },
    destroyPopper() {},
  },
};
