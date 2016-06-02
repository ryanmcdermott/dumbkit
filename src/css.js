'use strict';
var cssParser = require('../lib/parsers/css');

class Parser {
  constructor() {}

  parse(data) {
    return cssParser.parse(data);
  }
}

module.exports = Parser;
