/**
 * ajax 四部曲
 * 1. 创建请求对象 new XMLHttpRequest
 * 2. 建立链接 open
 * 3. 发送请求 send
 * 4. 回调处理
 **/

export default function ajax(options) {
  const xhr = new XMLHttpRequest();
  const action = options.action;

  const fd = new FormData(); // h5用来上传文件的api
  fd.append(options.filename, options.file); // fd就相当于一个空表单，放了一个name:options.filename 和 value:options.file

  xhr.onerror = function (err) {
    options.onError(err);
  };
  xhr.onload = function () {
    let text = xhr.responseText || xhr.response;
    options.onSuccess(JSON.parse(text));
  };
  xhr.upload.onprogress = function (e) {
    if (e.total > 0) {
      e.percent = (e.loaded / e.total) * 100; // 百分比计算, 给事件源添加一个属性percent
    }
    options.onProgress(e);
  };

  xhr.open('post', action, true); // 默认post请求

  xhr.send(fd); //请求

  return xhr;
}
