const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
// Testing...
gulp.task("default", ['copyHtml', 'imageMin', 'sass', 'script']);

// Compile HTML Files
gulp.task("copyHtml", () =>
    gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
);

// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'))
);

// Minify javascript 
// gulp.task("uglify", () =>
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('public/js'))
// );

// Concatenate scripts
gulp.task("script", () =>
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
);

// Compile sass

gulp.task("sass", () =>
    gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
);

// Watch
gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['script']);
    gulp.watch('src/scss/style.scss', ['script']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/*.html', ['copyHtml']);
});