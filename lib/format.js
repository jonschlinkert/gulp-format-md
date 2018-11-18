/*!
 * gulp-format-md <https://github.com/jonschlinkert/gulp-format-md>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const sections = require('sections');
const Remarkable = require('remarkable');
const prettify = require('pretty-remarkable');
const utils = require('./utils');

const format = (file, options) => {
  let opts = Object.assign({ author: {} }, options, file.options, file.data);
  let str = format.prettify(file.contents.toString(), opts);
  file.contents = Buffer.from(str);
  return file;
};

format.prettify = (str, options = {}) => {
  if (options.stripEmpty !== false && /^\n#/gm.test(str) && /^\n[^#]/gm.test(str)) {
    str = sections.format(str);
  }
  let res = fixParam(prettyRemarkable(str, options));
  let output = utils.escapePipesInTables(res).trim();
  if (options.newline === true) {
    output += '\n';
  }
  return output;
};

/**
 * Fix params bug
 */

function fixParam(str) {
  return str.split('__{_}_*').join('**{any}**');
}

/**
 * Instantiate `Remarkable` and use the `prettify` plugin
 * on the given `str`.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String}
 */

function prettyRemarkable(str, options) {
  return new Remarkable(options).use(prettify).render(str);
}

/**
 * Expose `format`
 */

module.exports = format;
