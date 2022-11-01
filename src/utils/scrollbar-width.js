import { InputNumber } from 'element-ui';

let scrollBarWidth;

export default function () {
  if (scrollBarWidth) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.className = 'dm-scrollbar__wrap';
  outer.style.visibility = 'visible';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  console.log(111, 'scrollWidth', widthNoScroll, widthWithScroll);
  return scrollBarWidth;
}
