const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-cleancss');
const browsersSync = require('browser-sync').create();

gulp.task('html', () =>{
	gulp.src('src/index.html')
	.pipe(gulp.dest('build'))
	.pipe(browsersSync.stream());

});
gulp.task('js', () =>{
	gulp.src('src/js/main.js')
	.pipe(gulp.dest('build/js'))
	.pipe(browsersSync.stream());

});

gulp.task('css', ['html', 'js'],() =>{
	gulp.src('src/main.less')
	.pipe(less())
	.pipe(autoprefixer({
		browsers: ['last 5 versions'],
		cascade: false
	}))
	.pipe(cleancss({compatibility: 'ie9'}))
	.pipe(gulp.dest('build/css'))
	.pipe(browsersSync.stream());

});


gulp.task('default', ['html', 'css', 'js'], () =>{

	browsersSync.init({
		server: "./build"
	});

	gulp.watch('src/index.html', ['html']);
	gulp.watch('src/**/*.less', ['css']);
	gulp.watch('src/**/*.js', ['js']);
});


