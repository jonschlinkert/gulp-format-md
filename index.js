/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');
var format = require('./format');

module.exports = function(options) {
  return utils.through.obj(function(file, enc, next) {
    if (!isMarkdown(file.extname)) {
      return next(null, file);
    }
    next(null, format(file, options));
  });
};

function isMarkdown(ext) {
  return /^\.?(md|mdown|mkdown|markdown)$/.test(ext);
}
