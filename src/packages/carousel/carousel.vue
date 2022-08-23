<template>
  <div
    class="d-carousel"
    :style="{ height }"
    @mouseenter="hanleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart($event)"
    @touchend="handleTouchEnd($event)"
  >
    <!-- 多加一层viewport是因为我们会给viewport加一个overflow:hidden属性，这样的话，如果我们想加分页器，切换器就非常局限了 -->
    <div class="viewport">
      <slot></slot>
    </div>

    <div class="dots">
      <span
        v-for="item in len"
        :key="item"
        :class="{ active: item - 1 === currentSelected }"
        @click="select(item - 1)"
        >{{ item - 1 }}</span
      >
    </div>

    <div class="arrow-box">
      <d-button
        icon="icon_paging_left"
        @click="select(currentSelected - 1, true)"
      ></d-button>
      <d-button
        icon="icon_paging_right"
        @click="select(currentSelected + 1, true)"
      ></d-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-carousel',
  props: {
    height: {
      type: String,
      default: '200px',
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 3000,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    // currentSelected
    return {
      currentSelected: this.initialIndex,
      len: 0,
      reverse: false,
    };
  },
  mounted() {
    this.children = this.$children.filter(
      (child) => child.$options.name == 'd-carousel-item'
    );
    this.len = this.children.length;
    this.run();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    handleTouchStart(e) {
      this.hanleMouseEnter();

      this.startTouch = e.touches[0];
    },
    handleTouchEnd(e) {
      let endTouch = e.changedTouches[0];

      let { clientX: x1, clientY: y1 } = this.startTouch;
      let { clientX: x2, clientY: y2 } = endTouch;
      let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // 用户手指滑动的距离
      let disY = Math.abs(y2 - y1);
      let x = (Math.sqrt(2) / 2) * distance; // 默认是45度

      if (disY < x) {
        if (x2 > x1) {
          // 右滑
          this.select(this.currentSelected - 1, true);
        } else {
          this.select(this.currentSelected + 1, true);
        }
      }
      this.run();
    },
    hanleMouseEnter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    handleMouseLeave() {
      this.run();
    },
    select(newIndex, flag) {
      if (newIndex === this.len) newIndex = 0; // 变为第一个
      if (newIndex === -1) newIndex = this.len - 1; // 变为最后一个

      let index = this.currentSelected;

      this.reverse = index > newIndex ? true : false; // 控制正反
      // console.log(index, newIndex);
      // 如果是无缝滚动   0 -> 2, 应该是反的；2 -> 0, 应该是正的

      // 如果是手动点击dots的话，不应该触发无缝滚动, 以为dots和轮播图的个数是一一对应的，点哪个就直接显示哪个就可以。这个时候timer为null，可以根据这个条件来过滤
      // 如果是手动点击分页器的话，应该触发无缝滚动，但此时timer也是null, 也不会走到无缝滚动的逻辑中，需要多传递一个参数来判断。
      if (this.loop && this.timer | flag) {
        if (index === 0 && newIndex === this.len - 1) this.reverse = true;
        if (index === this.len - 1 && newIndex === 0) this.reverse = false;
      }

      this.children.forEach((child) => {
        // 更改子组件移动的方向
        child.reverse = this.reverse;
      });
      this.$nextTick(() => {
        // 子组件的reverse类名加上之后再执行动画
        this.currentSelected = newIndex;
      });
    },
    run() {
      if (this.autoplay) {
        //如果是自动播放就开始运行
        this.timer = setInterval(() => {
          let index = this.currentSelected;
          let newIndex = index + 1; // 默认正向
          this.select(newIndex);
        }, this.delay);
      }
    },
  },
};
</script>

<style lang="scss">
.d-carousel {
  position: relative;
  .viewport {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .dots {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    span {
      display: inline-block;
      width: 20px;
      height: 10px;
      background: black;
      margin: 5px;
      opacity: 0.5;
      text-indent: -999px;
      &.active {
        opacity: 1;
      }
    }
  }
  .arrow-box {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
  }
}
</style>
