/**
 * f2e-workflow v1.6.9
 * https://github.com/Mobile-Team/f2e-workflow
 * @hzlzh <hzlzh.dev@gmail.com>
 */

module.exports = function(grunt) {

    // time-grunt 初始化
    require('time-grunt')(grunt);

    // Grunt 配置初始化
    grunt.initConfig({

        // 读取 package.json 依赖
        pkg: grunt.file.readJSON('package.json'),

        // Less 编译 CSS，若使用 Sass 请自行替换
        less: {
            // 编译

            // less 分支 -> 开发向
            dev: {
                files: [{
                    expand: true, // 启用动态扩展
                    cwd: 'css/', // CSS 文件源的文件夹
                    src: ['*.less', '!import*.less'], // 匹配规则
                    dest: 'tmp/css/', //导出 CSS 和雪碧图的路径地址
                    ext: '.css' // 导出的 CSS 名
                }],
                options: {
                    yuicompress: false // 开启 YUI CSS 压缩 (http://yui.github.io/yuicompressor/)
                }
            },
            // less 分支 -> 发布向
            release: {
                files: [{
                    expand: true, //启用动态扩展
                    cwd: 'css/', // CSS 文件源的文件夹
                    src: ['*.less', '!import*.less'], // 匹配规则
                    dest: 'tmp/css/', //导出 CSS 和雪碧图的路径地址
                    ext: '.css' // 导出的 CSS名
                }],
                options: {
                    yuicompress: true // 开启 YUI CSS 压缩 (http://yui.github.io/yuicompressor/)
                }
            }
        },

        // CSS 验证检查 (https://github.com/gruntjs/grunt-contrib-csslint)
        csslint: {
            options: {
                formatters: [{
                    id: 'junit-xml',
                    dest: 'report/csslint_junit.xml'
                }, {
                    id: 'csslint-xml',
                    dest: 'report/csslint.xml'
                }]
            },
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

        // CSS 压缩 (https://github.com/gruntjs/grunt-contrib-cssmin)
        cssmin: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css',
                    src: ['*.sprite.css'],
                    dest: 'tmp/css',
                    ext: '.css'
                }]
            }
        },

        // 自动合并生成雪碧图
        sprite: {
            sprite: {
                files: [{
                    expand: true, // 启用动态扩展
                    cwd: 'tmp/css', // CSS 文件源的文件夹
                    src: ['*.css'], // 匹配规则
                    dest: 'tmp/', // 导出 CSS 和雪碧图的路径地址
                    ext: '.sprite.css' // 导出的 CSS 名
                }],
                // options
                options: {
                    // 选择图片处理引擎: auto, canvas, gm
                    'engine': 'gm',
                    // 设置雪碧图合并算法，如：二叉树算法(top-down, left-right, diagonal, alt-diagonal)
                    'algorithm': 'binary-tree',
                    // 默认给雪碧图追加时间戳，如：background-image:url(../sprite/style@2x.png?20140304100328);
                    'imagestamp': true,
                    // 默认给样式文件追加时间戳，如：.TmTStamp{content:"20140304100328"}
                    'cssstamp': false,
                    // 每次编译生成新文件名，如：style-20140304102859.png
                    'newsprite': false
                }

            }
        },

        // 时间戳，去缓存
        // https://www.npmjs.org/package/grunt-timestamp
        timestamp: {
            timestamp: {
                files: [{
                    // Use dynamic extend name
                    expand: true,
                    // Open source dir
                    cwd: 'tmp/css',
                    // Match files
                    src: ['*.sprite.css'],
                    // Output files
                    dest: 'tmp/css',
                    // Set extend middle name
                    ext: '.timestamp'
                }],
                options: {
                    // Timestamp display text
                    'timestampName': 'Timetamp',
                    // Date format
                    'timestampFormat': 'yyyy/mm/dd HH:MM:ss',
                    // Add timestamp at the end of the files' content(.css/.js).
                    'timestampType': 'time',
                    // Timestamp type like time(2014/04/02 22:17:07) | md5/sha1/ha256/sha512).
                    'fileEndStamp': true,
                    // Add timestamp at images of CSS style.
                    'cssImgStamp': true,
                    // Rename file name with timestamp inside.
                    'fileNameStamp': true
                }
            }
        },

        // PNG 压缩 (更多配置说明：https://www.npmjs.org/package/grunt-pngmin)
        pngmin: {
            compile: {
                options: {
                    ext: '.png', // 后缀名
                    force: true, // 生成优化后的图片覆盖原始图片
                    iebug: false // 为 IE6 优化图片，如需要可设置`true`
                },
                files: [{
                    src: ['release/sprite/*.png'],
                    dest: 'release/sprite/'
                }, {
                    expand: true,
                    cwd: 'release/img',
                    src: ['**/*.png'],
                    dest: 'release/img',
                    ext: '.png'
                }]
            }
        },

        // 复制文件夹操作
        copy: {

            // 移动 slice/ 到 tmp/ 供下一步的 合并雪碧图 task 使用
            slice: {
                files: [{
                    expand: true,
                    cwd: 'slice/',
                    src: ['**'],
                    dest: 'tmp/slice/'
                }, ]
            },

            // copy 分支 -> 开发向
            dev: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css/',
                    src: ['**', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'publish/css/'
                }, {
                    expand: true,
                    cwd: 'slice/',
                    src: ['**'],
                    dest: 'publish/slice/'
                }, {
                    expand: true,
                    cwd: 'img/',
                    src: ['**'],
                    dest: 'publish/img/'
                }, ]
            },

            // copy 分支 -> 发布向
            release: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css/',
                    src: ['*.css', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'release/css/'
                }, {
                    expand: true,
                    cwd: 'img/',
                    src: ['**'],
                    dest: 'release/img/'
                }, {
                    expand: true,
                    cwd: 'tmp/sprite/',
                    src: ['**'],
                    dest: 'release/sprite/'
                }]
            },

            // copy 分支 -> 调试向
            debug: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css/',
                    src: ['*.css', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'publish/css/'
                }, {
                    expand: true,
                    cwd: 'img/',
                    src: ['**'],
                    dest: 'publish/img/'
                }, {
                    expand: true,
                    cwd: 'tmp/sprite/',
                    src: ['**'],
                    dest: 'publish/sprite/'
                }]
            }
        },

        // 检测 文件/代码 变动事件
        watch: {
            files: 'css/*.less',
            tasks: ['less:dev', 'copy:dev', 'clean:dev']
        },

        // FTP 部署，上传 release/ 所有文件到预先设置的FTP
        'ftp-deploy': {
            push: {
                auth: {
                    host: 'xxx.xxx.xxx.xxx',
                    port: 21000,
                    authKey: 'xxx'
                },
                src: 'release/',
                dest: 'proj-<%= pkg.name %>/',
                exclusions: ['**/.DS_Store', '**/Thumbs.db', 'tmp'] // 不上传文件类型
            }
        },

        // 自动生成 @2x 图片对应的 @1x 图 (已存在图片不再生成，仅缺失图片触发此操作) 
        _2x2x: {
            scale: {
                imgsrcdir: "slice", // 源目录，此目录中的 @2x -> @1x
                imgdesdir: "slice", // 目标目录
                option: {
                    'overwrite': true // 是否覆盖原图
                }
            }
        },

        // 清理临时目录
        clean: {
            // clean 开发向
            dev: ['tmp/', 'publish/sprite/', 'release/'],
            // clean 发布向
            release: ['tmp/', 'publish/', 'release/'],
            // clean 调试向
            debug: ['tmp/', 'publish/slice/']
        },

        // 文件夹打包压缩 Zip
        compress: {
            main: {
                options: {
                    archive: 'proj-<%= pkg.name %>-' + 'release.zip' // 设置压缩包名称
                },
                files: [{
                        expand: true,
                        src: "**/*",
                        cwd: "release/"
                    } // 设置压缩范围为整个 `release/` 发布目录
                ]
            }
        }
    });

    //    // 加载官方插件
    //    grunt.loadNpmTasks('grunt-contrib-less');
    //    grunt.loadNpmTasks('grunt-contrib-csslint');
    //    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //    grunt.loadNpmTasks('grunt-contrib-copy');
    //    grunt.loadNpmTasks('grunt-contrib-clean');
    //    grunt.loadNpmTasks('grunt-contrib-watch');
    //    grunt.loadNpmTasks('grunt-contrib-compress');
    //
    //    // 加载其他插件
    //    grunt.loadNpmTasks('grunt-sprite');
    //    grunt.loadNpmTasks('grunt-ftp-deploy');
    //    grunt.loadNpmTasks('grunt-pngmin');
    //    grunt.loadNpmTasks('grunt-timestamp');
    //    grunt.loadNpmTasks('grunt-2x2x');
    require('jit-grunt')(grunt);
    // 按需 load，文档：https://www.npmjs.org/package/jit-grunt


    /* 任务注册开始 */

    // == 默认工作流 ==
    // 输出目录为：../publish/(css/ + img/ + slice/)
    // 注：仅做编译操作 Less/Sass -> CSS，无其他操作
    grunt.registerTask('default', ['less:dev', 'copy:dev', 'clean:dev', 'watch']);

    // == 完整发布流 ==
    // 输出目录为：../publish/(css/ + img/ + sprite/)
    // 注：包括 Less/Sass 编译+压缩+雪碧图拼合+PNG压缩，仅执行1次流，不含(文件变动 watch)
    grunt.registerTask('all', ['less:release', 'sprite-cssmin', 'timestamp', 'copy:release', 'pngmin']);

    // == 调试工作流 ==
    // 输出目录为：../publish/(css/ + img/ + sprite/)
    // 注：同 `grunt all`，但不删除 tmp/ 目录，供调试查看使用，含(文件变动 watch)
    grunt.registerTask('debug', ['clean:release', 'less:release', 'sprite-cssmin', 'copy:debug', 'watch']);

    // == FTP 发布操作 ==
    // 注：将 `grunt all` 生成结果使用 FTP 上传到服务端
    grunt.registerTask('push', ['all', 'ftp-deploy:push', 'clean:release']);

    // == ZIP 发布操作 ==
    // 注：将 `grunt all` 生成结果使用 ZIP 生成包文件
    grunt.registerTask('zip', ['all', 'compress', 'clean:release']);

    // 定义别名 `grunt sprite-cssmin`
    // 注：拷贝移动 slice -> 合并雪碧图 sprite -> CSS 压缩
    grunt.registerTask('sprite-cssmin', ['copy:slice', 'sprite', 'cssmin']);

    // for test build
    grunt.registerTask('test', ['less:dev', 'copy:dev', 'clean:dev']);

    // 定义别名 `grunt 2x2x`
    // 注：@2x 图 生成 @1x 图
    grunt.registerTask('2x2x', ['_2x2x']);
}