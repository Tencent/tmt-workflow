/**
 * Created by littledu on 15/5/2.
 */
var rd = require('rd');
var gulp = require('gulp');
var path = require('path');
var gulpWebp = require('gulp-webp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var util = require('./../lib/util');
var fs = require('fs');

module.exports = function (config, done) {

    var webpScript = '<script>function webpsupport(a){var c=window.localStorage;if(typeof a!="function"){a=function(){}}if(c!=undefined&&c._tmtwebp!=undefined&&c._tmtwebp==0){a();return false}else{if(c!=undefined&&c._tmtwebp!=undefined&&c._tmtwebp==1){a(1);return true}else{var f=new Image();f.onload=f.onerror=function(){if(f.height!=2){if(c!=undefined){c._tmtwebp=0}a();return false}else{if(c!=undefined){c._tmtwebp=1}a(1);return true}};f.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"}}};;(function(){function b(t){var f=document.getElementsByTagName("link");for(var e=0,d=f.length;e<d;e++){if(t){f[e].href=f[e].getAttribute("data-href").replace(".css",".webp.css");}else{f[e].href=f[e].getAttribute("data-href")}}}webpsupport(b);})();</script></head>';

    var webpMap = {};    //为了筛选webp而构建的对象
    var imgArr = [];     //筛选出来需要转换成 webp 的图片
    var imgMap = {};     //返回给全局作 preload 判断使用{"img_name": 1, "img_name": 0} 1 为可优化成 webp
    var reg = null;

    function render_webp(src) {
        if (!fs.existsSync(src)) return;

        rd.eachFileSync(src, function (file, stats) {
            var extname = path.extname(file);
            var basename = path.basename(file, extname);
            if (!(basename in webpMap)) {
                webpMap[basename] = {};
                webpMap[basename]['size'] = stats.size;
                webpMap[basename]['extname'] = extname;
            } else {
                if ((webpMap[basename]['size'] > stats.size) && (extname === '.webp')) {
                    imgArr.push(basename + webpMap[basename]['extname']);
                    imgMap[basename + webpMap[basename]['extname']] = 1;
                } else {
                    imgMap[basename + webpMap[basename]['extname']] = 0;
                }
            }
        });
    }

    return function () {
        return gulp.series(
            function compileSprite() {
                return gulp.src('./tmp/sprite/**/*')
                    .pipe(gulpWebp())
                    .pipe(gulp.dest('./tmp/sprite'));
            },
            function compileImg () {
                return gulp.src('./tmp/img/**/*')
                    .pipe(gulpWebp())
                    .pipe(gulp.dest('./tmp/img'));
            },
            //智能寻找 webp
            function find2Webp (cb) {
                render_webp('./tmp/sprite');
                render_webp('./tmp/img');
                if(imgArr.length){
                    reg = eval('/(' + imgArr.join('|') + ')/ig');
                }
                cb();
            },
            function compileCss () {
                return gulp.src(['./tmp/css/**/*.css', '!./tmp/css/**/*.webp.css'])
                    .pipe(rename({suffix: '.webp'}))
                    .pipe(replace(reg, function (match) {
                        if(match){
                            return match.substring(0, match.lastIndexOf('.')) + '.webp';
                        }
                    }))
                    .pipe(gulp.dest('./tmp/css'));
            },
            function insertWebpJs () {
                var preload_script = '<script>window.imgMap = ' + JSON.stringify(imgMap) + '</script>';

                return gulp.src('./tmp/html/**/*.html')
                    .pipe(replace('data-href', 'href'))
                    .pipe(replace(/(link.*?)href/ig, '$1data-href'))
                    .pipe(replace('</head>', webpScript))
                    .pipe(replace('</head>', preload_script))
                    .pipe(gulp.dest('./tmp/html'));
            }
        );
    }
}
