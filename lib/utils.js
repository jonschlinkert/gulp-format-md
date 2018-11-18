'use strict';

exports.isMarkdown = extname => {
  return /^\.(md|mdown|mkdown|markdown)$/.test(extname);
};

/**
 * Escape pipes in <code> inside tables
 */

exports.escapePipesInTables = str => {
  let lines = str.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (/^\s*\|.*?\|\s*$/.test(line)) {
      lines[i] = line.replace(/(?<!`)`((?:\\`|[^`])+)`(?!`)/g, m => {
        return m.replace(/\s*\|\s*/g, '\\|');
      });
    }
  }
  return lines.join('\n');
};
