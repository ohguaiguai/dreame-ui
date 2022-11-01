const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
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
      el.classList.add(clsName);
    } else if (!hasClass(clsName)) {
      curClass += ' ' + clsName;
    }
  }

  if (!el.classList) {
    el.setAttribute('class', curClass);
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return;

  let curClass = ' ' + el.className + ' ';
  let classes = cls.split(' ');

  for (let i = 0, len = classes.length; i < len; i++) {
    let clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.setAttribute('class', trim(curClass));
  }
}

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw '类名不能包含空格';

  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

export function getStyle(element, styleName) {
  if (!element || !styleName) return null;

  if (styleName === 'float') {
    styleName = 'cssFloat';
  }

  try {
    const computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}
