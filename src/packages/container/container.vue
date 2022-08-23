<template>
  <section class="d-container" :class="{ isVertical }">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'd-container',
  data() {
    return {
      isVertical: true,
    };
  },
  mounted() {
    this.isVertical = this.$children.some((child) =>
      ['d-footer', 'd-header'].includes(child.$options.name)
    ); // 如果内部有d-footer和d-header的话就设置为垂直排列
  },
};
</script>

<style lang="scss">
.d-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex: 1;
}
.d-container.isVertical {
  flex-direction: column;
}
</style>
