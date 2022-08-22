<template>
  <div class="d-row" :style="rowStyl">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'd-row',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      validator(value) {
        if (
          value &&
          !['start', 'end', 'center', 'space-around', 'space-between'].includes(
            value
          )
        ) {
          console.error(
            'justify必须是' +
              ['start', 'end', 'center', 'space-around', 'space-between'].join(
                '、'
              ) +
              '中的某一个'
          );
        }
        return true;
      }
    }
  },
  computed: {
    rowStyl() {
      let style = {};
      if (this.gutter) {
        style = {
          ...style,
          marginLeft: -this.gutter / 2 + 'px', // 通过外层margin来消除内部盒子的padding, 相当于外层row的宽度多了gutter，这种情况会有滚动条,实际用的时候我们可以给row外层再套一个盒子，设置overflow: hidden;
          marginRight: -this.gutter / 2 + 'px'
        };
      }
      if (this.justify) {
        let key = ['start', 'end'].includes(this.justify)
          ? 'flex-' + this.justify
          : this.justify;
        style = {
          ...style,
          justifyContent: key
        };
      }
      return style;
    }
  },
  mounted() {
    this.$children.forEach((child) => {
      // 拿到每一子组件col的实例对象
      child.gutter = this.gutter; // 给组件传递gutter
    });
  }
};
</script>

<style lang="scss">
.d-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
