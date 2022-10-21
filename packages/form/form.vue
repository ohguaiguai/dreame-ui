<template>
  <form class="dm-form" :class="[]">
    <slot></slot>
  </form>
</template>

<script>
import objectAssign from '@/utils/merge';

export default {
  name: 'DmForm',

  componentName: 'DmForm',

  provide() {
    return {
      dmForm: this,
    };
  },

  props: {
    model: Object, // 表单数据对象
    rules: Object,
    inline: String,
    labelPosition: String,
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },

    // 传递给 form-item 的属性
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: '',
    },
    inlineMessage: String,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: String,
    disabled: Boolean,
    hideRequiredAsterisk: {
      // 是否隐藏必填字段的标签旁边的红色星号
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      fields: [],
      potentialLabelWidthArr: [],
    };
  },
  created() {
    // 绑定字段增删事件
    this.$on('dm.form.addField', (field) => {
      console.log(111, '333', field);

      if (field) {
        this.fields.push(field);
        console.log(111, '222 ', this.fields);
      }
    });

    this.$on('dm.form.removeField', (field) => {
      if (field) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  methods: {
    validate(callback) {
      let promise;
      console.log(111, 'fields', this.fields);

      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function (valid, invalidFields) {
            valid ? resolve(valid) : reject(invalidFields);
          };
        });
      }

      let valid = true;
      let count = 0;

      let invalidFields = {};
      this.fields.forEach((field) => {
        // trigger 为空就是要验证所有的 rule
        field.validate('', (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = objectAssign({}, invalidFields, field);
          if (
            typeof callback === 'function' &&
            ++count === this.fields.length
          ) {
            callback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
    validateField() {},
    resetFields() {},
    clearValidate() {},
    _getLabelWidthIndex(width) {},
    _registerLabelWidth(val, oldVal) {},
    deregisterLabelWidth(val) {},
  },
};
</script>

<style lang="scss"></style>
