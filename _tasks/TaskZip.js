var util = require('./lib/util');
var del = require('del');
var zip = require('gulp-zip');

module.exports = function (gulp, config) {

    //清除目标目录
    function delDist() {
        return del(['./dist']);
    }

    function zipTask(){
        return gulp.src('./dist/**/*')
            .pipe(zip('dist.zip'))
            .pipe(gulp.dest('./'));
    }

    //注册 zip 任务
    gulp.task('zip', gulp.series(
        'build_dist',
        zipTask,
        delDist
    ));
};
