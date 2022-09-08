<template>
  <aside class="dm-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'dm-aside',
  props: {
    width: {
      type: String,
      default: '300px',
    },
  },
};
</script>

<style></style>
