'use strict';
var Parser = require('../html');
var fs = require('fs');

fs.readFile('./example.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  let p = new Parser(data);
  p.parse();
  console.log(p.document);
});
