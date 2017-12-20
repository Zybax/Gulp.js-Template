const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browser = require('browser-sync').create();

// Testing...
gulp.task("default", ['sass','start']);
gulp.task("production", ['copyHtml', 'imageMin', 'sass', 'script']);

// Compile HTML Files
gulp.task("copyHtml", () =>
    gulp.src('src/*.html')
    .pipe(gulp.dest('dest'))
);

// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images'))
);

// Minify javascript 
gulp.task("uglify", () =>
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))
);

// Concatenate scripts
gulp.task("script", () =>
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify()) //script task also minifies the js
    .pipe(gulp.dest('dest/js'))
);

// Compile sass
gulp.task("sass", () =>
    gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
);

// Watch
gulp.task('start', () => {
    browser.init({
        server: './src'
    });

    // gulp.watch('src/js/*.js', ['script']);
    gulp.watch(['src/scss/*.scss'], ['sass']);
    // gulp.watch(['src/images/*'], ['imageMin']);
    gulp.watch(['src/*.html']).on('change', browser.reload);
  
});