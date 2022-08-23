<template>
  <main class="d-main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'd-main',
};
</script>

<style lang="scss">
.d-main {
  flex: 1;
  padding: 20px;
}
</style>
