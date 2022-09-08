<template>
  <form class="dm-form" :class="[]"></form>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  name: 'dForm',

  provide() {
    return {
      dForm: this,
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
      this.fields.push(field);
    });

    this.$on('dm.form.removeField', (field) => {
      this.fields.splice(this.fields.indexOf(filed), 1);
    });
  },
};
</script>

<style lang="scss"></style>
