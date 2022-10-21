export default function (target) {
  // 第一个参数是目标对象，所以从第二个参数开始
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i];

    for (let prop in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(prop)) {
        const value = source[prop];

        if (value) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}
