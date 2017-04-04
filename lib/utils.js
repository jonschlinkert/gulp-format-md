'use strict';

exports.isMarkdown = function(ext) {
  return /^\.(md|mdown|mkdown|markdown)$/.test(ext);
};
