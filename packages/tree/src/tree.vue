<template>
  <div class="dm-tree">
    <!-- 传入的child已经是经过处理过的 -->
    <dm-tree-node
      v-for="(child, index) in root.childNodes"
      :key="index"
      :node="child"
    >
    </dm-tree-node>
  </div>
</template>

<script>
import DmTreeNode from './tree-node.vue';
import TreeStore from './model/tree-store';

export default {
  name: 'DmTree',

  components: { DmTreeNode },

  props: {
    data: {
      type: Array,
    },
    emptyText: {
      type: String,
      default() {
        return '数据为空';
      },
    },
    // 缩进
    indent: {
      type: Number,
      default: 18,
    },
    // 默认是否展开全部节点
    defaultExpandAll: Boolean,
  },
  data() {
    return {
      root: null,
    };
  },
  created() {
    this.isTree = true; // 区分嵌套情况

    this.store = new TreeStore({
      data: this.data,
      defaultExpandAll: this.defaultExpandAll,
    });

    this.root = this.store.root;
    console.log(111, 'store', this.store);
  },
};
</script>

<style lang="scss"></style>
