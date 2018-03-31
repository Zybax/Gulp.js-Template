const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const browser = require('browser-sync').create();

// Testing...
gulp.task("default", ['sass', 'start']);
gulp.task("production", ['copyHtml', 'imageMin', 'sass', 'script', 'minify-css']);

// Compile HTML Files
gulp.task("copyHtml", () =>
    gulp.src('src/*.html')
    .pipe(gulp.dest('dest'))
);

// Minify Css
gulp.task('minify-css', () => {
    gulp.src('src/css/style.css')
        .pipe(cleanCSS({
            debug: true
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(rename({
            suffix: '.min'
        })) // Adding suffix min
        .pipe(gulp.dest('dest/css'));
});

// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
    .pipe(imageMin())
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
    .pipe(rename({
        suffix: '.min'
    })) // Adding suffix min
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
    gulp.watch(['src/css/*.css']).on('change', browser.reload);

});
