'use strict';
var Parser = require('../src/html');
var fs = require('fs');

var html;
var css;

var htmlPromise = new Promise(function (resolve, reject) {
  fs.readFile('./example.html', 'utf8', function (err, data) {
    html = data;
    resolve();
  });
});

var cssPromise = new Promise(function (resolve, reject) {
  fs.readFile('./example.css', 'utf8', function (err, data) {
    css = data;
    resolve();
  });
});

Promise.all([htmlPromise, cssPromise]).then(function () {
  let p = new Parser();
  let document = p.parseHTML(html);
  let styles = p.parseCSS(css);
}).catch(function (err) {
  console.log(err);
});
