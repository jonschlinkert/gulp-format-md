/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

function format(file, options) {
  var opts = utils.extend({author: {}}, options, file.options, file.data);
  file.data = file.data || {};

  var str = format.prettify(file.contents.toString(), opts);
  file.contents = new Buffer(str);
  return file;
}

format.prettify = function(str, options) {
  options = options || {};
  if (options.stripEmpty !== false && /^\n#/gm.test(str) && /^\n[^#]/gm.test(str)) {
    str = utils.sections.format(str);
  }
  return fixParam(prettyRemarkable(str, options));
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
  return new utils.Remarkable(options)
    .use(utils.prettify)
    .render(str);
}

/**
 * Expose `format`
 */

module.exports = format;
