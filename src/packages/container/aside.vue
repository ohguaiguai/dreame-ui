<template>
  <aside class="d-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'd-aside',
  props: {
    width: {
      type: String,
      default: '300px',
    },
  },
};
</script>

<style></style>
