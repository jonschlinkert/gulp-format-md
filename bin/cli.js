#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var ok = require('log-ok');
var File = require('vinyl');
var writeFile = require('write');
var minimist = require('minimist');
var tokenize = require('tokenize-comment');
var format = require('../lib/format');
var pkg = require('../package');

var opts = {
  alias: {
    overwrite: 'o',
    help: 'h',
    version: 'V'
  }
};

function help() {
  console.error('Usage: $ format [options] <file> <dest>');
  console.error();
  console.error('  file:  The markdown file to format');
  console.error('  dest:  Required if -o is not used');
  console.error();
  console.error('Options:');
  console.error();
  console.error('-o, --overwrite', 'Overwrite the source file');
  console.error();
}

var argv = minimist(process.argv.slice(2), opts);
if (argv.version) {
  console.log('format', pkg.version);
  process.exit();
}

if (argv.help) {
  help();
  process.exit();
}

var filepath, destpath;
if (argv._[0]) {
  filepath = argv._[0];
  destpath = argv._[1];
} else {
  filepath = argv.file;
  destpath = argv.dest;
}

if (!filepath || (!destpath && !argv.overwrite)) {
  help();
  process.exit(1);
}

var file = new File({path: path.resolve(filepath)});

fs.readFile(file.path, function(err, buf) {
  handleError(err);

  if (destpath) {
    file.path = path.resolve(destpath);
  }

  var idx = 0;
  var str = buf.toString();
  var tok = tokenize(str);
  for (var i = 0; i < tok.examples.length; i++) {
    var example = tok.examples[i];
    if (example.type === 'indented') {
      str = str.split(example.raw).join('\n```bash\n' + example.val + '```\n');
    }
  }

  file.contents = new Buffer(str);
  format(file, argv);

  writeFile(file.path, file.contents, function(err) {
    handleError(err);
    ok('Success:', file.path);
  });
});

function handleError(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}

function replaceExt(fp) {
  var name = path.basename(fp, path.extname(fp));
  var dir = path.dirname(fp);
  return path.resolve(dir, name + '.md');
}
