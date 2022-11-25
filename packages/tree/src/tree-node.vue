<template>
  <div class="dm-tree-node">
    <div
      class="dm-tree-node__content"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }"
    >
      <!-- 展开/折叠按钮 -->
      <span
        :class="[
          'dm-tree-node__expand-icon dm-icon-caret-right',
          {
            'is-leaf': node.isLeaf,
            expanded: !node.isLeaf && expanded,
          },
        ]"
        @click="handleExpandIconClick"
      >
      </span>

      <!-- node 内容 -->
      <node-content :node="node"></node-content>
    </div>
    <!-- children -->
    <dm-collapse-transition>
      <div
        v-if="childNodeRendered"
        v-show="expanded"
        class="dm-tree-node__children"
      >
        <dm-tree-node
          v-for="child in node.childNodes"
          :key="child.id"
          :node="child"
        >
        </dm-tree-node>
      </div>
    </dm-collapse-transition>
  </div>
</template>

<script>
import DmCollapseTransition from '@src/transitions/collapse-transition';

export default {
  name: 'DmTreeNode',
  components: {
    DmCollapseTransition,
    NodeContent: {
      props: {
        node: {
          required: true,
        },
      },
      render(h) {
        const node = this.node;
        return (
          <span class="el-tree-node__label">
            {node.label + ',' + node.level}
          </span>
        );
      },
    },
  },
  props: {
    node: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      expanded: false,
      tree: null,
      childNodeRendered: false,
    };
  },
  watch: {
    'node.expanded'(val) {
      console.log(111, 'watch', val);
      this.$nextTick(() => (this.expanded = val));

      // 先执行, 所以才能保证 v-show 在 v-if 之后
      if (val) {
        this.childNodeRendered = true;
      }
    },
  },
  created() {
    const parent = this.$parent;

    // 考虑到嵌套的情况
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    if (this.node.expanded) {
      this.expanded = true;
      this.childNodeRendered = true;
    }
  },
  methods: {
    handleExpandIconClick() {
      if (this.expanded) {
        this.node.collapse();
      } else {
        this.node.expand();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
