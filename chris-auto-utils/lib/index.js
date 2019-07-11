/** 
 * 监听文件export方法 
 * 注册export
**/
// const path = require("path");
const fs = require("fs");
const MD5 = require("MD5");
// https://www.npmjs.com/package/terser
const Terser = require("terser");

// 防抖处理 指定之间内执行一次
// let debounceTimer = null;

// var code = "/*asdasd*/ function add(first, second) { return first + second; }";
// var result = Terser.minify(code);
// console.log(result.error); // runtime error, or `undefined` if no error
// console.log(result.code);
// return false;

/** 
 * listen module change
 * @param path {string} 需要监听的目录
 * @param outpath {string} 输出目录
 * @param outfilename {string} 输出文件名
 * @param importurl {string} 对应导入模块的路径前缀 （如：@/utils/tool.js) 根据自己输出文件的位置来配置
*/
class listenRegisterModuleFactory{
    constructor(opts){
        this.configs = {
            path: "./common/utils",
            outpath: "./common",
            outfilename: "utilsEntry.js",
            importurl: "@/utils"
        };
        for(let x in this.configs) this.configs[x] = opts[x];

        this.beforeMD5 = "";
        this.afterMD5 = "";
        // console.log("constructor函数");
    }
    apply(compiler){

        // Called after the entry configuration from webpack options has been processed.
        compiler.plugin("entry-option", (compilation)=>{
            // console.log( "compile函数", compilation );
            this.writeModuleContent( this.readResources( this.configs.path ) );
            // callback();
        });

        // listen dir
        compiler.plugin("after-compile", (compilation,callback)=>{
            if(!compilation.contextDependencies) compilation.contextDependencies = [];

            if( !compilation.contextDependencies.filter(item=>item==this.configs.path).length ){
                compilation.contextDependencies.push(this.configs.path);
            };
            // console.log( "hahahaha fk" );
            callback();
        });

        compiler.plugin("watch-run", (watching, callback)=>{
            // const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;
            // if( !changedFiles[this.configs.path] ){
            //     console.log("filePath对应发生变化的文件：", changedFiles );
            // };
            this.writeModuleContent( this.readResources( this.configs.path ) );

            // console.log( "进入webpack插件内部执行环境 - watch-run" );
            callback();
        });
    }
    // read to directory method，ergodic category file and folders.   
    readdirectory(path){
        var readdir = fs.readdirSync( path ),
            files = readdir.filter(item=> /\.js$/gi.test(item) ),
            oFiles = {};
        
        // for each item
        files.map( item =>{
            let _path = path + "/" + item,
                keyname = _path.match(/[A-Za-z0-9_-]+\.js$/gi).join();
            
            if( !oFiles[keyname] ) oFiles[keyname]={};
            oFiles[keyname].path = _path;
            oFiles[keyname].data = this.extractData(_path);
            // this.writeImportStatement( this.extractName( _path, item ) );

            // fs.statSync(_path), statType.isDirectory(_path) : if the type is a folder. 
            // true: check if an object is a folder. 
            // false: if the type is a file.
        });

        // this.options = oFiles;
        return oFiles;
    }
    extractData(path){
        var fsRead = fs.readFileSync(path),
            cont = fsRead.toString(),
            matchingMethodName = cont; //.replace(/(\/\/)+.+/gi,"").match(/(export function|export class)+\s*(\w*)/gi);
        
        return matchingMethodName;
        // if( matchingMethodName ){
        //     let splitArray = matchingMethodName.toString().replace(/(export function|export class)+\s/gi,"").split(",");
        //     return splitArray;
        // };
        // return [];
    }

    // read resources in the content
    readResources(path){
        var readdir = fs.readdirSync( path ),
            files = readdir.filter(item=> /\.js$/gi.test(item) ),
            oFilesContent = [],
            filename = [];

        // for each item
        files.map( item =>{
            let _path = path + "/" + item;
            // console.log( item,_path );
            oFilesContent.push( fs.readFileSync(_path).toString() );
            filename.push(item);
        });

        // console.log("oFilesContent: ", oFilesContent, oFilesContent.join("\n").replace(/[\r\n]*/gi,""));
        // this.setFileSync("./temp.js",oFilesContent.join("\n"));
        return {
            content: oFilesContent,
            filename
        };
    }
    // write module content
    writeModuleContent(resp){
        var moduleContent = Terser.minify( resp.content.join("\n") ).code,
            FilePath = `${this.configs.outpath}/${this.configs.outfilename}`;
        
        // moduleContent = `${this.extractImport(resp.filename)}; ${moduleContent}`;
        
        this.beforeMD5 = MD5( fs.readFileSync(FilePath) );

        this.afterMD5 = MD5( moduleContent );

        // 相同则阻止事件传递
        if( this.beforeMD5 == this.afterMD5 ) return false;
        this.setFileSync(
            FilePath,
            moduleContent
        );
    }
    // extract import string
    extractImport(importReps){
        var result = [];
        importReps.map(item=>{
            result.push( `import "${this.configs.importurl}/${item}"` );
        });

        return result.join(";");
    }

    setFileSync(url,val){
        var _potinPath = url.split("/"),
            _newPath   = [];
        // existsFile = path.join(__dirname, url.replace(/(Analysis_)+.+[.a-z]/gi,""));
        
        // 最后一个是文件 所以减去1
        for( let i=0,len=_potinPath.length-1; i<len; i++ ){
            _newPath.push(_potinPath[i]);
            
            let strpath = _newPath.join("/");
            // 预检测的文件路径 or 是否存在
            if( !fs.existsSync( strpath ) && !!strpath ){
                fs.mkdirSync( strpath );
            };
        };
        _newPath = `${ _newPath.join("/") }/${_potinPath[_potinPath.length-1]}`;
        // console.log( _newPath );
        // 检测文件是否存在
        fs.writeFileSync( _newPath, val, { // existsSync
            encoding: "utf8",
            flags: "a",
            mode: 438
        });
    }
}

exports.default = listenRegisterModuleFactory;
module.exports = listenRegisterModuleFactory;