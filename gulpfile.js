'use strict'

// REQUIRES
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const filenames = require('gulp-filenames');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const glob = require('glob');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();


//SOURCES
let _html = {
    input       : 'src/html/**/*.html',
    includes    : 'src/html/includes/'
};
let _styles = {
    input       : 'src/scss/styles.scss',
    output      : 'public/css'
};
let _images = {
    input       : 'src/img',
    output      : 'public/img'
};
let _fonts = {
    input       : 'src/fonts',
    output      : 'public/fonts'
};
let _scripts = {
    input       : 'src/js/app.js',
    output      : 'public/js'
};

//TASKS

/* TESTING TASK */
// gulp.task('test', () => {
//     return glob(__dirname + '/public/pages/, function(err, files) {
//         console.log(files);
//         console.log(err);
//         console.log(__dirname + '/public');
//     });
// });


function handleError(err) {
    console.log("ERROR:\n\tplugin:  " + err.plugin + '\n\tmessage: ' + err.message);
}

// Task which create zip packages from public
gulp.task('package', () => {

    let date = new Date();
    date = date.toJSON().split('T')[0];

    gulp.src('*.zip', {
            read: false
        })
        .pipe(clean({
            force: true
        }));

    gulp.src(['src/**', 'package.json', 'gulpfile.js'])
        .pipe(zip('HTML_src_' + date + '.zip'))
        .pipe(gulp.dest(''));

    gulp.src('public/**')
        .pipe(zip('HTML_public_' + date + '.zip'))
        .pipe(gulp.dest(''));
});

gulp.task('styles', () => {
    gulp.src(_styles.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(_styles.output))
        .on('error', handleError);

    browserSync.reload();
});

gulp.task('lint:js', () => {
    return gulp.src(_scripts.input)
        .pipe(plumber(handleError))
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('scripts', () => {
    gulp.src(_scripts.input)
        .pipe(plumber(handleError))
        .pipe(babel())
        .pipe(concat('app.js'))
        .on('error', handleError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(_scripts.output));

    browserSync.reload();
});

gulp.task('html', () => {
    gulp.src([_html.input, _html.includes])
        .pipe(plumber(handleError))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: __dirname + _html.includes
        }))
        .pipe(gulp.dest('public/'));

    browserSync.reload();
});

gulp.task('fonts', () => {
    gulp.src(_fonts.input)
        .pipe(plumber(handleError))
        .pipe(gulp.dest(_fonts.output));

    browserSync.reload();
});


gulp.task('images', () => {
    gulp.src(_images.input)
        .pipe(plumber(handleError))
        .pipe(gulp.dest(_images.output));

    browserSync.reload();
});

gulp.task('clean', () => {
    gulp.src('public/*', {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

gulp.task('watch', () => {
    gulp.watch(_styles.input, ['styles']);
    gulp.watch(_scripts.input, ['scripts']);
    gulp.watch(_html.input, ['html']);
});

gulp.task('connect', () => {
    return browserSync.init({
        port: 8080,
        server: {
            baseDir: './public'
        },
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        logPrefix: 'PROJECT NAME',
        logConnections: false,
        logFileChanges: false,
        reloadOnRestart: true,
        notify: false,
        minify: false
    });
});

gulp.task('minify', () => {
    gulp.run(['minify:styles', 'minify:scripts']);
});

gulp.task('build', () => {
    gulp.run(['fonts', 'images', 'styles', 'scripts', 'html']);
});

gulp.task('default', () => {
    gulp.run(['build', 'watch', 'connect']);
});

gulp.task('buildAndWatch', () => {
    gulp.run(['build', 'watch']);
});
