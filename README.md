# tmt-workflow [![Version Number](https://img.shields.io/npm/v/generator-workflow.svg?style=flat)](https://github.com/Tencent/tmt-workflow/ "Version Number")

[![Build Status](https://api.travis-ci.org/Tencent/tmt-workflow.svg)](https://travis-ci.org/Tencent/tmt-workflow "Build Status")
[![Win Build status](https://img.shields.io/appveyor/ci/littledu/tmt-workflow.svg?label=Win%20build&style=flat)](https://ci.appveyor.com/project/littledu/tmt-workflow) 
[![devDependencies](https://img.shields.io/david/dev/weixin/tmt-workflow.svg?style=flat)](https://ci.appveyor.com/project/weixin/tmt-workflow "devDependencies") 
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT "Feel free to contribute.") 

> 一个基于 [Gulp](https://github.com/gulpjs/gulp)、高效、跨平台(macOS & Win)、可定制的前端工作流程。  
> 现已推出 GUI 桌面工具：[WeFlow](http://weflow.io/)，无需安装任何环境依赖即可使用，官网下载：http://weflow.io/

## 功能特性

- 自动化流程
  - [Less/Sass -> CSS](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%8C-Less-%E7%BC%96%E8%AF%91)
  - [CSS Autoprefixer 前缀自动补全](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%8D-Autoprefixer)
  - [自动生成图片 CSS 属性，width & height 等](https://github.com/Tencent/gulp-lazyimagecss)
  - [自动内联 SVG 到 CSS](https://github.com/Tencent/gulp-svg-inline)
  - [CSS 压缩 cssnano](https://github.com/ben-eb/cssnano)
  - [CSS Sprite 雪碧图合成](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%8E-CSS-Sprite)
  - [Retina @2x & @3x 自动生成适配](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%8E-CSS-Sprite)
  - [imagemin 图片压缩](https://github.com/sindresorhus/gulp-imagemin)
  - [JS 合并压缩](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%8F-JS-%E5%90%88%E5%B9%B6%E5%8E%8B%E7%BC%A9)
  - [EJS 模版语言](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%90-EJS-%E6%A8%A1%E7%89%88%E8%AF%AD%E8%A8%80)  
- 调试 & 部署
  - [监听文件变动，自动刷新浏览器 (LiveReload)](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%91-LiveReload)
  - [FTP 发布部署](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%92-FTP-%E5%8F%91%E5%B8%83%E9%83%A8%E7%BD%B2)
  - [ZIP 项目打包](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%93-ZIP-%E6%89%93%E5%8C%85)
- 解决方案集成
  - [px -> rem 兼容适配方案](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%94-REM-%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [智能 WebP 解决方案](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%95-WEBP-%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [SVG 整体解决方案](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9A-SVG%E6%95%B4%E4%BD%93%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [去缓存文件 Reversion (MD5) 解决方案](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%96-Reversion-%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

## 快速开始

请确保已安装 [Node.js](https://nodejs.org/) (已支持到最新版，如：v5+, v8, v9 等) 

1. 全局安装 [Gulp](https://github.com/gulpjs/gulp)，执行：`npm install gulp-cli -g`
2. 点击下载 [tmt-workflow](https://github.com/Tencent/tmt-workflow/archive/master.zip)，进入根目录执行： `npm install`

> 推荐使用 `yarn` 安装环境依赖，详见[yarn](https://yarnpkg.com)
> 注1：Windows 用户请先安装 [git](http://git-scm.com/)，然后在 [Git Bash](http://git-for-windows.github.io/) 下执行 `npm install` 即可（非 `CMD`）。 
>  
> 注2：如遇 `npm install` 网络问题，推荐尝试 [cnpm](http://npm.taobao.org/) 或 [NPM腾讯云分流](https://cloud.tencent.com/document/product/213/8623#.E4.BD.BF.E7.94.A8.E8.85.BE.E8.AE.AF.E4.BA.91.E9.95.9C.E5.83.8F.E6.BA.90.E5.8A.A0.E9.80.9Fnpm) 安装环境依赖

## 目录结构

#### 工作流目录结构

````bash
tmt-workflow/
│
├── _tasks          		// Gulp 任务目录
│   ├── TaskBuildDev.js     // gulp build_dev
│   ├── TaskBuildDist.js    // gulp build_dist
│   ├── TaskFTP.js      	// gulp ftp
│   ├── TaskZip.js      	// gulp zip
│   │
│   ├── common
│   │   └── webp.js
│   │
│   ├── index.js
│   │
│   ├── lib
│   │   └── util.js
│   │
│   └── plugins       		// 插件目录
│       ├── TmTIndex.js
│       └── ftp.js
│
├── package.json
│
└── project         		  // 项目目录，详见下述项目结构 ↓↓↓
    ├── src
    ├── dev
    ├── dist
    └── gulpfile.js
````

#### 项目目录结构


````bash
project/                          // 项目目录
├── gulpfile.js                   // Gulp 工作流配置文件
│
├── src                           // 源文件目录，`gulp build_dev`阶段会监听此目录下的文件变动
│   ├── css                       // 存放 Less 文件的目录，只有 style-*.less 的文件名会被编译
│   │   └── lib/
│   │   │   ├── lib-reset.less
│   │   │   ├── lib-mixins.less
│   │   │   └── lib-rem.less
│   │   └── style-index.less        // CSS 编译出口文件
│   │ 
│   ├── html
│   ├── media                     // 存放媒体文件，如 bgm.mp3 abc.font 1.mp4 等
│   ├── img                       // 存放背景图等无需合并雪碧图处理的图片
│   └── slice                     // 切片图片素材，将会进行雪碧图合并，同名 @2x 图片也会合并
│       ├── icon-shake.png
│       └── icon-shake@2x.png
│
├── dev                           // 开发目录，由 `gulp build_dev` 任务生成
│   ├── css
│   ├── html
│   ├── media
│   ├── img
│   └── slice                     // 开发阶段，仅从 src/slice 拷贝至此，不做合并雪碧图处理
│
└── dist                          // 生产目录，由 `gulp build_dist` 任务生成
    ├── css
    ├── html
    ├── media
    ├── img
    └── sprite                    // 将 /src/slice 合并雪碧图，根据 /css 文件名，命名为 style-*.png 
        ├── style-index.png
        └── style-index@2x.png
````

## 配置文件 `.tmtworkflowrc`

`.tmtworkflowrc` 配置文件为**隐藏文件**，位于工作流根目录，可存放配置信息或开启相关功能，[详见WiKi](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%8A-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%B4%E6%98%8E)。  
_如：FTP 配置信息、开启 WebP功能，开启 REM 支持等。_

```bash
{
  // FTP 发布配置
  "ftp": {
    "host": "xx.xx.xx.xx",
    "port": "8021",
    "user": "tmt",
    "pass": "password",
    "remotePath": "remotePath",         // 默认上传至根目录，此属性可指定子目录路径
    "includeHtml": true                 // FTP 上传时是否包含 .html 文件
  },

  // 浏览器自动刷新
  "livereload": {
     "available": true,                 // 开启
     "port": 8080,
     "startPath": "html/TmTIndex.html"  // 启动时自动打开的路径
  },

  // 插件功能

  // 路径相对于 tasks/plugins 目录
  "plugins": {
    "build_devAfter": ["TmTIndex"],     // build_dev 任务执行完成后，自动执行
    "build_distAfter": [],              // build_dist 任务执行完成后，自动执行
    "ftpAfter": ["ftp"]                 // ftp 任务执行完成后，自动执行
  },

  "lazyDir": ["../slice"],              // gulp-lazyImageCSS 启用目录
  
  "supportWebp": false,                 // 开启 WebP 解决方案

  "supportREM": false,                  // 开启 REM 适配方案，自动转换 px -> rem

  "supportChanged": false,              // 开启 只编译有变动的文件

  "reversion": false                    // 开启 新文件名 md5 功能
}
```

## 任务说明

> 注1：**`./src`** 为源文件(开发目录)，`/dev` 和 `/dist` 目录为流程**自动**生成的**临时目录**。  
> 注2：`FTP` 和 `zip` 任务执行后会**自动删除** `/dist` 目录。

**1. 开发任务 `gulp build_dev`**

按照`目录结构`创建好项目后，执行 `gulp build_dev` 生成开发文件位于 `/dev`，包含以下过程

- 完成 `ejs -> html` 和 `less -> css` 编译
- 自动监听文件改动，触发浏览器刷新  

_注：浏览器刷新功能可在 `.tmtworkflowrc` 中进行配置_

**执行后 Demo 预览：**[project/dev/html/index.html](http://weixin.github.io/tmt-workflow/project/dev/html/index.html)

**2. 生产任务 `gulp build_dist`**

开发完成后，执行 `gulp build_dist` 生成最终文件到 `/dist` 目录，包含以下过程：

- LESS/EJS 编译
- CSS/JS/IMG 压缩合并
- slice 图片合并成雪碧图
- SVG 内联压缩打包合并
- 文件添加版本号
- WebP 图片支持

**执行后 Demo 预览：**[project/dist/html/index.html](http://weixin.github.io/tmt-workflow/project/dist/html/index.html)

**3. FTP 部署 `gulp ftp`**  

依赖于 `生产任务`，执行后，会先执行 `gulp build_dist` ，然后将其生成的 `/dist` 目录上传至 `.tmtworkflowrc` 指定的 `FTP` 服务器。

**4. 打包任务 `gulp zip`**  

将 `gulp build_dist` 生成 `dist` 目录压缩成 `zip` 格式。

更多详细说明 [参见 WiKi](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%8B-%E4%BB%BB%E5%8A%A1%E4%BB%8B%E7%BB%8D)

## 使用预览

推荐配合 [WebStorm](https://www.jetbrains.com/webstorm/) 等编辑器的 [Gulp 任务管理器](https://www.jetbrains.com/webstorm/help/using-gulp-task-runner.html) 使用，体验更佳。

也可配合桌面工具：[WeFlow]，无需安装环境依赖，获得可视化的操作体验。

![tmt-workflow yo](https://cloud.githubusercontent.com/assets/1049575/13744821/77a67476-ea25-11e5-9cf3-eebf56ffbe03.gif)

## 其它说明

`tmt-workflow` 具有良好的`定制性`和`扩展性`，用户可针对自身团队的具体需求，参看以下文档进行定制：

* [任务的动态加载机制（高级）](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%97-%E4%BB%BB%E5%8A%A1%E7%9A%84%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E6%9C%BA%E5%88%B6%EF%BC%88%E9%AB%98%E7%BA%A7%EF%BC%89)
* [自定义任务（高级）](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%98-%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BB%BB%E5%8A%A1%EF%BC%88%E9%AB%98%E7%BA%A7%EF%BC%89)
* [自定义插件（高级](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%99-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8F%92%E4%BB%B6%EF%BC%88%E9%AB%98%E7%BA%A7%EF%BC%89)

## 参与贡献
 
如果你有 `Bug反馈` 或 `功能建议`，请创建 [Issue](https://github.com/Tencent/tmt-workflow/issues) 或发送 [Pull Request](https://github.com/Tencent/tmt-workflow/pulls)，非常感谢。

[腾讯开源激励计划](https://opensource.tencent.com/contribution) 鼓励开发者的参与和贡献，期待你的加入。

## License

所有代码采用 [MIT License](http://opensource.org/licenses/MIT) 开源，可根据自身团队和项目特点 `fork` 进行定制。
