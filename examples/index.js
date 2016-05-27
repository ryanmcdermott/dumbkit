'use strict';
var Parser = require('../src/html');
var fs = require('fs');

fs.readFile('./example.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  let p = new Parser(data);
  let document = p.parse();
  console.log(document);
});
