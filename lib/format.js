/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function(file, options) {
  // pass some extra formatting info to `pretty-remarkable`
  var opts = utils.extend({author: {}}, options, file.options);
  file.data = file.data || {};

  var str = file.contents.toString();
  if (opts.stripEmpty !== false) {
    str = utils.sections.format(str);
  }

  var extracted = extractTables(str);
  str = extracted.str;

  // prettify
  str = pretty(str, opts);
  str = str.trim() + (opts.newline ? '\n' : '');
  str = fixParam(str);

  extracted.keys.forEach(function(key) {
    var table = extracted.tables[key].trim();
    str = str.split(key).join(table);
  });

  /**
   * TOC injection is done here since formatting can mess
   * up the toc structure, so we want to do this last
   */

  if (file.data.toc) {
    if (typeof file.insertToc === 'function') {
      var toc = file.data.toc.replace(/\n+/, '\n');
      str = file.insertToc(str, toc);
    }
    if (typeof file.tocUnescape === 'function') {
      str = file.tocUnescape(str);
    }
  }

  file.contents = new Buffer(str);
  return file;
};

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
 * Temporary fix for strange table formatting. Extracts markdown
 * tables before formatting and adds them back afterwards.
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
