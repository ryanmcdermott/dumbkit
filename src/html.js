'use strict';
var htmlParser = require('../lib/parsers/html');

class Node {
  constructor(name, attributes, children, contents) {
    this.name = name;
    this.attributes = attributes || [];
    this.children = children || [];
    this.innerText = contents;
  }
}

class Attribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Document {
  constructor() {
    this.nodes = [];
  }
}

class Parser {
  constructor() {
    this.document = new Document();
  }

  buildNode(content, parent) {
    content.forEach((n) => {
      let textContent = Array.isArray(n.content) ? null : n.content;
      let node = new Node(n.name, [], [], textContent);

      if (n.attributes && n.attributes.length) {
        n.attributes.forEach(a => {
          let attribute = new Attribute(a.name, a.value);
          node.attributes.push(attribute);
        });
      }

      parent.children.push(node);
      this.document.nodes.push(node);

      if (Array.isArray(n.content) && n.content.length) {
        this.buildNode(n.content, node);
      }
    });
  }

  parse(data) {
    var nodes = htmlParser.parse(data);
    if (nodes.length && nodes[0].content) {
      let node = new Node(nodes[0].name, [], [], null);
      this.buildNode(nodes[0].content, node);
    }
    else {
      return [];
    }

    return this.document;
  }
}

module.exports = Parser;
