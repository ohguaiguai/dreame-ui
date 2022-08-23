<template>
  <div>
    <header class="d-header">
      <slot></slot>
    </header>
    <div class="shadow"></div>
  </div>
</template>

<script>
export default {
  name: 'd-header',
};
</script>

<style lang="scss">
.d-header {
  height: 60px;
}
header {
  position: sticky;
  background: #fff;
  top: 0;
  font-size: 20px;
  padding: 10px;
  z-index: 1;
}
.shadow::before {
  content: '';
  box-shadow: 0 0 10px 1px #333;
  position: fixed;
  width: 100%;
}
.shadow::after {
  content: '';
  width: 100%;
  height: 30px;
  background: linear-gradient(to bottom, #fff 50%, transparent);
  position: absolute;
}
</style>
