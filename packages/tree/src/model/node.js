import objectAssign from '@src/utils/merge';

function getPropertyFromData(node, prop) {}

let nodeIdSeed = 0;

export default class Node {
  constructor(options) {
    this.id = nodeIdSeed++;
    this.parent = null;
    this.expanded = false;
    this.level = 0;
    this.childNodes = [];

    // for...in 会把原型链上的属性也遍历
    for (let name in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    // 要写在 for...in之下
    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    this.setData(this.data);

    this.updateLeafState();
  }

  get label() {
    return this.data.label;
  }

  setData(data) {
    // console.log(111, 'setData data', data, data.label);

    this.data = data;

    let children;
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data;
    } else {
      // children = getPropertyFromData(this, 'children') || [];
      children = this.data.children || [];
    }

    for (let i = 0; i < children.length; i++) {
      this.insertChild({ data: children[i] });
    }
  }

  insertChild(child, index, batch) {
    if (!child) throw new Error('child 不存在');

    if (!(child instanceof Node)) {
      // TODO:带有顺序

      objectAssign(child, {
        parent: this,
        store: this.store,
      });
      // new Node 就会走深度遍历了
      child = new Node(child);
    }

    // child.level = this.level + 1; ?

    this.childNodes.push(child);
  }

  expand() {
    console.log(111, 'expanded');

    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }
  updateLeafState() {
    const childNodes = this.childNodes;
    this.isLeaf = !childNodes || childNodes.length === 0;
  }
}
