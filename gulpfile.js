var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .js.pipe(gulp.dest("dist"))
});

gulp.task('watch', ['default'], function () {
    gulp.watch('./src/**/*.ts', ['default']);
});