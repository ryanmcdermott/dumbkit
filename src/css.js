'use strict';
var cssParser = require('../lib/parsers/css');

// Convert all of these class definitions to TypeScript interfaces
const UNITS = {
  PIXEL: 'px'
};

class Declaration {
  constructor(name, value, unit, important) {
    this.name = name;
    this.value = value;
    this.unit = unit;
    this.important = important;
  }
}

class Stylesheet {
  constructor(rules) {
    this.rules = rules || [];
  }
}

class Selector {
  // `class` is a reserved keyword, so use `cl` instead.
  constructor(element, id, cl) {
    this.element = element;
    this.id = id;
    this.cl = cl || [];
  }
}

class Rule {
  constructor() {
    this.selectors = [];
    this.declarations = [];
  }
}

class Parser {
  constructor() {
    this.stylesheet = new Stylesheet();
  }

  buildNode(parsedRules) {
    parsedRules.forEach(parsedRule => {
      let rule = new Rule();
      parsedRule.declarations.forEach(declaration => {
        rule.declarations.push(new Declaration(declaration.name, declaration.value.value, declaration.value.unit, declaration.important));
      });

      parsedRule.selectors.forEach(parsedSelector => {
        console.log(parsedSelector);  
      });

    });
  }

  parse(data) {
    let css = cssParser.parse(data)
    if (css.rules.length) {
      this.buildNode(css.rules);
    }

    // return this.stylesheet;
    return css;
  }
}

module.exports = Parser;
