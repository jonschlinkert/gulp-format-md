/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var format = require('./format');

module.exports = function(options) {
  var opts = {formatmd: options};
  return function(file, next) {
    format(file, opts);
    next();
  };
};
