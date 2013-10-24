# Grunt Workflow v1.3

## 一个完整的Grunt工作流，其中包含Task：
    
* Less编译CSS
* CSS压缩
* 自动合并雪碧图
* 自动处理Retina 2x适配
* 文件变动监控
* FTP发布部署
* Zip打包
* 2x图转换1x图

## 命令包括：

#### `grunt`  

默认流，输出 publish['css', 'img', 'slice']  
仅Less->CSS，无其他操作  

#### `grunt whole`
完全发布流，输出 release['css', 'img', 'sprite']

#### `grunt debug`
调试流，输出 publish['css', 'img', 'sprite']，不清除 [tmp]

#### `grunt push`
将release版本，FTP上传

#### `grunt zip`
将release版本，Zip打包到根目录，命名为`proj-xxx-release.zip`