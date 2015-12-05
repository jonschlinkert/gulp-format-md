/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function(file, options) {
  try {
    // pass some extra formatting info to `pretty-remarkable`
    var opts = utils.extend({author: {}}, options, file.options);
    opts.username = opts.author.username;
    opts.name = opts.author.name;

    var str = file.content;
    var res = extractTables(str);
    str = res.str;

    // prettify
    str = pretty(str, opts);
    str = str.trim() + (opts.newline ? '\n' : '');
    str = fixParam(str);
    str = fixList(str);

    res.keys.forEach(function(key) {
      var table = res.tables[key].trim();
      str = str.split(key).join(table);
    });

    if (file.data.toc) {
      str = str.split('<!-- toc -->').join(file.data.toc);
    }

    file.contents = new Buffer(str);
  } catch (err) {
    console.log(err);
  }
  return file;
};

/**
 * Fix list formatting
 */

function fixList(str) {
  return str.replace(/([ ]{1,4}[+-] \[?[^)]+\)?)\n\n\* /gm, '$1\n* ');
}

/**
 * Fix params
 */

function fixParam(str) {
  return str.split('__{_}_*').join('**{any}**');
}

/**
 * Instantiate `Remarkable` and use the `prettify` plugin
 * on the given `str`.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String}
 */

function pretty(str, options) {
  return new utils.Remarkable(options)
    .use(utils.prettify)
    .render(str);
}

/**
 * Extract markdown tables before formatting, then
 * put them back afterwards
 */

function extractTables(str) {
  var re = /^\s*[|](?=.*[|])(.*)$/;
  var lines = str.split(/\r\n|\r|\n/);
  var len = lines.length, i = -1;
  var tables = {};
  var inside = false;
  var prev = false;
  var num = 0;
  var content = '';
  var keys = [], key = '__TABLE_0_';

  while (++i < len) {
    var line = lines[i];

    if (re.test(line)) {
      if (prev) {
        keys.push(key);
        content += key;
        key = '__TABLE_' + (num++) + '_';
      }
      prev = false;
      inside = true;
      tables[key] = tables[key] || '';
      tables[key] += line + '\n';
    } else {
      content += line + '\n';
      inside = false;
      prev = true;
    }
  }

  var res = {};
  res.keys = keys;
  res.str = content;
  res.tables = tables;
  return res;
}
