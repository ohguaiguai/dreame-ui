export function on(element, event, handler) {
  if (document.addEventListener) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false);
    }
  } else {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler);
    }
  }
}

export function off(element, event, handler) {
  if (document.addEventListener) {
    if (element && event) {
      element.removeEventListener(event, handler, false);
    }
  } else {
    if (element && event && handler) {
      element.detachEvent('on' + event, handler);
    }
  }
}

export function addClass(el, cls) {
  if (!el) return;

  let curClass = el.className;
  let classes = (cls || '').split(' ');

  for (let i = 0, len = classes.length; i < len; i++) {
    let clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.push(clsName);
    } else if (!hasClass(clsName)) {
      curClass += ' ' + clsName;
    }
  }

  if (!el.classList) {
    el.setAttribute('class', curClass);
  }
}

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw '类名不能包含空格';

  if (el.classList) {
    return el.classList.contain(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}
