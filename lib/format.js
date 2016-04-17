/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function(file, options) {
  var opts = utils.extend({author: {}}, options, file.options);
  file.data = file.data || {};

  var str = file.contents.toString();
  if (opts.stripEmpty !== false) {
    str = utils.sections.format(str);
  }

  // prettify
  str = pretty(str, opts);
  str = str.trim() + (opts.newline ? '\n' : '');
  str = fixParam(str);

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
