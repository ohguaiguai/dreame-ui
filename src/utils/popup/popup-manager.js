import { addClass, removeClass } from '../dom';

let zIndex;
let hasInitZIndex;
// 是否已经初始化好 modalDom
let hasModal = false;

const getModal = function () {
  let modalDom = PopupManager.modalDom;

  if (modalDom) {
    hasModal = true;
  } else {
    // 没有就创建
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

// 所有 popup 对应的 vue 实例
const instances = {};
const PopupManager = {
  modalStack: [], // 所有已经打开的 popup 对应的遮罩的属性对象
  modalDom: null, // 所有 popup 公用一个 遮罩元素
  modalFade: true,

  getInstance(id) {
    return instances[id];
  },

  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  nextZIndex() {
    console.log(111, 'zIndex', PopupManager.zIndex);

    return PopupManager.zIndex++;
  },
  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  openModal(id, zIndex, dom, modalClass, modalFade) {
    if (!id || !zIndex === undefined) return;
    this.modalFade = modalFade;
    const modalStack = this.modalStack;

    // 如果已经显示了就不走下面的流程
    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        // 可以中断函数
        return;
      }
    }

    const modalDom = getModal();
    console.log(111, 'open, modalDom', modalDom);
    addClass(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach((item) => addClass(modalDom, item));
    }

    // 为什么是 200ms? 因为 css 中定义的 modalDom 的动画时间是 200ms
    setTimeout(() => {
      removeClass(modalDom, 'v-modal-enter');
    }, 200);

    // 11: DOCUMENT_FRAGMENT_NODE
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = '';

    this.modalStack.push({ id, zIndex, modalClass });
  },
  closeModal(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();
    console.log(111, 'close, modalDom', modalDom);

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      // 如果是最外层的，不能真正的移除 modalDom, 而是只能把自己的东西移除掉
      if (topItem.id === id) {
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach((item) => removeClass(modalDom, item));
        }

        modalStack.pop();

        // 如果还有打开的 popup, 那么 modalDom 还不能移除，只需要更新 modalDom 即可。
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    // 移除 modalDom
    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave');
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        removeClass(modalDom, 'v-modal-leave');
      }, 200);
    }
  },
  doOnModalClick() {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
};
Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      (zIndex = zIndex || 2000), (hasInitZIndex = true);
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  },
});
export default PopupManager;
