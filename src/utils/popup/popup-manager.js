let zIndex;
let hasInitZIndex;
const PopupManager = {
  nextZIndex: function () {
    console.log(111, 'zIndex', PopupManager.zIndex);

    return PopupManager.zIndex++;
  },
};
Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    // 防止同一个弹层 zIndex 一直改变
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
