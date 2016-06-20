var _ = require('lodash');
var path = require('path');
var del = require('del');
var util = require('./lib/util');
var sftp = require('gulp-sftp');

module.exports = function (gulp, config) {

    //清除目标目录
    function delDist() {
        return del(['./dist']);
    }

    function remoteSftp() {
        var remotePath = config['sftp']['remotePath'] || '',
            sftpConfig = _.extend(config['sftp'], {
                remotePath: path.join(remotePath, config['projectName'])
            }),
            distPath = config['ftp']['includeHtml'] ? './dist/**/*' : ['./dist/**/*', '!./dist/html/**/*.html'];

        return gulp.src(distPath, {base: '.'})
            .pipe(sftp(sftpConfig))
    }

    //加载插件
    function loadPlugin(cb) {
        util.loadPlugin('Res');
        cb();
    }

    //注册 Res 任务
    gulp.task('sftp', gulp.series(
        'build_dist',
        remoteSftp,
        delDist,
        loadPlugin
    ));
};
