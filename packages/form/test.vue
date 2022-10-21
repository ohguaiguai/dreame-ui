<template>
  <dm-form
    ref="form"
    :model="sizeForm"
    :rules="rules"
    label-width="auto"
    size="mini"
  >
    <dm-form-item label="活动名称" prop="name">
      <dm-input v-model="sizeForm.name"></dm-input>
    </dm-form-item>
    <dm-form-item label="年龄" prop="age">
      <dm-input v-model.number="sizeForm.age"></dm-input>
    </dm-form-item>
    <dm-button @click="onSubmit">提交</dm-button>
  </dm-form>
</template>
<script>
export default {
  data() {
    return {
      sizeForm: {
        name: '',
        age: 0,
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'change',
          },
        ],
        age: [
          {
            validator: () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject(false);
                }, 2000);
              });
            },
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');

      this.$refs.form.validate((errors, invalidFields) => {
        console.log(111, '验证结果', errors);
        console.log(111, '验证结果', invalidFields);
      });
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../theme-chalk/src/form';
</style>
