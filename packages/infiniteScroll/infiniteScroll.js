const attributes = {
  delay: {
    default: 200,
  },
  immediate: {
    default: true,
  },
  disabled: {
    default: false,
  },
  distance: {
    default: 10,
  },
};

const scope = 'infinite-scroll';

const getScrollContainer = (el) => {
  // 递归向上查找带有overflow 的元素
  let parent = el;
  while (parent) {
    if (document.documentElement === parent) {
      return window; //表示没有找到
    }
    const overflow = getComputedStyle(parent).overflow; // 计算属性
    if (overflow.match(/scroll|auto/)) {
      return parent;
    }
    parent = parent.parentNode;
  }
};

// Ojbect.entries 把对象变成一个二维数组, [[delay, {default: 200}], []]
const getScrollOptions = (el) => {
  const options = Object.entries(attributes);

  return options.reduce((map, [key, option]) => {
    const defaultValue = option.default;
    let value = el.getAttribute(`${scope}-${key}`) || '';
    // value = vm[value] ? vm[value] : defaultValue;
    value = value || defaultValue;
    map[key] = value;
    return map;
  }, {});
};

const throttle = (fn, interval) => {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
};

const handleScroll = function (cb) {
  // this就是el
  const { container, el, observer } = this[scope];
  const { disabled, distance } = getScrollOptions(el);

  if (disabled) return; // 没有更多数据了

  const scrollBottom = container.scrollTop + container.clientHeight; // 文档底部的高度
  if (container.scrollHeight - scrollBottom <= distance) {
    // 当container.scrollHeight和scrollBottom刚好相等时内容已经把可视区域填满了, 但是用户希望多填充distance的内容
    cb?.();
  } else {
    if (observer) {
      // 当容器填满之后就解除监控
      observer.disconnect();
      this[scope].observer = null;
    }
  }
};

export default {
  name: 'infinite-scroll',
  inserted(el, bindings, vnode) {
    const cb = bindings.value;
    const vm = vnode.context;
    // 1. 先获取滚动的是哪个元素, 注意和绑定指令的el区分开
    const container = getScrollContainer(el);
    if (container !== window) {
      // 2. 获取合并后的options
      const { delay, immediate } = getScrollOptions(el);
      // 3. 绑定滚动事件
      const onScroll = throttle(handleScroll.bind(el, cb), delay);
      el[scope] = {
        // 把所有别的地方可能用到的属性都放在el上
        onScroll,
        container,
        el,
        vm,
      };
      if (immediate) {
        const observer = new MutationObserver(onScroll);
        // el[scope] 推不出来类型, 所以需要用变量来作为过渡
        const obj = el[scope];
        if (obj) {
          obj.observer = observer; // 页面变化看一下是否需要继续加载, 这个observer只是为了刚开始填满页面的
        }
        observer.observe(container, {
          childList: true, // 监听孩子列表的变化
          subtree: true, // 当子dom发生变化也触发
        });
        onScroll(); // 默认先加载一次
      }
      container?.addEventListener('scroll', onScroll);
    }
  },
  unbind(el) {
    const obj = el[scope];
    if (obj) {
      const { onScroll, container } = obj;
      if (container) {
        container.removeEventListener('scroll', onScroll);
        el[scope] = null;
      }
    }
  },
};
