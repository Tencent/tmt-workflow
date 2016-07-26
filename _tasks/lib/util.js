var fs = require('fs');
var path = require('path');
var util = require('gulp-util');
var config = require('rc')('tmtworkflow', {
    projectName: process.cwd().split(path.sep).pop()
});

var tmt_util = {
    log: function (task_name) {
        util.log.apply(util, arguments);
    },
    task_log: function (task_name) {
        this.log(util.colors.magenta(task_name), util.colors.green.bold('√'));
    },
    loadPlugin: function (name, cb) {
        name = name + 'After';

        if (config['plugins'] && config['plugins'][name] && config['plugins'][name].length) {
            var plugins = config['plugins'][name];

            plugins.every(function (plugin) {
                if (plugin.indexOf('.js') === -1) {
                    plugin += '.js';
                }

                var filepath = path.resolve(__dirname, '../plugins', plugin);

                if (fs.existsSync(filepath)) {
                    require(filepath)(config);
                    (typeof cb === 'function') && cb();
                } else {
                    console.log('The ' + filepath + ' is not found!');
                    (typeof cb === 'function') && cb();
                }
            });
        }
    },
    colors: util.colors,
    dirExist: function (dirPath) {
        try {
            var stat = fs.statSync(dirPath);
            if (stat.isDirectory()) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            } else {
                throw new Error(err);
            }
        }
    },
    fileExist: function (filePath) {
        try {
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            } else {
                throw new Error(err);
            }
        }
    }
};

module.exports = tmt_util;
