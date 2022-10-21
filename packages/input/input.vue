<template>
  <div class="dm-input" :class="inputClass">
    <dm-icon v-if="prefixIcon" :icon="prefixIcon"></dm-icon>
    <input
      ref="input"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
    />
    <!-- 注意click事件是用在组件上，默认是给组件绑定一个click事件，这里需要用原生的click事件 -->
    <!-- @mousedown.native.prevent是为了当点击清除icon后input框不失去焦点 -->
    <dm-icon
      v-if="value && clearable"
      icon="clear_circle_outlined"
      @click.native="$emit('input', '')"
      @mousedown.native.prevent
    ></dm-icon>
    <!-- 这里需要先失去焦点再获取焦点, 如果还使用@mousedown.native.prevent这个方法的话就会出现光标位置不对的情况 -->
    <dm-icon
      v-if="value && showPassword"
      icon="eye"
      @click.native="changeStatus"
    ></dm-icon>
    <dm-icon v-if="suffixIcon" :icon="suffixIcon"></dm-icon>
  </div>
</template>
<script>
import emitter from '@/mixins/emitter';
export default {
  name: 'DmInput',
  mixins: [emitter],
  props: {
    name: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    prefixIcon: String,
    suffixIcon: String,
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      passwordVisible: false,
    };
  },
  computed: {
    inputClass() {
      let classes = [];
      if (this.clearable || this.showPassword || this.suffixIcon) {
        classes.push(`dm-input-suffix-icon`);
      }
      if (this.prefixIcon) {
        classes.push(`dm-input-prefix-icon`);
      }
      return classes;
    },
  },
  watch: {
    value() {
      if (this.validateEvent) {
        this.dispatch('DmFormItem', 'dm.form.change', [this.value]);
      }
    },
  },
  methods: {
    handleFocus() {},
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    // @change 同样是 blur 时触发
    handleChange(e) {
      this.$emit('change', e.target.value);
    },
    handleBlur(e) {
      this.$emit('blur', e);
      if (this.validateEvent) {
        this.dispatch('DmFormItem', 'dm.form.blur', [this.value]);
      }
    },
    changeStatus() {
      this.passwordVisible = !this.passwordVisible;
      // 重新渲染之后再获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>
