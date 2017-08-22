var gulp = require("gulp");
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var stylish = require('gulp-tslint-stylish');
var tsProject = ts.createProject('tsconfig.json');

Error.stackTraceLimit = Infinity;

gulp.task("build", ['lint'], function () {
    return gulp.src(['src/ts/search.ts', 'src/ts/**/*.ts', 'typings/**/*.d.ts', '!src/**/__tests__/*',])
        .pipe(plumber())
        .pipe(tsProject())
        .pipe(gulp.dest("dist/"));
});

gulp.task('lint', function () {
    gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
            emitError: false,
            sort: true,
            bell: true
        }));
});
