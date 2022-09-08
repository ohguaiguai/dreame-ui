<template>
  <div class="dm-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'dm-button-group',
  // 按钮组只能放按钮,这个需要校验
  mounted() {
    let children = this.$el.children;
    for (let i = 0; i < children.length; i++) {
      console.assert(children[i].tagName === 'BUTTON', '子元素必须为button');
    }
  },
};
</script>

<style lang="scss">
@import '../../styles/_var.scss';
.dm-button-group {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  button {
    border-radius: 0;
    &:not(first-child) {
      margin-left: -1px;
    }
    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
    &:hover {
      // 后面的按钮左侧border会把前面的按钮的右侧border遮盖，加层级的目的就是为了解决这一问题
      z-index: 1;
    }
    &:focus {
      z-index: 1;
    }
  }
}
</style>
