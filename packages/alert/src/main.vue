<template>
  <transition name="el-alert-fade">
    <div
      v-show="visible"
      class="dm-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
    >
      <i
        v-if="showIcon"
        class="dm-alert__icon"
        :class="[iconClass, isBigIcon]"
      ></i>
      <div class="dm-alert__content">
        <span
          v-if="title || $slots.title"
          class="dm-alert__title"
          :class="[isBoldTitle]"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="$slots.default && !description" class="dm-alert__description">
          <slot></slot>
        </p>
        <p v-if="description && !$slots.default" class="dm-alert__description">
          {{ description }}
        </p>
        <i
          v-show="closable"
          class="dm-alert__closebtn"
          :class="{
            'is-customed': closeText !== '',
            'dm-icon-close': closeText === '',
          }"
          @click="close()"
          >{{ closeText }}</i
        >
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
const TYPE_CLASSES_MAP = {
  success: 'dm-icon-success',
  warning: 'dm-icon-warning',
  error: 'dm-icon-error',
};
export default {
  name: 'DmAlert',

  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    closeText: {
      type: String,
      default: '',
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator(value) {
        return ['light', 'dark'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {
    typeClass() {
      return `dm-alert--${this.type}`;
    },
    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || 'dm-icon-info';
    },
    isBigIcon() {
      return this.description || this.$slots.default ? 'is-big' : '';
    },
    isBoldTitle() {
      return this.description || this.$slots.default ? 'is-bold' : '';
    },
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped></style>
