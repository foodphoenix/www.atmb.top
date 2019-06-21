/*
enderext.js v1.0
@zsh2401
对所有拓展模块相关页面进行渲染的模块
*/
const fs = require('fs');
const jade = require('jade');
const base = require('../base');
const libdata = require('../data/data');
const DIR_EXTS = base.rootDir +  "/docs/extension/";
const JADE_GALLERY = base.rootDir + "/jade/src/extgallery.jade";
const JADE_EXTVIEW = base.rootDir + "/jade/src/extview.jade";
const HTML_GALLERY = base.rootDir + "/docs/extension/index.html";

//读取数据
const data = libdata.read();

/*渲染主页 */
function renderGallery(){
    let html = jade.renderFile(JADE_GALLERY,data);
    fs.writeFileSync(HTML_GALLERY,html);
}
/*根据ID,生成每个拓展模块的详情页面 e.g: 20181010.html */
function renderExtViews(){
    for(let i =0;i<data.exts.length;i++){
        let ext = data.exts[i];
        data.ext = ext;
        let html = jade.renderFile(JADE_EXTVIEW,data);
        fs.writeFileSync(DIR_EXTS + ext.id + ".html",html);
    }
    data.ext = undefined;
}
//将函数导出
exports.renderGallery = renderGallery;
exports.renderExtViews = renderExtViews;
