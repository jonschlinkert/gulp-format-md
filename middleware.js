/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) [object Object], Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var format = require('./format');

module.exports = function(options) {
  return function(file, next) {
    format(file, options);
    next();
  };
};
