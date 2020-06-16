let pkg         = require('./package.json'),
    gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    sourcemaps  = require('gulp-sourcemaps'),
    header      = require('gulp-header'),
    eslint      = require('gulp-eslint'),
    mocha       = require('gulp-mocha'),
    webpack     = require('webpack-stream');
    banner      = '/*! <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2020, <%= pkg.author %> | <%= pkg.license %> */\n';

gulp.task('lint', () => {
    return gulp
    .src('src/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
    return gulp
    .src('test/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('dist', () => {
    return gulp.src([
        './src/justlog.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(webpack({
        entry: '.',
        name: '.',
        mode: 'production',
        output: {
            filename: 'justlog.[name].min.js',
            library: 'justlog',
            libraryTarget: 'var',
        },
        devtool: "source-map"
     }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dev', () => {
    return gulp.src([
        './src/justlog.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(webpack({
        entry: '.',
        name: '.',
        mode: 'development',
        output: {
            filename: 'justlog.[name].js',
            library: 'justlog',
            libraryTarget: 'var',
        },
        devtool: "source-map"
     }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('dist'));
