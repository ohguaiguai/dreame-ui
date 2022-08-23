<template>
  <svg class="d-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
import '../styles/icon';
export default {
  name: 'd-icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.d-icon {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
</style>
