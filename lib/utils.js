'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('get-value', 'get');
require('extend-shallow', 'extend');
require('plugin-error', 'PluginError');
require('pretty-remarkable', 'prettify');
require('remarkable', 'Remarkable');
require('sections');
require('through2', 'through');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
