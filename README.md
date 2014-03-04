## Grunt-Workflow  [![Bower version](https://badge.fury.io/bo/grunt-workflow.png)](http://badge.fury.io/bo/grunt-workflow) [![Build Status](https://secure.travis-ci.org/hzlzh/Grunt-Workflow.png)](http://travis-ci.org/hzlzh/Grunt-Workflow) [![devDependency Status](https://david-dm.org/hzlzh/Grunt-Workflow/dev-status.png?theme=shields.io)](https://david-dm.org/hzlzh/Grunt-Workflow#info=devDependencies)

**Grunt Workflow** 基于 [Grunt]，是一个跨平台的（Mac&Win）、优雅的、高效的、可定制的前端重构工作流程。

### 快速开始

提供以下三种方式获取：

- [下载最新版 Grunt Workflow](https://github.com/hzlzh/Grunt-Workflow/archive/master.zip)
- Clone the repo: `git clone git@github.com:hzlzh/Grunt-Workflow.git`
- 用 [Bower](http://bower.io) 安装: `bower install grunt-workflow`
	- 若已安装，可通过 [bower 或 git](https://github.com/hzlzh/Grunt-Workflow/issues/7) 保持更新

阅读 [说明文档] 了解更多，如有疑问参见 [Wiki] 中的图解

### 文件结构

安装完成后，你将得到以下文件结构：

```
Grunt-Workflow/
│
├── package.json                // 项目依赖定义
├── Gruntfile.js                // 配置任务
├── .ftppass                    // FTP 部署密码(非必选) 配置参见插件：grunt-ftp-deploy
│
├── node_modules    			  // `npm install` 得到依赖包
│
├── html/                   	  // HTML文件
│   └── index.html
├── css/                        // CSS源文件(通常为`Less`/`Sass`等)
│   ├── lib-reset.less
│   ├── lib-mixins.less
│   └── style.less
├── img/                        // 图片素材 [*非*合并 Sprite(雪碧图)] 如：logo
│   ├── logo.png
│   └── background.png
├── slice/                      // 图片素材 [待自动合并 Sprite] 如：Icons
│   ├── icon-github.png
│   ├── icon-github@2x.png      // 含 1x & 2x 图
│   ├── icon-twitter.png
│   └── icon-twitter@2x.png
└── publish/                    // 目标文件夹，存放可发布的成品
    ├── css/                    // 最终 CSS 成品
    │   └── style.css
    ├── img/                    // 仅 Copy 不错操作
    │   ├── logo.png
    │   └── background.png
    └── sprite/                 // 自动生成的雪碧图
        └── demo.png
```
经过 `Grunt Workflow` 的自动化过程，`../publish` 目录下为最终输出

### 环境准备

#### Mac OS

1. 建议使用 [Brew] 安装 [Node.js] *默认此步骤已完成*
2. 单独安装下面两个依赖 [注](https://github.com/Ensighten/spritesmith#requirements)

        // 安装 GraphicsMagick 图像处理库
        brew install GraphicsMagick
        
        // 安装 Phantomjs 库
        brew install phantomjs

3. 运行 `gm version` 和 `phantomjs --version` 来测试上述依赖是否成功安装完成

#### Windows

1. 安装 [Node.js] *默认此步骤已完成*
2. 下载安装 [GraphicsMagick] 和 [Phantomjs]  
    * [安装步骤图解](https://github.com/hzlzh/Grunt-Workflow/issues/2)  
    * 备用下载：[GraphicsMagick-1.3.19-Q8-win32-dll.zip](https://raw.github.com/hzlzh/Grunt-Workflow/assets/download/GraphicsMagick-1.3.19-Q8-win32-dll.zip)
    * 备用下载：[phantomjs-1.9.2-windows.zip](https://raw.github.com/hzlzh/Grunt-Workflow/assets/download/phantomjs-1.9.2-windows.zip)
3. 运行安装完成后，[添加环境变量步骤](https://github.com/hzlzh/Grunt-Workflow/issues/6)

#### Mac OS & Windows 通用步骤

1. 成功安装上述`GraphicsMagick`和`Phantomjs`之后，在项目目录下运行 `npm install` 继续安装其他依赖。
    * 若遇到网络问题，临时使用已打包的依赖包：[node_modules.zip](https://raw.github.com/hzlzh/Grunt-Workflow/assets/download/node_modules.zip)

<a name="details"></a>
### 说明文档

一个完整的 `Grunt 工作流`，其中包含 `Task`：
    
* Less/Sass 编译为 CSS
* CSS Lint 检验
* CSS 压缩
* 自动合并雪碧图
* 自动处理 Retina 2x 适配
* 自动追加 CSS 文件末时间戳
* 文件变动检测，触发编译
* FTP 发布部署
* ZIP 打包项目

### 命令详解：

#### 默认工作流 `grunt`

`grunt.registerTask('default', ['less:dev', 'copy:dev', 'clean:dev', 'watch']);`

输出目录为：../publish/(css/ + img/ + slice/)  
注：仅做编译操作 Less/Sass -> CSS，无其他操作  


#### 完整发布流 `grunt all`

输出目录为：`../publish/(css/ + img/ + sprite/)`  
注：包括 Less/Sass 编译+压缩+雪碧图拼合+PNG压缩，仅执行1次流，不含(文件变动 watch)

#### 调试工作流 `grunt debug`

输出目录为：`../publish/(css/ + img/ + sprite/)`  
注：同 `grunt all`，但不删除 `tmp/` 目录，供调试查看使用，含(文件变动 watch)

#### FTP 发布操作 `grunt push`

注：将 `grunt all` 生成结果使用 FTP 上传到服务端

#### ZIP 发布操作 `grunt zip`

注：将 `grunt all` 生成结果使用 ZIP 生成包文件  

#### 定义别名 `grunt sprite-cssmin`

注：拷贝移动 `slice/` -> 合并雪碧图 `sprite` -> CSS 压缩

#### 定义别名 `grunt 2x2x`

注：@2x 图 生成 @1x 图


### 补充说明

* 由于 `Mac OS` & `Win` 底层 `CPU图片压缩算法` 不同导致的版本库`Diff`问题 [\[见：#issues\]](https://github.com/zauni/pngmin/issues/6)
* 移除了开发过程中频繁的编译、压缩、合并图片等操作，开发全程使用 `@1x` 图以及 `未压缩 CSS` 预览

### License

Released under [MIT] LICENSE

[MIT]: http://rem.mit-license.org/
[Grunt]: http://gruntjs.com/
[说明文档]: https://github.com/hzlzh/Grunt-Workflow#details
[Wiki]: https://github.com/hzlzh/Grunt-Workflow/issues
[Brew]: http://brew.sh/
[Node.js]: http://nodejs.org/
[GraphicsMagick]: http://www.graphicsmagick.org/
[Phantomjs]: http://phantomjs.org/