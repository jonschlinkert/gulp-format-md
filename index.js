/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var format = require('./lib/format');
module.exports = require('./lib/plugin');
module.exports.middleware = require('./lib/middleware');
module.exports.prettify = format.prettify;
module.exports.format = format;
