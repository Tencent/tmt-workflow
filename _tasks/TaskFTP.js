var _ = require('lodash');
var del = require('del');
var path = require('path');
var ftp = require('gulp-ftp');
var util = require('./lib/util');

module.exports = function (gulp, config) {

    //清除目标目录
    function delDist() {
        return del(['./dist']);
    }

    function remoteFtp() {
        var remotePath = config['ftp']['remotePath'] || "",
            ftpConfig = _.extend(config['ftp'], {
                remotePath: path.join(remotePath, config['projectName'])
            }),
            distPath = config['ftp']['includeHtml'] ? './dist/**/*' : ['./dist/**/*', '!./dist/html/**/*.html'];

        return gulp.src(distPath, {base: '.'})
            .pipe(ftp(ftpConfig));
    }

    //加载插件
    function loadPlugin(cb) {
        util.loadPlugin('ftp');
        cb();
    }

    //注册 ftp 任务
    gulp.task('ftp', gulp.series(
        'build_dist',
        remoteFtp,
        delDist,
        loadPlugin
    ));
};
