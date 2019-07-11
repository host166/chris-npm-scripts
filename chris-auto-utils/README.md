## Installation
 
```bash
$ npm i chris-auto-utils -D
```

## 插件功能
    1. webpack tree-shaking 的思想模块化脚本
    2. 监听目录中的模块增、删、改操作，打包到一个出口文件中。

## 插件优点
    1. 开发的时候希望模块化，写到多个文件中，抽象管理。
    2. 引用的时候不用分别引用不同文件，只引用同一个出口文件即可。

## 调用

```

/** 
 * listen module change
 * @param path {string} 需要监听的目录
 * @param outpath {string} 输出目录
 * @param outfilename {string} 输出文件名
*/

new signUpModule({
    path: "common/utils",
    outpath: "common",
    outfilename: "utilsEntry.js"
})

```

## if you like it，thank you。


### License
MIT
