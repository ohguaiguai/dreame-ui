<template>
  <div class="container">
    <dm-tooltip
      class="item"
      content="Bottom Right 提示文字"
      placement="bottom-end"
    >
      <el-button>dm 下右</el-button>
    </dm-tooltip>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
body {
  padding-bottom: 1000px;
}
.container {
  display: flex;
  flex-direction: column;
}
</style>
