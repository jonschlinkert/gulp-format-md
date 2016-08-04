'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('extend-shallow', 'extend');
require('pretty-remarkable', 'prettify');
require('remarkable', 'Remarkable');
require('sections');
require('through2', 'through');
require = fn;

utils.isMarkdown = function(ext) {
  return /^\.(md|mdown|mkdown|markdown)$/.test(ext);
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
