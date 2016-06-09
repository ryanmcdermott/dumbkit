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

  buildSelectors(parsedSelector, rule) {
    if (parsedSelector.right) {
      if (parsedSelector.combinator) {
        this.buildSelectors(parsedSelector.right, rule);
      }
      else {
        let selector = new Selector(parsedSelector.right.element, parsedSelector.right.qualifiers[0].id, 
                                    parsedSelector.right.qualifiers[0].class);
        
        rule.selectors.push(selector);
      }
    }

    if (parsedSelector.left) {
      if (parsedSelector.combinator) {
        this.buildSelectors(parsedSelector.left, rule);
      }
      else {
        let selector = new Selector(parsedSelector.left.element, parsedSelector.left.qualifiers[0].id, 
                                    parsedSelector.left.qualifiers[0].class);

        rule.selectors.push(selector);
      }
    }

    this.stylesheet.rules.push(rule);
  }

  buildNode(parsedRules) {
    parsedRules.forEach(parsedRule => {
      let rule = new Rule();
      parsedRule.declarations.forEach(declaration => {
        rule.declarations.push(new Declaration(declaration.name, declaration.value.value, 
                                              declaration.value.unit, declaration.important));
      });

      parsedRule.selectors.forEach(parsedSelector => {
        this.buildSelectors(parsedSelector, rule);
      });
    });
  }

  parse(data) {
    let css = cssParser.parse(data)
    if (css.rules.length) {
      this.buildNode(css.rules);
    }

    console.log(this.stylesheet.rules);
    // return this.stylesheet;
    return css;
  }
}

module.exports = Parser;
