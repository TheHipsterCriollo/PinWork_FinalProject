var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch')
var livereload = require('gulp-livereload');

// monitorear archivos sass
gulp.task('watch', () => {
    livereload.listen();
    return watch('./sass/**/*.scss', () => gulp.start('sass'));
});

// generar css desde sass
gulp.task('sass', () => {
  return gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});