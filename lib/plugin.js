/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var format = require('./format');
var utils = require('./utils');

module.exports = function formatMd(options) {
  return utils.through.obj(function(file, enc, next) {
    if (!file.extname || !isMarkdown(file.extname)) {
      return next(null, file);
    }
    var opts = utils.extend({}, options, file.options);
    next(null, format(file, opts));
  });
};

function isMarkdown(ext) {
  return /^\.?(md|mdown|mkdown|markdown)$/.test(ext);
}

module.exports.middleware = require('./middleware');
module.exports.format = format;
module.exports.prettify = format.prettify;
