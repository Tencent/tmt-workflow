/**
 * Created by littledu on 15/4/28.
 */
var util = require('./../lib/util');
var path = require('path');

module.exports = function(config){
    var remotePath = config['ftp']['remotePath'] || "";
    var url = 'http://' + path.join(remotePath, config['projectName'], 'dist/html/').replace(/\\/g, '/');

    util.log(util.colors.magenta('copy to browser：') + url);
}
