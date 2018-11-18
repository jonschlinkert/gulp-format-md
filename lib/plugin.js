/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
'use strict';

const through = require('through2');
const middleware = require('./middleware');

module.exports = config => {
  let fn = middleware(config);
  return through.obj((file, enc, next) => fn(file, next));
};
