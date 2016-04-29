/**
 * Created by littledu on 15/5/16.
 */
var fs = require('fs'),
    path = require('path'),
    localIp = require('quick-local-ip');

module.exports = function (config) {
    var html = [
            '<!DOCTYPE html>',
            '<head>',
            '<meta charset="utf-8">',
            '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
            '<title></title>',
            '<link rel="stylesheet" href="http://wximg.gtimg.com/tmt/tools/file-list/css/style.css">',
            '<style type="text/css">',
            '.icon-qrcode{cursor: pointer;}@media only screen and (min-device-width : 310px) and (max-device-width : 800px){#myTable{margin: 0;max-width: 100%;}.td-header-qrcode,.td-header-time,.td-qrcode,.td-time{display:none;}.table-body,.td-header-title{font-size: 14px }}',
            '</style>',
            '</head>',
            '<body>',
            '   <table id="myTable" class="table">',
            '       <thead class="table-head">',
            '           <tr>',
            '           <th class="td-header-title">文件名</th>',
            '           <th class="td-header-qrcode" style="width:40px;text-align: center;">二维码</th>',
            '           </tr>',
            '       </thead>',
            '       <tbody class="table-body">'
        ].join(''),
        tmpHtml = '',
        length = '/dev/html/'.length,
        collector = listdir('./dev/html'),
        ip = localIp.getLocalIP4();


    showdir(collector, 0);

    function listdir(dir) {
        var collector = {
            'name': dir,
            'type': 'dir',
            'url': '',
            'child': []
        };
        files = fs.readdirSync(dir);


        files.forEach(function (file) {
            var absolutePath = dir + '/' + file,
                stats = fs.statSync(absolutePath);

            var url = absolutePath.substring(absolutePath.indexOf('./dev/html/') + length + 1);

            if (stats.isDirectory() && (stats.isDirectory() !== '.' || stats.isDirectory() !== '..')) {
                collector['child'].push(listdir(absolutePath));
            } else {
                collector['child'].push({
                    'name': path.basename(absolutePath),
                    'type': 'file',
                    'url': url
                });
            }
        });

        return collector;
    }

    function showdir(collector, level) {
        var file = collector['name'],
            basename = path.basename(file);

        var indent = 25 * (level - 1);

        if (indent <= 0) {
            indent = 10;
        }

        if (collector['type'] == 'dir') {
            if (level != 0) {
                html += '<tr><td class="td-dir" style="text-align:left; padding-left: ' + indent + 'px">[目录]: ' + basename + '</td><td></td></tr>';
            }

            collector['child'].forEach(function (item) {
                showdir(item, level + 1);
            });
        }

        if (collector['type'] == 'file') {
            if (path.extname(file) === '.html' && basename !== 'TmTIndex.html') {
                if (level === 1) {
                    tmpHtml += '<tr class="level1"><td class="td-file sort-file" style="padding-left: ' + indent + 'px"><a href="' + collector['url'] + '" target="_blank">' + basename + '</a></td><td class="td-qrcode"><i class="icon-qrcode"></i></td></tr>';
                } else {
                    html += '<tr><td class="td-file" style="padding-left: ' + indent + 'px"><a href="' + collector['url'] + '" target="_blank">' + basename + '</a></td><td class="td-qrcode"><i class="icon-qrcode"></i></td></tr>';
                }

            }
        }
    }

    html = html + tmpHtml;

    html += '</tbody></table><div id="qrcode"></div><script src="http://wximg.gtimg.com/tmt/tools/file-list/js/jquery-2.1.3.min.js"></script><script src="http://wximg.gtimg.com/tmt/tools/file-list/js/qrcode.min.js"></script><script type="text/javascript">$(document).ready(function(){ var url = location.href.replace("localhost", "' + ip + '");document.title= "' + config.projectName + ' 资源列表";  $(".level1").prependTo(".table-body"); $(".td-qrcode i").bind("mouseenter ",function(){$("#qrcode").show().empty();new QRCode(document.getElementById("qrcode"), encodeURI(url.split("TmTIndex.html")[0]+$(this).parent().parent().find("a").attr("href")));});$("body").bind("click",function(){$("#qrcode").hide();});});</script></body></html>';

    var out = fs.createWriteStream('./dev/html/TmTIndex.html', {encoding: "utf8"});
    out.write(html, function (err) {
        if (err) console.log(err);
    });
    out.end();
}
