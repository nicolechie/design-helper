var gulp = require('gulp');
var connect = require('gulp-connect');

/* 1 */
var paths = {
  scripts: [ 'app/*.js', '!app/bower_components/**/*.js' ],
  html: [
    './app/*.html',
    '!./app/index.html',
    '!./app/bower_components/**/*.html'
  ],
  index: './app/index.html',
}

// connect

gulp.task('connect', function() { 
  	connect.server({ root: 'app', livereload: true }); 
});

gulp.task('html', function () { 
	gulp.src('./app/*.html') .pipe(connect.reload()); 
});

gulp.task('css', function () { 
	gulp.src('./app/css/*.css') .pipe(connect.reload()); 
});

gulp.task('js', function () { 
	gulp.src('./app/*.js') .pipe(connect.reload()); 
});

gulp.task('watch', function () { 
	gulp.watch(['./app/*.js', './app/*.html', './app/css/*.css'], ['js', 'html', 'css']); 
});

gulp.task('default', ['connect', 'watch']);