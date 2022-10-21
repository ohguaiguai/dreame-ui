<template>
  <section class="dm-container" :class="{ isVertical }">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'DmContainer',
  data() {
    return {
      isVertical: true,
    };
  },
  mounted() {
    this.isVertical = this.$children.some((child) =>
      ['dm-footer', 'dm-header'].includes(child.$options.name)
    ); // 如果内部有d-footer和d-header的话就设置为垂直排列
  },
};
</script>

<style lang="scss">
.dm-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex: 1;
}
.dm-container.isVertical {
  flex-direction: column;
}
</style>
