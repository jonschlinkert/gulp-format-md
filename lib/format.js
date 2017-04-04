/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var sections = require('sections');
var Remarkable = require('remarkable');
var prettify = require('pretty-remarkable');
var extend = require('extend-shallow');

function format(file, options) {
  var opts = extend({author: {}}, options, file.options, file.data);
  file.data = file.data || {};

  var str = format.prettify(file.contents.toString(), opts);
  file.contents = new Buffer(str);
  return file;
}

format.prettify = function(str, options) {
  options = options || {};
  if (options.stripEmpty !== false && /^\n#/gm.test(str) && /^\n[^#]/gm.test(str)) {
    str = sections.format(str);
  }
  return fixParam(prettyRemarkable(str, options)).trim();
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

function prettyRemarkable(str, options) {
  return new Remarkable(options)
    .use(prettify)
    .render(str);
}

/**
 * Expose `format`
 */

module.exports = format;
