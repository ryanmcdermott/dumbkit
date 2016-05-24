'use strict';
var fs = require('fs')

const OPEN_TAG = '<';
const CLOSE_SLASH = '/';
const CLOSE_TAG = '>';
const TAG_NAME = /^[a-zA-Z0-9-_]+$/;

class Node {
  constructor(tagName, attributes, children, contents) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
    this.innerText = contents;
  }
}

class Document {
  constructor() {
    this.nodes = [];
  }
}

class Parser {
  constructor(data) {
    this.data = data;
    this.characters = data.split('');
    this.document = new Document();
  }

  consumeCharacter() {
    if (this.characters) {
      return this.characters.shift();
    }
  }

  consumeWhitespace() {
    while (this.nextCharacter() === ' ' ||
          this.nextCharacter() === '\n' ||
          this.nextCharacter() === '\t') {
      this.consumeCharacter();
    }
  }

  nextCharacter() {
    if (this.characters) {
      return this.characters[0];
    }
  }

  lookahead() {
    if (this.characters) {
      return this.characters[1];
    }
  }

  verifyCharacter(character) {
    if (this.consumeCharacter() != character) {
      console.trace(this.characters);
      throw new Error('Bad markup!');
    }
  }

  parseElement() {
    this.verifyCharacter('<');

    let tagName = this.parseTag();
    let attributes = this.parseAttributes();

    this.verifyCharacter('>');
    let children = this.parse();

    this.verifyCharacter('<');
    this.verifyCharacter('/');
    if (tagName != this.parseTag()) {
      console.trace(this.characters);
      throw new Error('Bad markup');
    }

    this.verifyCharacter('>');

    return new Node(tagName, attributes, children);
  }

  parseTag()  {
    let tagName = '';
    while (this.nextCharacter().match(TAG_NAME)) {
      tagName += this.consumeCharacter();
    }

    return tagName;
  }

  parseText() {
    var text = '';
    this.consumeWhitespace();
    while (this.nextCharacter() != '<' && this.characters.length) {
      text += this.consumeCharacter();
    }

    console.log(text);

    if (text) {
      return new Node('Text', null, null, text);
    }
  }

  parseAttr() {
    let attribute = {
      name: null,
      value: null
    };

    attribute.name = this.parseTag();
    this.verifyCharacter('=');
    this.verifyCharacter('"');
    attribute.value = this.parseTag();
    this.verifyCharacter('"');

    return attribute;
  }

  parseAttributes() {
    let attributes = [];

    while (this.nextCharacter() != '>' && this.characters.length) {
      this.consumeWhitespace();
      let attr = this.parseAttr();
      attributes.push(attr);
    }

    return attributes;
  }

  parse() {
    let nodes = [];
    while (this.characters.length) {
      let node;
      let character = this.nextCharacter();
      if (character === '<' && this.lookahead() === '/') {
        break;
      }

      if (character === '<') {
        node = this.parseElement();
      }
      else {
        node = this.parseText();
      }

      if (node) {
        nodes.push(node);
        this.document.nodes.push(node);
      }
    }

    return nodes;
  }
}

fs.readFile('./example.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  let p = new Parser(data);
  p.parse();
  console.log(p.document);
});
