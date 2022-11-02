<template>
  <div class="test">
    <Test />
    <!-- <el-test /> -->
  </div>
</template>
<script>
// import Test from '@/element-test.vue';
import Test from '@packages/backtop/test.vue';
import ElTest from './element-test.vue';

export default {
  components: {
    Test,
    // ElTest,
  },
};
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
body {
  padding-bottom: 1000px;
  padding-right: 1000px;
  box-sizing: content-box;
}
.test {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    flex: 1;
  }
}
</style>
