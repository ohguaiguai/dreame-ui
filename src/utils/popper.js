const root = window;
const DEFAULTS = {
  placement: 'bottom',
  boundariesElement: 'viewport', // popper 的边界元素, 一般都默认为窗口
  modifiers: ['offset', 'applyStyle'],
};

function setStyle(element, styles) {
  console.log(111, 'setStyle', element, styles);

  function isNumberic(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  Object.keys(styles).forEach((prop) => {
    let unit = '';
    if (
      ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !==
        -1 &&
      isNumberic(styles[prop])
    ) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

function getOffsetParent(element) {
  let offsetParent = element.offsetParent;
  return offsetParent === root.document.body || !offsetParent
    ? root.document.documentElement
    : offsetParent;
}

function getScrollParent(element) {
  const parent = element.parentNode;

  if (!parent) {
    return element;
  }

  if (parent === root.document) {
    // IMP:
    // safari google 把 scrollTop 值放在了 documentElement 上而不是放在 body 上
    if (root.document.body.scrollTop || root.document.body.scrollLeft) {
      return root.document.body;
    } else {
      return root.document.documentElement;
    }
  }

  if (
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) !==
      -1 ||
    ['scroll', 'auto'].indexOf(
      getStyleComputedProperty(parent, 'overflow-x')
    ) !== -1 ||
    ['scroll', 'auto'].indexOf(
      getStyleComputedProperty(parent, 'overflow-y')
    ) !== -1
  ) {
    return parent;
  }

  return getScrollParent(element.parentNode);
}

function getBoundingClientRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top,
  };
}
/**
 * 在这里 element 是鼠标悬浮元素；parent 是 popper 的父元素
 * @param {*} element
 * @param {*} parent
 * @param {*} isFixed
 * @returns
 */
function getOffsetRectRelativeToCustomParent(element, parent, isFixed) {
  let elementRect = getBoundingClientRect(element);
  let parentRect = getBoundingClientRect(parent);
  // console.log(111, 'elementRect: ', elementRect);
  // console.log(111, 'parentRect: ', parent);

  // IMP:
  // 元素为 fixed 的时候，元素的具有滚动属性的上层元素滚动时元素不会跟着滚动，所以需要加上元素的具有滚动属性的上级元素的滚动距离; absolute 元素是可以跟随具有滚动属性的上层元素滚动而滚动
  if (isFixed) {
    const scrollParent = getScrollParent(parent);
    console.log(111, 'scrollParent: ', scrollParent, scrollParent.scrollTop);
    parentRect.top += scrollParent.scrollTop;
  }
  const rect = {
    left: elementRect.left - parentRect.left,
    right: elementRect.left - parentRect.left + elementRect.width,
    top: elementRect.top - parentRect.top,
    bottom: elementRect.top - parentRect.top + elementRect.height,
    width: elementRect.width,
    height: elementRect.height,
  };
  // console.log(111, 'rect: ', rect);
  return rect;
}

function getStyleComputedProperty(element, property) {
  let css = window.getComputedStyle(element, null);
  return css[property];
}

function isFixed(element) {
  if (element === document.body) {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return element.parentNode ? isFixed(element.parentNode) : element;
}

/**
 * 获取元素的大小，包括 宽高和 margin
 * @param {*} element
 */
function getOuterSizes(element) {
  const _display = element.style.display,
    _visibility = element.style.visibility;
  // IMP: 先隐藏再操作
  element.style.display = 'block';
  element.style.visibility = 'hidden';

  const styles = root.getComputedStyle(element);
  const x = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  const y = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

  const result = {
    width: element.offsetWidth + x,
    height: element.offsetHeight + y,
  };

  element.style.display = _display;
  element.style.visibility = _visibility;

  return result;
}

function isFunction(functionToCheck) {
  return {}.toString.call(functionToCheck) === '[object Function]';
}
class Popper {
  modifiers = {
    offset(data) {
      const offset = this._options.offset || 0;
      const popper = data.offsets.popper;
      popper.top += offset;
      return data;
    },
    // arrow() {},
    applyStyle(data) {
      const styles = {
        position: data.offsets.popper.position,
      };

      const left = Math.round(data.offsets.popper.left);
      const top = Math.round(data.offsets.popper.top);

      styles['transform'] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles.top = 0;
      styles.left = 0;

      setStyle(this._popper, styles);
      return data;
    },
  };
  /**
   *
   * @param {鼠标悬浮元素} reference
   * @param {*} popper
   * @param {*} options
   */

  constructor(reference, popper, options) {
    this._reference = reference;
    this._popper = popper;
    this._options = Object.assign({}, DEFAULTS, options);
    this.state = {};

    // 变成函数
    this._options.modifiers = this._options.modifiers.map((modifier) => {
      return this.modifiers[modifier] || modifier;
    });

    // 设置定位
    this.state.position = this._getPosition(this._popper, this._reference);
    setStyle(this._popper, { position: this.state.position, top: 0 });

    // 更新位置信息
    this.update();

    this._setupEventListeners();
  }
  /**
   * 监听滚动和 resize 事件，以调整 popper 位置
   */
  _setupEventListeners() {
    this.state.updateBount = this.update.bind(this);
    root.addEventListener('resize', this.state.updateBount);

    // IMP: 源码这里把 boundariesElement 为 window 的情况过滤了。这里为什么不考虑 window ? 不考虑 window 的话就没有监听 scroll 事件，popper为fixed的情况下就不能跟随滚动
    // if (this._options.boundariesElement !== 'window') {
    // 滚动要看目标元素的上层元素
    let target = getScrollParent(this._reference);
    if (
      target === root.document.body ||
      target === root.document.documentElement
    ) {
      target = root;
    }
    target.addEventListener('scroll', this.state.updateBount);
    this.state.scrollTarget = target;
    // }
  }
  runModifiers(data, modifiers, ends) {
    const modifiersToRun = modifiers.slice();
    modifiersToRun.forEach((modifier) => {
      if (isFunction(modifier)) {
        data = modifier.call(this, data);
      }
    });
    return data;
  }
  _getPosition(popper, reference) {
    let container = getOffsetParent(reference);
    let isParentFixed = isFixed(reference, container);
    // return 'fixed';
    return isParentFixed ? 'fixed' : 'absolute';
  }
  _getOffsets(popper, reference, placement) {
    placement = placement.split('-')[0];
    let popperOffsets = {};
    popperOffsets.position = this.state.position;

    const isFixed = popperOffsets.position === 'fixed';

    const popperRect = getOuterSizes(popper);

    let referenceOffsets = getOffsetRectRelativeToCustomParent(
      reference,
      getOffsetParent(popper),
      isFixed
    );

    if (['right', 'left'].indexOf(placement) !== -1) {
      console.log(111, '');
    } else {
      // 默认二者上下居中对齐
      popperOffsets.left =
        referenceOffsets.left +
        referenceOffsets.width / 2 -
        popperRect.width / 2;
      if (placement === 'top') {
        popperOffsets.top = referenceOffsets.top - popperRect.height;
      } else {
        popperOffsets.top = referenceOffsets.bottom;
      }
    }
    console.log(111, 'popperOffsets: ', popperOffsets);

    return {
      popper: popperOffsets,
    };
  }
  update() {
    let data = { instance: this, styles: {} };
    // 保存现在的位置和以前的位置，因为 tooltip 的位置可能会根据窗口的位置、大小自动发生变化
    data.placement = this._options.placement;
    data._originalPlacement = this._options.placement;

    data.offsets = this._getOffsets(
      this._popper,
      this._reference,
      data.placement
    );

    data = this.runModifiers(data, this._options.modifiers);
  }
}

export default Popper;
