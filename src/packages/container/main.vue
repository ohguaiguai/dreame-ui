<template>
  <main class="dm-main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'dm-main',
};
</script>

<style lang="scss">
.dm-main {
  flex: 1;
  padding: 20px;
}
</style>
