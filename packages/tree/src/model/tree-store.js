import Node from './node';

export default class TreeStore {
  constructor(options) {
    this.nodesMap = {};
    this.data = null;

    for (let name in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    this.root = new Node({
      data: this.data,
      store: this,
    });
  }

  registerNode(node) {}
}
