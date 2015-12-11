# gulp-format-md [![NPM version](https://img.shields.io/npm/v/gulp-format-md.svg)](https://www.npmjs.com/package/gulp-format-md) [![Build Status](https://img.shields.io/travis/jonschlinkert/gulp-format-md.svg)](https://travis-ci.org/jonschlinkert/gulp-format-md)

> Gulp plugin for beautifying markdown using pretty-remarkable.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i gulp-format-md --save
```

## Usage

```js
var gulp = require('gulp');
var format = require('gulp-format-md');

gulp.task('format', function () {
  return gulp.src('readme.md')
    .pipe(format())
    .pipe(gulp.dest('.'));
});
```

## Related projects

* [gulp](https://www.npmjs.com/package/gulp): The streaming build system | [homepage](http://gulpjs.com)
* [pretty-remarkable](https://www.npmjs.com/package/pretty-remarkable): Plugin for prettifying markdown with Remarkable using custom renderer rules. | [homepage](https://github.com/jonschlinkert/pretty-remarkable)
* [remarkable](https://www.npmjs.com/package/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in… [more](https://www.npmjs.com/package/remarkable) | [homepage](https://github.com/jonschlinkert/remarkable)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/gulp-format-md/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb) on December 09, 2015._