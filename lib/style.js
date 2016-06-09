
var PropertyMap: {};

class StyledNode {
  constructor(node, values, children) {
    this.node = node;
    this.values = values;
    this.children = children;
  }
}

class StyleTree {
  constructor(dom, stylesheet) {
    this.dom = dom;
    this.stylesheet = stylesheet;
  }

  matchesSelector() {

  }
}
