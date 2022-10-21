//  {
//   pass: [
//     { validator: validatePass, trigger: 'blur' }
//   ],
//   checkPass: [
//     { validator: validatePass2, trigger: 'blur' }
//   ],
//   age: [
//     { validator: checkAge, trigger: 'blur' }
//   ]
// }

// {
//   name: '张三'
// }

// path: .a.b.c 或者 a[b][c]
export function getPropByPath(obj, path) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/, '.$1'); // a[b][c] -> [b]->.b [c]->.c
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');

  let i = 0;
  // for (; i < keyArr.length; i++) {
  // 注意是 i < keyArr.length - 1, 否则最后的 i 等于 keyArr.length 大于最大索引值导致 keyArr[i]取值为 undefined
  for (; i < keyArr.length - 1; i++) {
    if (!tempObj) break;

    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      break;
    }
  }

  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
}

export function noop() {}
