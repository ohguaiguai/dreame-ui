<template>
  <transition name="dm-fade-in">
    <div
      class="dm-backtop"
      v-if="visible"
      @click.stop="handleClick"
      :style="{ right: styleRight, bottom: styleBottom }"
    >
      <slot>
        <dm-icon icon="caret-top"></dm-icon>
      </slot>
    </div>
  </transition>
</template>

<script>
import throttle from 'throttle-debounce/throttle';

const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

export default {
  name: 'DmBacktop',

  props: {
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    target: [String],
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      el: null,
      container: null,
      visible: null,
    };
  },
  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    },
  },
  mounted() {
    this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll);
    this.container.addEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;

      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error('target 不存在');
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    },
    handleClick(e) {
      this.scrollToTop();
      this.$emit('click', e);
    },
    scrollToTop() {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;

      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16));

      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    },
    beforeDestroy() {
      this.container.removeEventListener('scroll', this.throttledScrollHandler);
    },
  },
};
</script>
