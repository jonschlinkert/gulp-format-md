'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var through = require('through2');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');
var format = require('./plugin');

var lint = ['gulpfile.js', 'index.js', 'lib/*.js', 'test/*.js'];

gulp.task('format', function () {
  return gulp.src('readme.md')
    .pipe(format())
    .pipe(gulp.dest('.'));
});

gulp.task('coverage', function () {
  return gulp.src(lint)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['coverage'], function () {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports());
});

gulp.task('eslint', function () {
  return gulp.src(lint)
    .pipe(eslint())
});

gulp.task('default', ['mocha', 'eslint']);
