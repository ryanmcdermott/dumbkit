'use strict';
var htmlParser = require('./html');
var cssParser = require('./css');
var styleParser = require('./style');

class Dumbkit {
  constructor() {
    this.htmlParser = new htmlParser();
    this.cssParser = new cssParser();

    // Placeholder declarations for HTML and CSS parse trees.
    this.html = null;
    this.css = null;
    this.styleTree = null;
  }

  parseHTML(data) {
    this.html = this.htmlParser.parse(data);
    return this.html;
  }

  parseCSS(data) {
    this.css = this.cssParser.parse(data);
    return this.css;
  }

  buildStyleTree() {
    styleParser(this.html, this.css);
  }
}

module.exports = Dumbkit;
