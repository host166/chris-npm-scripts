## Installation
 
```bash
$ npm i chris-auto-utils -D
```

## 插件功能
    1. 英文描述为"auto extract"，意为提取工具类方法。
    2. 基于webpack时会监听目录中的模块增、删、改操作，并提取（extract）到设置的出口文件中。

## 插件优点
    1. 开发的时候可以模块化开发，可写到定义的文件中进行抽象管理。
    2. 引用的时候不用分别引用不同文件，引用设置好的出口文件即可。
    3. 结合tree-shaking的概念，可以起到优化代码质量的作用。

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
