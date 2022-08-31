<template>
  <header class="d-header">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'd-header',
};
</script>

<style lang="scss">
.d-header {
  height: 60px;
  position: sticky;
  background: #fff;
  top: 0;
  font-size: 20px;
  padding: 10px;
  z-index: 1;
}
</style>
