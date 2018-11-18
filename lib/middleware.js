/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const format = require('./format');
const utils = require('./utils');

module.exports = config => {
  let options = { formatMd: config, ...config };

  return (file, next) => {
    if (file.isNull() || !file.extname || !utils.isMarkdown(file.extname)) {
      next();
      return;
    }

    let opts = { ...options, ...file.options, ...file.data };
    format(file, opts);
    next(null, file);
  };
};
