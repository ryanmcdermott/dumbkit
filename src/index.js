var Parser = require('./html');

class Dumbkit {
  constructor(html, css) {
    this.html = html;
    this.css = css;
  }

  parse() {
    let p = new Parser(this.html);
    p.parse();
    this.document = p.document;
  }
}

module.exports = Dumbkit;
