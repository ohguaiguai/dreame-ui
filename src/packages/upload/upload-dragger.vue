<template>
  <div
    class="dm-upload-dragger"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <dm-icon icon="UploadtoCloud" class="icon"></dm-icon>
    <span>将文件拖拽到此区域即可</span>
  </div>
</template>

<script>
export default {
  props: {
    accept: String,
  },
  methods: {
    onDrop(e) {
      console.log(e);
      if (!this.accept) {
        this.$emit('file', e.dataTransfer.files);
      } else {
        // 用户过滤
        // ...
        this.$emit('file', e.dataTransfer.files);
      }
    },
  },
};
</script>

<style lang="scss">
.dm-upload-dragger {
  background: #eee;
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 360px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 65px;
  height: 65px;
}
</style>
