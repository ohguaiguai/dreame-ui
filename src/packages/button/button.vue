<template>
  <button
    class="dm-button"
    :class="btnClass"
    :disabled="loading"
    @click="$emit('click', $event)"
  >
    <dm-icon v-if="icon && !loading" :icon="icon" class="icon"></dm-icon>
    <dm-icon v-if="loading" icon="loading" class="icon"></dm-icon>
    <!--有可能不写文案-->
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'dm-button',
  props: {
    type: {
      type: String,
      default: '',
      validator(type) {
        if (
          type &&
          !['primary', 'success', 'warning', 'info', 'danger'].includes(type)
        ) {
          console.error(
            'type类型必须为' +
              ['primary', 'success', 'warning', 'info', 'danger'].join('、')
          );
        }
        return true; // 最终都通过校验
      },
    },
    icon: {
      type: String,
    },
    iconPosition: {
      type: String,
      default: '',
      validator(position) {
        if (position && !['left', 'right'].includes(position)) {
          console.error('position必须为' + ['left', 'right'].join('、'));
        }
        return true;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClass() {
      let classes = [];
      if (this.type) {
        classes.push(`dm-button-${this.type}`);
      }
      if (this.iconPosition) {
        classes.push(`dm-button-${this.iconPosition}`);
      }
      return classes;
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/_var.scss';
$height: 42px;
$font-size: 16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;

.dm-button {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  color: $color;
  background: #fff;
  height: $height;
  cursor: pointer;
  font-size: $font-size;
  line-height: 1;
  padding: 12px 20px;
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
  &:hover {
    border-color: $border-color;
    background-color: $background;
  }
  &:focus,
  &:active {
    color: $active-color;
    border: 1px solid $active-color;
    outline: none;
    background-color: $background;
  }
  //   &-primary {}
  //   &-success {}
  //    ... 这么一遍一遍写太麻烦
  @each $type,
    $color
      in (
        primary: $primary,
        success: $success,
        info: $info,
        warning: $warning,
        danger: $danger
      )
  {
    &-#{$type} {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
      fill: #fff; // 设置填充内容的颜色
    }
  }
  @each $type,
    $color
      in (
        primary: $primary-hover,
        success: $success-hover,
        info: $info-hover,
        warning: $warning-hover,
        danger: $danger-hover
      )
  {
    &-#{$type}:hover {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  @each $type,
    $color
      in (
        primary: $primary-active,
        success: $success-active,
        info: $info-active,
        warning: $warning-active,
        danger: $danger-active
      )
  {
    &-#{$type}:active,
    &-#{$type}:focus {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  .icon {
    width: 16px;
    height: 16px;
  }

  &-left {
    // 通过order控制顺序
    svg {
      order: 1;
    }
    span {
      order: 2;
      margin-left: 10px;
    }
  }
  &-right {
    svg {
      order: 2;
    }
    span {
      order: 1;
      margin-right: 10px;
    }
  }
  &[disabled] {
    // 属性选择器
    cursor: not-allowed;
  }
}
</style>
