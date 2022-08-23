<template>
  <div class="d-upload">
    <uploadDragger
      v-if="drag"
      :accept="accept"
      @file="uploadFiles"
    ></uploadDragger>
    <template v-else>
      <div class="d-upload-btn" @click="handleClick">
        <slot></slot>
      </div>
      <input
        ref="input"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :name="name"
        class="input"
        @change="handleChange"
      />
    </template>

    <div>
      <slot name="tip"></slot>
    </div>

    <ul>
      <li v-for="file in files" :key="file.uid">
        <div class="list-item">
          <d-icon icon="content"></d-icon>
          {{ file.name }}
          <d-progress
            v-if="file.status === 'uploading'"
            :percentage="file.percentage"
          ></d-progress>
          {{ file.status }}
          <d-icon
            icon="clear_circle_outlined"
            @click.native="removeFile(file)"
          ></d-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ajax from './ajax';
import uploadDragger from './upload-dragger.vue';

export default {
  name: 'd-upload',
  components: {
    uploadDragger,
  },
  props: {
    name: {
      type: String,
      default: 'file',
    },
    action: {
      type: String,
      require: true,
    },
    fileList: {
      type: Array,
      default() {
        return [];
      },
    },
    accept: String,
    limit: Number,
    multiple: Boolean,
    onExceed: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    beforeUpload: Function,
    beforeRemove: Function,
    httpRequest: {
      // 可以是用户传入的请求方法也可以是默认的原生ajax
      type: Function,
      default: ajax,
    },
    drag: {
      type: Boolean,
      default: false,
    }, // 设计一个组件： 1. 用户要有哪些功能？ 2. 需要暴露给用户什么功能？ 3. 用户的行为是什么？
  },
  data() {
    return {
      reqs: {}, // 请求映射表
      tempIndex: 1,
      files: [], // 存储要展示的列表, 包括用户已经传入的fileList和后续选择的, 可以删除
    };
  },
  watch: {
    fileList: {
      immediate: true, // 立即处理
      handler(fileList) {
        this.files = fileList.map((item) => {
          item.uid = Date.now() + this.tempIndex++;
          item.status = 'success';
          return item;
        });
      },
    },
  },
  methods: {
    abort(file) {
      let uid = file.uid;
      if (this.reqs[uid]) {
        this.reqs[uid].abort();
      }
    },
    removeFile(file) {
      if (!this.beforeRemove) {
        this.abort(file);
        this.remove(file);
      }
      let flag = this.beforeRemove && this.beforeRemove();
      if (flag) {
        this.abort(file);
        this.remove(file);
      }
    },
    remove(file) {
      let i = this.files.findIndex((item) => item === file);
      this.files.splice(i, 1);
    },
    handleClick() {
      // 点击之前要还原输入框
      this.$refs.input.value = '';
      this.$refs.input.click(); // 调用原生的click方法
    },
    handleStart(rawFile) {
      rawFile.uid = Math.random() + this.tempIndex++;
      let file = {
        status: 'ready', // 准备上传
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0, //上传的进度
        uid: rawFile.uid,
        raw: rawFile,
      };
      this.files.push(file);
      this.onChange && this.onChange(file);
    },
    getFile(rawFile) {
      return this.files.find((file) => file.uid == rawFile.uid);
    },
    handleProgress(ev, rawFile) {
      let file = this.getFile(rawFile); // 根据源文件找到格式化之后的文件
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
      this.onProgress(ev, rawFile); // 调用用户的回调
    },
    handleSuccess(res, rawFile) {
      let file = this.getFile(rawFile);
      file.status = 'success';
      this.onSuccess(res, rawFile);
      this.onChange(file);
    },
    handleError(err, rawFile) {
      let file = this.getFile(rawFile);
      file.status = 'fail';
      this.onError(err, rawFile);
      this.onChange(file);
      delete this.reqs[file.uid]; // 已经失败的ajax 不需要后续再中断请求了
    },
    post(rawFile) {
      // 调用httpRequest方法 需要整合参数， 处理上传的整个流程
      const uid = rawFile.uid; //
      const options = {
        file: rawFile, // 源文件
        filename: this.name, // avatar 上传文件类型
        action: this.action,
        onProgress: (ev) => {
          // 进度条
          // console.log('上传进度', ev);
          this.handleProgress(ev, rawFile);
        },
        onSuccess: (res) => {
          // 成功回调
          // console.log('上传成功', res);
          this.handleSuccess(res, rawFile);
        },
        onError: (err) => {
          // 失败回调
          // console.log('上传失败', err);
          this.handleError(err, rawFile);
        },
      };
      let req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        // 如果是axios返回的是promise
        req.then(options.onSuccess, options.onError);
      }
    },
    upload(rawFile) {
      // 先判断是否能够上传 这个判断是由用户来操作的

      // 如果用户没有校验就直接上传
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      // 调用用户的beforeUpload方法, 用户可以自行校验
      let flag = this.beforeUpload && this.beforeUpload(rawFile);
      if (flag) {
        return this.post(rawFile);
      }
    },
    uploadFiles(files) {
      // files是将要上传的文件; fileList是已经上传了的文件
      // 是否达到上传限制
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList);
      }
      [...files].forEach((rawFile) => {
        this.handleStart(rawFile); // 可能用户频繁上传同一个文件, 所以要将文件格式化把数据变成易于我们做处理的格式
        this.upload(rawFile); // 真正的上传
      });
    },
    handleChange(e) {
      const files = e.target.files; // 类数组
      //    console.log(files);
      // 多个文件如何上传， 多创建几个ajax 一起传
      this.uploadFiles(files);
    },
  },
};
</script>

<style lang="scss">
.d-upload {
  .d-upload-btn {
    display: inline-block;
  }
  .input {
    display: none;
  }
}
</style>
