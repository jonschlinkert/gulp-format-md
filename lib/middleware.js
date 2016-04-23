/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var format = require('./format');
var utils = require('./utils');

module.exports = function(options) {
  return function(file, next) {
    format(file, utils.extend({formatMd: options}, options));
    next();
  };
};
