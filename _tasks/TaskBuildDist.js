var del = require('del');
var path = require('path');
var ejs = require('gulp-ejs');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var util = require('./lib/util');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin2');
var lazyImageCSS = require('gulp-lazyimagecss');  // 自动为图片样式添加 宽/高/background-size 属性
var minifyCSS = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var tmtsprite = require('gulp-tmtsprite');   // 雪碧图合并
var ejshelper = require('tmt-ejs-helper');
var postcss = require('gulp-postcss');  // CSS 预处理
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssAutoprefixer = require('autoprefixer');
var posthtml = require('gulp-posthtml');
var posthtmlPx2rem = require('posthtml-px2rem');
var RevAll = require('gulp-rev-all');   // reversion
var revDel = require('gulp-rev-delete-original');

var paths = {
    src: {
        dir: './src',
        img: './src/img/**/*.{JPG,jpg,png,gif}',
        slice: './src/slice/**/*.png',
        js: './src/js/**/*.js',
        media: './src/media/**/*',
        less: './src/css/style-*.less',
        lessAll: './src/css/**/*.less',
        html: ['./src/html/**/*.html', '!./src/html/_*/**.html'],
        htmlAll: './src/html/**/*',
        php: './src/**/*.php'
    },
    dist: {
        dir: './dist',
        css: './dist/css',
        img: './dist/img',
        html: './dist/html',
        sprite: './dist/sprite'
    }
};

module.exports = function (gulp, config) {
    var webp = require('./common/webp')(config);

    var lazyDir = config.lazyDir || ['../slice'];

    var postcssOption = [];

    if (config.supportREM) {
        postcssOption = [
            postcssAutoprefixer({browsers: ['last 5 versions']}),
            postcssPxtorem({
                root_value: '20', // 基准值 html{ font-zise: 20px; }
                prop_white_list: [], // 对所有 px 值生效
                minPixelValue: 2 // 忽略 1px 值
            })
        ]
    } else {
        postcssOption = [
            postcssAutoprefixer({browsers: ['last 5 versions']})
        ]
    }

    // 清除目标目录
    function delDist() {
        return del([paths.dist.dir]);
    }

    //编译 less
    function compileLess() {
        return gulp.src(paths.src.less)
            .pipe(less())
            .pipe(lazyImageCSS({imagePath: lazyDir}))
            .pipe(tmtsprite({margin: 4}))
            .pipe(gulpif('*.png', gulp.dest(paths.dist.sprite), gulp.dest(paths.dist.css)));
    }

    //自动补全
    function compileAutoprefixer() {
        return gulp.src('./dist/css/style-*.css')
            .pipe(postcss(postcssOption))
            .pipe(gulp.dest('./dist/css/'));
    }

    //CSS 压缩
    function miniCSS(){
        return gulp.src('./dist/css/style-*.css')
            .pipe(minifyCSS({
                safe: true,
                reduceTransforms: false,
                advanced: false,
                compatibility: 'ie7',
                keepSpecialComments: 0
            }))
            .pipe(gulp.dest('./dist/css/'));
    }

    //图片压缩
    function imageminImg() {
        return gulp.src(paths.src.img)
            .pipe(imagemin({
                use: [pngquant()]
            }))
            .pipe(gulp.dest(paths.dist.img));
    }

    //复制媒体文件
    function copyMedia() {
        return gulp.src(paths.src.media, {base: paths.src.dir}).pipe(gulp.dest(paths.dist.dir));
    }

    //JS 压缩
    function uglifyJs() {
        return gulp.src(paths.src.js, {base: paths.src.dir})
            .pipe(uglify())
            .pipe(gulp.dest(paths.dist.dir));
    }

    //雪碧图压缩
    function imageminSprite() {
        return gulp.src('./dist/sprite/**/*')
            .pipe(imagemin({
                use: [pngquant()]
            }))
            .pipe(gulp.dest(paths.dist.sprite));
    }

    //html 编译
    function compileHtml() {
        return gulp.src(paths.src.html)
            .pipe(ejs(ejshelper()))
            .pipe(gulpif(
                config.supportREM,
                posthtml(
                    posthtmlPx2rem({
                        rootValue: 20,
                        minPixelValue: 2
                    })
                ))
            )
            .pipe(usemin({  //JS 合并压缩
                jsmin: uglify()
            }))
            .pipe(gulp.dest(paths.dist.html));
    }

    //webp 编译
    function supportWebp() {
        if (config['supportWebp']) {
            return webp();
        } else {
            return function noWebp(cb) {
                cb();
            }
        }
    }

    //新文件名(md5)
    function reversion(cb) {
        var revAll = new RevAll({
            fileNameManifest: 'manifest.json',
            dontRenameFile: ['.html', '.php']
        });

        if (config['reversion']) {
            return gulp.src(['./dist/**/*'])
                .pipe(revAll.revision())
                .pipe(gulp.dest(paths.dist.dir))
                .pipe(revDel({
                    exclude: /(.html|.htm)$/
                }))
                .pipe(revAll.manifestFile())
                .pipe(gulp.dest(paths.dist.dir));
        } else {
            cb();
        }
    }

    //加载插件
    function loadPlugin(cb) {
        util.loadPlugin('build_dist');
        cb();
    }

    //注册 build_dist 任务
    gulp.task('build_dist', gulp.series(
        delDist,
        compileLess,
        compileAutoprefixer,
        miniCSS,
        gulp.parallel(
            imageminImg,
            imageminSprite,
            copyMedia,
            uglifyJs
        ),
        compileHtml,
        reversion,
        supportWebp(),
        loadPlugin
    ));
};

