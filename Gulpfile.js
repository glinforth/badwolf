/**
 * Created by glinforth on 05/07/14.
 */

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var replace = require('gulp-replace');
var fs = require('fs');
var inline = require('gulp-inline-source');

function inlineFiles() {
    return gulp.src('./tmp/index.html')
        .pipe(inline())
        .pipe(gulp.dest('./dest'));
}

gulp.task('browserify', function() {
    return browserify('./src/index.js', {debug:true})
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./tmp'))
});

gulp.task('css', function() {
    return gulp.src('src/index.css')
        .pipe(gulp.dest('tmp'));
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('tmp'));
});

// define tasks here
gulp.task('default', ['css', 'browserify', 'html'], inlineFiles);
