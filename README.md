**tmt-workflow** 是一个基于 [Gulp(Gulp4)](https://github.com/gulpjs/gulp/tree/4.0) 、跨平台(Mac&Win)、高效、可定制的前端工作流程。

## 功能说明

`tmt-workflow` 有如下功能：
- Less 编译为 CSS(用 Sass 的伙伴们自行修改一下即可)
- CSS 代码前缀自动补全(Autoprefixer)
- CSS 压缩
- 雪碧图合成(css sprite)
- 自动处理 Retina 2x, Retina3x 适配
- 图片压缩
- JS 合并压缩
- EJS 模版编译
- 监听文件变动，自动刷新浏览器(LiveReload)
- FTP 发布部署
- ZIP 项目打包
- 完整的 PX -> REM 解决方案
- 完整的智能 WEBP 解决方案
- 完整的缓存解决方案(reversion, 编译时根据内容生成新文件名)

具体详见：https://github.com/weixin/tmt-workflow/wiki

## 安装

1. 默认认为您已经安装了 [Node](https://nodejs.org/en/) 环境
2. 安装全局 gulp4： `npm install gulpjs/gulp#4.0 -g`
3. 下载 tmt-workflow，进入根目录执行： `npm install`

> 注意：
> 1. 由于 gulp4 尚未发布，Win 用户需安装 git ，在 git bash 下执行 npm install，而不是在 cmd。
> 2. tmt-workflow 只支持 Node4 以上版本

## 目录介绍

```
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
            ├── icon-dribbble@2x.png
```

## 配置文件说明
```
{
  //ftp 配置
  "ftp": {
    "host": "xx.xx.xx.xx",
    "port": "8021",
    "user": "tmt",
    "pass": "password",
    "remotePath": "remotePath", //默认上传到根目录下，配置此属性可指定具体子目录
    "includeHtml": true  //ftp 上传是否包含 html
  },

  //自动刷新
  "livereload": {
     "available": true,  //开启自动刷新
     "port": 8080,
     "startPath": "html/TmTIndex.html"  //启动时自动打开的路径
   },

   //插件功能
   //路径相对于 tasks/plugins 目录
  "plugins": {
    "devAfter": ["TmTIndex"],  //dev 任务执行后自动执行
    "buildAfter": [],          //build 任务执行后自动执行
    "ftpAfter": ["ftp"]        //ftp 任务执行后自动执行
  },

  "lazyDir": ["../slice"], //gulp-lazyImageCSS 寻找目录(https://github.com/weixin/gulp-lazyimagecss)

  "supportWebp": false,  //编译使用 webp

  "supportREM": false,   //REM转换

  "reversion": false     //新文件名功能
}
```
在根目录下放置一份 `.tmtworkflowrc` 配置文件。通过修改配置文件，可以实现各任务中的相关流程，例如：是否需要编译一份 WEBP 资源，是否转换 REM 等。

更详细说明查看：https://github.com/weixin/tmt-workflow/wiki/%E2%92%8A-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%B4%E6%98%8E

## 任务介绍

### 1. 开发任务 `gulp dev`
按照前面介绍的目录结构创建好项目后，命令行中输入 `gulp dev` 即进入开发模式。
- 自动创建与 src 目录一致的 dev 目录存放 ejs 和 less 编译后的文件
- 自动监听所有文件变动
- 监听到文件变动时自动刷新浏览器, 可在工作流配置文件 .tmtworkflowrc 选择开启或关闭

### 2. 生产任务 `gulp build`
当开发完成之后，执行 `gulp build` 生成可供发布上线的最终文件。
自动生成 dist 目录，存放所有经过编译合并的文件。

### 3. FTP 部署 `gulp ftp`
此任务依赖于 生产任务，执行 `gulp ftp`时，会先执行 `gulp build` 生成 dist 目录，然后将生成的 dist 目录上传至 .tmtworkflowrc 指定的 ftp 地址。

### 4. 打包 `gulp zip`
执行 zip 任务时，会先执行 `gulp build` 生成 dist 目录，再将其打包压缩成 zip 包。

> 注意：所有开发修改均在 **src** 源文件目录下，dev 和 dist 目录为任务自动编译生成，勿需触碰。
> ftp 和 zip 任务执行后会自动删除调用 build 生成的 dist 目录，自己执行 build 任务生成的则不删。

更详细说明查看：https://github.com/weixin/tmt-workflow/wiki/%E2%92%8B-%E4%BB%BB%E5%8A%A1%E4%BB%8B%E7%BB%8D
