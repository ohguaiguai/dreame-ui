<template>
  <div>
    <!-- element-ui 提供了两种进度条 圆环和长条 -->
    <div class="bar">
      <div class="bar-outer" :style="{ height: strokeWidth + 'px' }">
        <div class="bar-inner" :style="barStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DmProgress',
  props: {
    strokeWidth: {
      type: Number,
      default: 6,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
    },
    color: {
      type: String,
      default: 'blue',
    },
  },
  computed: {
    barStyle() {
      let style = {};
      style.width = this.percentage + '%';
      style.background = this.color;
      return style;
    },
  },
};
</script>

<style lang="scss">
.bar-outer {
  width: 500px;
  border-radius: 100px;
  background: #eee;
  position: relative;
  vertical-align: middle;
}
.bar-inner {
  position: absolute;
  transition: width 0.6s ease;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
