'use strict';
var html = require('./html');
var css = require('./css');

class Dumbkit {
  constructor() {
    this.html = new html();
    this.css = new css();
  }

  parseHTML(data) {
    return this.html.parse(data);
  }

  parseCSS(data) {
    return this.css.parse(data);
  }
}

module.exports = Dumbkit;
