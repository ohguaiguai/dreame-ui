<template>
  <svg class="dm-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
import './icon';
export default {
  name: 'dm-icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.dm-icon {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
</style>
