<template>
  <transition
    name="dm-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <!-- wrapper 为 fixed -->
    <div v-show="visible" class="dm-drawer__wrapper">
      <div
        class="dm-drawer__container"
        :class="visible && 'dm-drawer__open'"
        @click.self="handleWrapperClick"
      >
        <!-- 主体部分 -->
        <div
          ref="drawer"
          class="dm-drawer"
          :class="[direction, customClass]"
          :style="
            isHorizontal ? `width: ${drawerSize}` : `height: ${drawerSize}`
          "
        >
          <header v-if="withHeader" class="dm-drawer__header">
            <slot name="title">{{ title }}</slot>
            <button
              v-if="showClose"
              class="dm-drawer__close-btn"
              @click="closeDrawer"
            >
              <i class="dm-dialog__close dm-icon dm-icon-close"></i>
            </button>
          </header>
          <section v-if="rendered" class="dm-drawer__body">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from '@src/utils/popup';
import emitter from '@src/mixins/emitter';

export default {
  name: 'DmDrawer',

  mixins: [Popup, emitter],
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    beforeClose: {
      type: Function,
    },
    customClass: {
      type: String,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: 'rtl',
      validator(val) {
        return ['rtl', 'ltr', 'ttb', 'btt'].indexOf(val) !== -1;
      },
    },
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    size: {
      type: [Number, String],
      default: '30%',
    },
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
    },
    withHeader: {
      type: Boolean,
      default: true,
    },
    // 是否支持点击 wrapper 关闭弹层
    wrapperClosable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      prevActiveElement: null, // 打开 drawer 之前的活动元素
    };
  },
  computed: {
    isHorizontal() {
      return this.direction === 'rtl' || this.direction === 'ltr';
    },
    drawerSize() {
      return typeof this.size === 'number' ? `${this.size}px` : this.size;
    },
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.prevActiveElement = document.activeElement;
      } else {
        this.$nextTick(() => {
          if (this.prevActiveElement) {
            this.prevActiveElement.focus();
          }
        });
      }
    },
  },
  methods: {
    afterEnter() {},
    afterLeave() {},
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer();
      }
    },
    hide() {
      this.$emit('update:visible', false);
      if (this.destroyOnClose) {
        this.rendered = false;
      }
      this.closed = true;
    },
    closeDrawer() {
      if (typeof this.beforeClose === 'function') {
        // 把回调传回去
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
