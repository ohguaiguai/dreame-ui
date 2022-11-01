<template>
  <div>
    <el-radio-group v-model="direction">
      <el-radio label="ltr">从左往右开</el-radio>
      <el-radio label="rtl">从右往左开</el-radio>
      <el-radio label="ttb">从上往下开</el-radio>
      <el-radio label="btt">从下往上开</el-radio>
    </el-radio-group>

    <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
      点我打开 dm
    </el-button>

    <dm-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :open-delay="2000"
    >
      <span>我来啦!</span>
      <!-- <dm-button
        @click="drawer = true"
        type="primary"
        style="margin-left: 16px"
      >
        点我打开2
      </dm-button> -->
    </dm-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    };
  },
  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then((_) => {
      //     done();
      //   })
      //   .catch((_) => {});
      // alert('关闭');
      done();
    },
  },
};
</script>
