/*
 Grunt Workflow v1.3

 一个完整的Grunt工作流，其中包含：
    Less编译CSS
    CSS压缩
    自动合并雪碧图
    自动处理Retina 2x适配
    文件变动监控
    FTP发布部署
    Zip打包

 https://github.com/Mobile-Team/Grunt-Workflow
 */

// grunt-timer 返回各个task的执行时间
var timer = require("grunt-timer");

module.exports = function (grunt) {

    // grunt-timer 初始化
    timer.init(grunt);

    grunt.initConfig({

        // 获取 package.json 依赖
        pkg: grunt.file.readJSON('package.json'),

        // Less 编译 CSS
        less: {

            // 编译

            // 分支 -> 开发向
            dev: {
                files: [
                    {
                        expand: true, //启用动态扩展
                        cwd: 'css/', // css文件源的文件夹
                        src: ['*.less', '!import*.less'], // 匹配规则
                        dest: 'tmp/css/', //导出css和雪碧图的路径地址
                        ext: '.css' // 导出的css名
                    }
                ],
                options: {
                    yuicompress: false
                }
            },
            // 分支 -> 发布向
            release: {
                files: [
                    {
                        expand: true, //启用动态扩展
                        cwd: 'css/', // css文件源的文件夹
                        src: ['*.less', '!import*.less'], // 匹配规则
                        dest: 'tmp/css/', //导出css和雪碧图的路径地址
                        ext: '.css' // 导出的css名
                    }
                ],
                options: {
                    yuicompress: true
                }
            }

        },
        // CSS 语法检查
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['publish/css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['publish/css/*.css']
            }
        },
        // 压缩css
        cssmin: {
            min: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/css',
                        src: ['*.sprite.css'],
                        dest: 'tmp/css',
                        ext: '.css'
                    }
                ]
            }
        },
        // 自动雪碧图
        sprite: {
            // This is are multitask, you can create multiple sprite generators buy copying all
            // object with other name, see grunt.js docs for details
            sprite: {
                files: [
                    {
                        expand: true, //启用动态扩展
                        cwd: 'tmp/css', // css文件源的文件夹
                        src: ['*.css'], // 匹配规则
                        dest: 'tmp/', //导出css和雪碧图的路径地址
                        ext: '.sprite.css' // 导出的css名
                    }
                ],
                // options
                options: {
                    // OPTIONAL: Rendering engine: auto, canvas, gm
                    'engine': 'gm',
                    // OPTIONAL: Image placing algorithm: top-down, left-right, diagonal, alt-diagonal
                    'algorithm': 'binary-tree'

                }
            }
        },
        copy: {
            // 移动 slice/ 到 tmp/ 供下一步的 sprite Task 使用
            slice: {
                files: [
                    {expand: true, cwd: 'slice/', src: ['**'], dest: 'tmp/slice/'}, // makes all src relative to cwd
                ]
            },
            // 分支 -> 开发向
            dev: {
                files: [
                    {expand: true, cwd: 'tmp/css/', src: ['**', '!*.sprite.css', '!*.min.css'], dest: 'publish/css/'}, // makes all src relative to cwd
                    {expand: true, cwd: 'slice/', src: ['**'], dest: 'publish/slice/'}, // makes all src relative to cwd
                    {expand: true, cwd: 'img/', src: ['**'], dest: 'publish/img/'}, // makes all src relative to cwd
                ]
            },
            // 分支 -> 发布向
            release: {
                files: [
                    {expand: true, cwd: 'tmp/css/', src: ['*.css', '!*.sprite.css', '!*.min.css'], dest: 'release/css/'}, // makes all src relative to cwd
                    {expand: true, cwd: 'img/', src: ['**'], dest: 'release/img/'}, // makes all src relative to cwd
                    {expand: true, cwd: 'tmp/sprite/', src: ['**'], dest: 'release/sprite/'} // makes all src relative to cwd
                ]
            },
            // 分支 -> 调试向
            debug: {
                files: [
                    {expand: true, cwd: 'tmp/css/', src: ['*.css', '!*.sprite.css', '!*.min.css'], dest: 'publish/css/'}, // makes all src relative to cwd
                    {expand: true, cwd: 'img/', src: ['**'], dest: 'publish/img/'}, // makes all src relative to cwd
                    {expand: true, cwd: 'tmp/sprite/', src: ['**'], dest: 'publish/sprite/'} // makes all src relative to cwd
                ]
            }
        },
        watch: {
            files: 'css/*.less',
            tasks: ['less:dev', 'copy:dev', 'clean:dev']
        },
        'ftp-deploy': {
            push: {
                auth: {
                    host: '119.147.200.113',
                    port: 21000,
                    authKey: 'lifestyle'
                },
                src: 'release/',
                dest: 'proj-<%= pkg.name %>/',
                exclusions: ['**/.DS_Store', '**/Thumbs.db', 'tmp']
            }
        },
        pngmin: {
            compile: {
                options: {
                    ext: '.png',
                    force: true,
                    iebug: true //IE6
                },
                files: [
                    {
                        src: ['release/sprite/*.png'],
                        dest: 'release/sprite/'
                    },
                    {
                        expand: true,
                        cwd: 'release/img',
                        src: ['**/*.png'],
                        dest: 'release/img',
                        ext: '.png'
                    }
                ]
            }
        },
        _2x2x: {
            scale: {
                imgsrcdir: "slice",
                imgdesdir: "slice",
                option: {
                    'overwrite': true
                }
            }
        },
        clean: {
            dev: ['tmp/','publish/sprite/', 'release/'],
            release: ['tmp/', 'publish/', 'release/'],
            debug: ['tmp/', 'publish/slice/']

        },
        compress: {
            main: {
                options: {
                    archive: 'proj-<%= pkg.name %>-' + 'release.zip'
                },
                files: [
                    { expand: true, src: "**/*", cwd: "release/" }
                ]
            }
        }
    });

    // Offical
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Plugins
    grunt.loadNpmTasks('grunt-sprite');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-pngmin');

    // Basic Tasks

    // 默认流，输出 publish['css', 'img', 'slice']
    // 仅Less->CSS，无其他操作
    grunt.registerTask('default', ['less:dev', 'copy:dev', 'clean:dev', 'watch']);

    // 完全发布流，输出 release['css', 'img', 'sprite']
    grunt.registerTask('all', ['less:release', 'sprite-cssmin', 'copy:release']);

    // 调试流，输出 publish['css', 'img', 'sprite']，不清除 [tmp]
    grunt.registerTask('debug', ['clean:release', 'less:release', 'sprite-cssmin', 'copy:debug', 'watch']);

    // 两种刚发布方向 ftp上传 和 本地打包
    grunt.registerTask('push', ['all', 'ftp-deploy:push', 'clean:release']);
    grunt.registerTask('zip', ['all', 'compress', 'clean:release']);

    // 别名：移动slice -> 合并sprite -> css压缩
    grunt.registerTask('sprite-cssmin', ['copy:slice', 'sprite', 'cssmin']);

}