<template>
  <div class="d-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'd-col',
  props: {
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
  },
  data() {
    return {
      gutter: 0, // 不要放在props
    };
  },
  computed: {
    colClass() {
      let classes = [];
      classes.push(`d-col-${this.span}`);
      if (this.offset) {
        classes.push(`d-col-offset-${this.offset}`);
      }
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach((type) => {
        if (typeof this[type] === 'object') {
          let { span, offset } = this[type];
          span && classes.push(`d-col-${type}-${span}`); // d-col-xs-1
          offset && classes.push(`d-col-${type}-offset-${offset}`); // d-col-xs-offset-1
        } else {
          this[type] && classes.push(`d-col-${type}-${this[type]}`); // d-col-xs-l
        }
      });
      return classes;
    },
    colStyle() {
      let style = {};
      if (this.gutter) {
        style = {
          ...style, // 可以保留原有的属性
          paddingLeft: this.gutter / 2 + 'px',
          paddingRight: this.gutter / 2 + 'px',
        };
      }
      return style;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/_var.scss';
@for $i from 1 through 24 {
  // 从1到24，循环创造出不同的宽度
  .d-col-#{$i} {
    width: $i/24 * 100%;
    text-align: center;
  }
  .d-col-offset-#{$i} {
    margin-left: $i/24 * 100%;
  }
}

@include res(xs) {
  @for $i from 1 through 24 {
    .d-col-xs-#{$i} {
      width: $i/24 * 100%;
    }
    .d-col-xs-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(sm) {
  @for $i from 1 through 24 {
    .d-col-sm-#{$i} {
      width: $i/24 * 100%;
    }
    .d-col-sm-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(md) {
  @for $i from 1 through 24 {
    .d-col-md-#{$i} {
      width: $i/24 * 100%;
    }
    .d-col-md-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(lg) {
  @for $i from 1 through 24 {
    .d-col-lg-#{$i} {
      width: $i/24 * 100%;
    }
    .d-col-lg-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(xl) {
  @for $i from 1 through 24 {
    .d-col-xl-#{$i} {
      width: $i/24 * 100%;
    }
    .d-col-xl-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
</style>
