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
      @input="$emit('input', $event.target.value)"
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
export default {
  name: 'dm-input',
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
    value: {
      type: String,
      default: '',
    },
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
  methods: {
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

<style lang="scss">
@import '@/styles/_var.scss';
.dm-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    &:focus {
      border: 1px solid $primary;
      outline: none;
      box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
    }
    &[disabled] {
      cursor: not-allowed;
      background: #eee;
    }
  }
}
.dm-input-suffix-icon {
  input {
    padding-right: 25px;
  }
  .dm-icon {
    position: absolute;
    right: 8px;
    top: 13px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}
.dm-input-prefix-icon {
  input {
    padding-left: 25px;
  }
  .dm-icon {
    position: absolute;
    left: 8px;
    top: 13px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}
</style>
