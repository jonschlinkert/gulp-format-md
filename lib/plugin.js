/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var through = require('through2');
var extend = require('extend-shallow');
var format = require('./format');
var utils = require('./utils');

module.exports = function formatMd(options) {
  return through.obj(function(file, enc, next) {
    if (!file.extname || !utils.isMarkdown(file.extname)) {
      next(null, file);
      return;
    }
    var opts = extend({formatMd: options}, options, file.options, file.data);
    next(null, format(file, opts));
  });
};
