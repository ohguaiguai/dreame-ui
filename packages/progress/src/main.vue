<template>
  <div class="dm-progress">
    <!-- 线形 -->
    <div class="dm-progress-bar" v-if="type === 'line'">
      <div
        class="dm-progress-bar__outer"
        :style="{ height: strokeWidth + 'px' }"
      >
        <div class="dm-progress-bar__inner" :style="barStyle">
          <div class="dm-progress-bar__innerText">{{ content }}</div>
        </div>
      </div>
    </div>
    <!-- 圆形 -->
  </div>
</template>

<script>
export default {
  name: 'DmProgress',
  props: {
    type: {
      type: String,
      default: 'line',
      validator: (val) => ['line', 'circle', 'dashboard'].indexOf(val) > -1,
    },
    strokeWidth: {
      type: Number,
      default: 6,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: (val) => val >= 0 && val <= 100,
    },
    color: {
      type: [String, Array, Function],
      default: '',
    },
    // 用户可能自己传入了格式化方法
    format: Function,
  },
  computed: {
    barStyle() {
      const style = {};
      style.width = this.percentage + '%';
      style.backgroundColor = this.getCurrentColor(this.percentage);
      return style;
    },
    content() {
      if (typeof this.format === 'function') {
        return this.format(this.percentage) || '';
      } else {
        return `${this.percentage}%`;
      }
    },
  },
  methods: {
    getCurrentColor(percentage) {
      if (typeof this.color === 'function') {
        return this.color(percentage);
      } else if (typeof this.color === 'string') {
        return this.color;
      } else {
        // 数组类型, 进度不同颜色不同
        return this.getLevelColor(percentage);
      }
    },
    getLevelColor(percentage) {
      const colorArray = this.getColorArray().sort(
        (a, b) => a.percentage - b.percentage
      );

      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color;
        }
      }

      return colorArray[colorArray.length - 1].color;
    },
    getColorArray() {
      const color = this.color;
      const span = 100 / color.length;
      return color.map((seriesColor, index) => {
        if (typeof seriesColor === 'string') {
          return {
            color: seriesColor,
            percentage: (index + 1) * span,
          };
        }
        return seriesColor;
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
