var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpIgnore = require('gulp-ignore');
var exec = require('child_process').exec;

var PATH = {
  JS: {
    include: ['./bin/**/*.js'],
    exclude: ['**/node_modules/**/*.js', '**/gulpfile.js']
  },
  OTHERS: {
    include: ['./config.json', './bin/**/*.json'],
    exclude: ['*.js']
  }
}
var DEST_FOLDER = './dist';
var last_process = null;
 
gulp.task('babel:compile', function () {
  exec('rm -rf ' + DEST_FOLDER, function () {
    gulp.src(PATH.JS.include)
      .pipe(gulpIgnore.exclude(
        PATH.JS.exclude
      ))
      .pipe(babel({
        sourceMaps: true,
        presets: ['es2015']
      }))
      .on('error', function (err) {
        console.log(err.toString());
      })
      .pipe(gulp.dest(DEST_FOLDER));
  });
});

gulp.task('files:copy', function () {
  gulp.src(PATH.OTHERS.include)
    .pipe(gulpIgnore.exclude(PATH.OTHERS.exclude))
    .pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('watch', function () {
  gulp.watch(PATH.JS.include, ['build']);
})

gulp.task('build', ['babel:compile', 'files:copy']);
gulp.task('run', ['build', 'application:run']);