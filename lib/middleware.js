/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');
var format = require('./format');
var utils = require('./utils');

module.exports = function(options) {
  return function(file, next) {
    if (!file.extname || !utils.isMarkdown(file.extname)) {
      next();
      return;
    }
    var opts = extend({formatMd: options}, options, file.options, file.data);
    format(file, opts);
    next(null, file);
  };
};
