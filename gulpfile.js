'use strict';

const gulp        = require('gulp');
const util        = require('gulp-util');


gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});





// const sass        = require('gulp-sass');
// const babel       = require('gulp-babel');
// const concat      = require('gulp-concat');
// const uglify      = require('gulp-uglify');
// const sourcemaps  = require('gulp-sourcemaps');
// const plumber     = require('plumber');
//
//
// let styles = {
//   input   : './src/scss/',
//   output  : '.dis/css/styles.css'
// }
// let scripts = {
//   input   : './src/js/',
//   output  : '.dis/js/app/js'
// }
//
//
// gulp.task('scripts', () => {
//   return gulp.src(scripts.input)
//     .pipe(plumber())
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(uglify())
//     .pipe(sourcemaps.init())
//     .pipe(concat('app.js'))
//     .pipe(sourcemap.write('.'))
//     .pipe(gulp.dest(scripts.output));
// });
//
// gulp.task('styles', () => {
//   return gulp src(styles.output)
//     .pipe(plumber())
//     .pipe(uglify())
//     .pipe(sourcemaps.init())
//     .pipe(gulp.dest(styles.output));
// });
