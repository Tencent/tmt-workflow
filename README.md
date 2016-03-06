## tmt-workflow [![Version Number](https://img.shields.io/badge/v-1.0.0-blue.svg?style=flat)](https://github.com/weixin/tmt-workflow/ "Version Number")

[![Build Status](https://travis-ci.org/weixin/tmt-workflow.svg)](https://travis-ci.org/weixin/tmt-workflow "Build Status")
[![Win Build status](https://img.shields.io/appveyor/ci/littledu/tmt-workflow.svg?label=Win%20build&style=flat)](https://ci.appveyor.com/project/littledu/tmt-workflow) 
[![devDependencies](https://img.shields.io/david/dev/weixin/tmt-workflow.svg?style=flat)](https://ci.appveyor.com/project/weixin/tmt-workflow "devDependencies") 

[![Join the chat at https://gitter.im/weixin/tmt-workflow](https://badges.gitter.im/Join%20Chat.svg?style=flat)](https://gitter.im/TmT?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![TmT Name](https://img.shields.io/badge/Team-TmT-brightgreen.svg?style=flat)](https://github.com/orgs/TmT/people "Tencent Moe Team") 
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT "Feel free to contribute.") 

> tmt-workflow 是一个基于 [Gulp(v4.0)](https://github.com/gulpjs/gulp/tree/4.0)、跨平台(Mac & Win)、高效、可定制的前端工作流程。

## 功能

- 自动化流程
  - [Less -> CSS (Sass 可自行定制)](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8C-Less-%E7%BC%96%E8%AF%91)
  - [CSS Autoprefixer 前缀自动补全](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8D-Autoprefixer)
  - [自动生成图片 CSS 属性，width & height 等](https://github.com/weixin/gulp-lazyimagecss)
  - [CSS 压缩](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8E-CSS-Sprite)
  - [CSS Sprite 雪碧图合成](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8E-CSS-Sprite)
  - [Retina @2x & @3x 自动生成适配](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8E-CSS-Sprite)
  - [imagemin 图片压缩](https://github.com/sindresorhus/gulp-imagemin)
  - [JS 合并压缩](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8F-JS-%E5%90%88%E5%B9%B6%E5%8E%8B%E7%BC%A9)
  - [EJS 模版语言](https://github.com/weixin/tmt-workflow/wiki/%E2%92%90-EJS-%E6%A8%A1%E7%89%88%E8%AF%AD%E8%A8%80)  
- 调试 & 部署
  - [监听文件变动，自动刷新浏览器 (LiveReload)](https://github.com/weixin/tmt-workflow/wiki/%E2%92%91-LiveReload)
  - [FTP 发布部署](https://github.com/weixin/tmt-workflow/wiki/%E2%92%92-FTP-%E5%8F%91%E5%B8%83%E9%83%A8%E7%BD%B2)
  - [ZIP 项目打包](https://github.com/weixin/tmt-workflow/wiki/%E2%92%93-ZIP-%E6%89%93%E5%8C%85)
- 解决方案集成
  - [px -> rem 兼容适配方案](https://github.com/weixin/tmt-workflow/wiki/%E2%92%94-REM-%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [智能 WebP 解决方案](https://github.com/weixin/tmt-workflow/wiki/%E2%92%95-WEBP-%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [去缓存文件 Reversion (MD5) 解决方案](https://github.com/weixin/tmt-workflow/wiki/%E2%92%96-Reversion-%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

## 快速开始

1. 安装 [Node.js](https://nodejs.org/) 默认此步骤已完成
2. 全局安装 [Gulp 4](https://github.com/gulpjs/gulp/tree/4.0)，执行：`npm install gulpjs/gulp#4.0 -g`
3. 下载 [tmt-workflow](https://github.com/weixin/tmt-workflow/releases/tag/1.0.0)，进入根目录执行： `npm install`

> 注：[Gulp 4](https://github.com/gulpjs/gulp/tree/4.0) 目前 [尚未正式发布](https://github.com/gulpjs/gulp/blob/4.0/CHANGELOG.md)，Windows 用户需先安装 `git`，  
> 然后在 `Git Bash` 下执行 `npm install`，而不是在 `CMD`。

# 目录结构

```bash
tmt-workflow/
│
├── _tasks       //Gulp 任务定义
├── package.json
├── .tmtworkflowrc  //工作流配置文件
└── project      //项目目录
    ├── gulpfile.js    //任务配置，每个项目必需
    ├── dev      //开发目录，由 dev 任务自动生成
    │   ├── css
    │   ├── html
    │   ├── img
    │   └── slice
    ├── dist     //生产目录(存放最终可发布上线的文件)，由 build 任务自动生成
    │   ├── css
    │   ├── html
    │   ├── img
    │   └── sprite   //雪碧图合并自 src/slice，文件名与 css 文件名一致
    │       ├── style-index.png
    │       └── style-index@2x.png
    └── src      //源文件目录，此目录会被监听变化并重新编译->dev
        ├── css  //样式表目录，使用 Less，只有 style-*.less 的文件名会被编译
        ├── html
        ├── img
        └── slice  //图片素材，雪碧图合并，同名的 @2x 图片会被识别并进行合并
            ├── icon-dribbble.png
            └── icon-dribbble@2x.png
```

## 配置文件 `.tmtworkflowrc`

该配置文件为**隐藏文件**，位于工作流根目录，可存放配置信息或开启相关功能，[详见WiKi](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8A-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%B4%E6%98%8E)。  
_如：FTP 配置信息、开启 WebP功能，开启 REM 支持等。_

```json
{
  // FTP 发布配置
  "ftp": {
    "host": "xx.xx.xx.xx",
    "port": "8021",
    "user": "tmt",
    "pass": "password",
    "remotePath": "remotePath", // 默认上传至根目录，此属性可指定子目录路径
    "includeHtml": true  //  FTP 上传时是否包含 .html 文件
  },

  // 浏览器自动刷新
  "livereload": {
     "available": true,  // 开启
     "port": 8080,
     "startPath": "html/TmTIndex.html"  // 启动时自动打开的路径
  },

  // 插件功能

  // 路径相对于 tasks/plugins 目录
  "plugins": {
    "devAfter": ["TmTIndex"],  // dev 任务执行完成后，自动执行
    "buildAfter": [],          // build 任务执行完成后，自动执行
    "ftpAfter": ["ftp"]        // ftp 任务执行完成后，自动执行
  },

  "lazyDir": ["../slice"], // gulp-lazyImageCSS 启用目录
  
  "supportWebp": false,  // 开启 WebP 解决方案

  "supportREM": false,   // 开启 REM 适配方案，自动转换 px -> rem

  "reversion": false     // 开启 新文件名 md5 功能
}
```

## 任务说明

**1. 开发任务 `gulp dev`**  

按照上述目录结构创建好项目后，执行 `gulp dev` 进入开发流程：

- 自动生成 `dev` 目录，完成 `ejs -> html` 和 `less -> css` 编译
- 自动监听所有文件变动，并触发浏览器刷新  

_注：可在 `.tmtworkflowrc` 配置开启或关闭_

**2. 生产任务 `gulp build`**  

开发完成后，执行 `gulp build` 可供生成最终文件。
自动生成 dist 目录，存放所有经过编译合并的文件。

**3. FTP 部署 `gulp ftp`**  

此任务依赖于 生产任务，执行 `gulp ftp`时，会先执行 `gulp build` 生成 dist 目录，然后将生成的 dist 目录上传至 .tmtworkflowrc 指定的 ftp 地址。

**4. 打包 `gulp zip`**  

执行 zip 任务时，会先执行 `gulp build` 生成 dist 目录，再将其打包压缩成 zip 包。

> 注意：所有开发修改均在 **src** 源文件目录下，dev 和 dist 目录为任务自动编译生成，勿需触碰。
> ftp 和 zip 任务执行后会自动删除调用 build 生成的 dist 目录，自己执行 build 任务生成的则不删。

[更详细说明查看 WiKi](https://github.com/weixin/tmt-workflow/wiki/%E2%92%8B-%E4%BB%BB%E5%8A%A1%E4%BB%8B%E7%BB%8D)

## 其它说明

`tmt-workflow` 具有良好的`定制性`和`扩展性`，用户可针对自身团队的具体需求，参看以下文档进行定制：

* [任务的动态加载机制（高级）](https://github.com/weixin/tmt-workflow/wiki/%E2%92%97-%E4%BB%BB%E5%8A%A1%E7%9A%84%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E6%9C%BA%E5%88%B6%EF%BC%88%E9%AB%98%E7%BA%A7%EF%BC%89)
* [自定义任务（高级）](https://github.com/weixin/tmt-workflow/wiki/%E2%92%98-%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BB%BB%E5%8A%A1%EF%BC%88%E9%AB%98%E7%BA%A7%EF%BC%89)
* [自定义插件（高级](https://github.com/weixin/tmt-workflow/wiki/%E2%92%99-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8F%92%E4%BB%B6%EF%BC%88%E9%AB%98%E7%BA%A7%EF%BC%89)

## 参与贡献

此项目由 [TmT 团队](https://github.com/orgs/TmT/people) 创建和维护。  
如果你有 `Bug反馈` 或 `功能建议`，请创建 [Issue](https://github.com/weixin/tmt-workflow/issues) 或发送 [Pull Request](https://github.com/weixin/tmt-workflow/pulls) 给我们，感谢你的参与和贡献。
