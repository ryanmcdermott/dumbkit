'use strict';
var cssParser = require('../lib/parsers/css');

// Convert all of these class definitions to TypeScript interfaces
const UNITS = {
  PIXEL: 'px'
};

class Declaration {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Stylesheet {
  constructor(rules) {
    this.rules = rules || [];
  }
}

class Selector {
  // `class` is a reserved keyword, so use `cl` instead.
  constructor(tagName, id, cl) {
    this.tagName = tagName;
    this.id = id;
    this.cl = cl;
  }
}

class Rule {
  constructor() {
    this.selectors = [];
    this.declarations = [];
  }
}

class Parser {
  constructor() {}

  buildNode(rules) {
    rules.forEach(rule => {
      console.log(rule);
    });
  }

  parse(data) {
    let css = cssParser.parse(data)
    if (css.rules.length) {
      this.buildNode(css.rules);
    }

    return css;
  }
}

module.exports = Parser;
