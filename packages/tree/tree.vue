<template>
  <div>
    <dm-tree-node></dm-tree-node>
  </div>
</template>

<script>
import DmTreeNode from './tree-node.vue';
export default {
  name: 'DmTree',

  components: { DmTreeNode },

  props: {
    data: {
      type: Array,
      default: () => [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
    },
    emptyText: {
      type: String,
      default() {
        return '数据为空';
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
