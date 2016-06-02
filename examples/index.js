'use strict';
var Dumbkit = require('../src/');
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
  let d = new Dumbkit();
  let document = d.parseHTML(html);
  let styles = d.parseCSS(css);
}).catch(function (err) {
  console.log(err);
});
