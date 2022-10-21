<template>
  <div class="test">
    <Test />
    <el-test />
  </div>
</template>
<script>
// import Test from '@/element-test.vue';
import Test from '@packages/tooltip/test.vue';
import ElTest from './element-test.vue';

export default {
  components: {
    Test,
    ElTest,
  },
};
</script>
<style>
.test {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
</style>
