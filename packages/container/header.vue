<template>
  <header class="dm-header">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'DmHeader',
};
</script>

<style lang="scss">
.dm-header {
  height: 60px;
  position: sticky;
  background: #fff;
  top: 0;
  font-size: 20px;
  padding: 10px;
  z-index: 1;
}
</style>
