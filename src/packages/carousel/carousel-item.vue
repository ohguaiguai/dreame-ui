<template>
  <transition>
    <div v-show="isShow" class="d-carousel-item" :class="{ reverse }">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'd-carousel-item',
  data() {
    let children = this.$parent.$children.filter(
      (child) => child.$options.name === 'd-carousel-item'
    );
    return {
      index: children.length - 1, //子组件是一个一个渲染的
      reverse: false
    };
  },
  computed: {
    isShow() {
      return this.$parent.currentSelected == this.index; // 取父组件的currentSelected
    }
  }
};
</script>

<style lang="scss">
.d-carousel-item {
  width: 100%;
  height: 100%;
}
.v-enter-active {
  // 同一时间可能存在两个item, 所以就会出现上下布局的情况，所以需要使用absolute把他们定位在同一排
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-leave-to {
  transform: translateX(-100%);
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to.reverse {
  transform: translateX(100%);
}
.v-enter.reverse {
  transform: translateX(-100%);
}
</style>
