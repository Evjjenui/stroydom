var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee');
    flatten = require('gulp-flatten'),
    pug = require('gulp-pug'),
    vfs = require('vinyl-fs');
    watch_pug = require('gulp-watch-pug')

    pugInheritance = require('gulp-pug-inheritance');
    changed = require('gulp-changed');
    cached = require('gulp-cached');
    gulpif = require('gulp-if');
    // debug = require('gulp-debug');
    filter = require('gulp-filter');

gulp.task('sass', function() {
  gulp.src(['src/scss/**/*.scss', 'src/scss/**/*.sass'])
    .pipe(sass().on('error', gutil.log))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch:sass', function(){
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
});

gulp.task('coffee', function() {
  gulp.src(['src/coffee/**/*.coffee'])
    .pipe(coffee({ bare: true }).on('error', gutil.log))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('watch:coffee', function(){
  gulp.src('src/coffee/**/*.coffee')
    .pipe(watch('src/coffee/**/*.coffee').on('error', gutil.log))
    .pipe(coffee())
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('pug', function() {
  return vfs.src('src/pug/**/*.pug')
    .pipe(changed('html', {extension: '.html'}))

    .pipe(gulpif(global.isWatching, cached('src/pug')))

    .pipe(pugInheritance({basedir: 'src/pug', skip: 'node_modules'}).on('error', gutil.log))
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    
    .pipe(pug({pretty: true}).on('error', gutil.log))
    .pipe(flatten().on('error', gutil.log))

    .pipe(vfs.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('cache', function() {
    global.isWatching = true;
});

gulp.task('nocache', function() {
    global.isWatching = false;
});

gulp.task('watch:pug', function(){
  gulp.watch(['src/pug/**/parts/*.pug'], ['cache', 'pug']);
  gulp.watch(['src/pug/**/*.pug', '!src/pug/**/parts/*.pug'], ['nocache', 'pug']);
});

gulp.task('server', function() {
  browserSync({
    startPath: '/dist/index.html',
    notify: false,
    open: true,
    server: {
      baseDir: './',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
});

gulp.task('build', [
  'sass',
  'pug',
  'coffee',
  ]);

gulp.task('clear', function(){
  return del([
    '/**/*'
  ]);
});

gulp.task('default', [
  // 'cache',
  'build',
  'watch:sass',
  'watch:pug',
  'watch:coffee',
  'server'
]);
