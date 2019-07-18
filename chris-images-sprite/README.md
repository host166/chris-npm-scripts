## Installation
 
```bash
$ npm i chris-images-sprite -D

```

## 插件功能
    1. 监听目标目录变化
    2. 正则提取图片：/\.(png|jpe?g)(\?.*)?$/
    3. 合理填充sprite画布


## 插件优点
    1. 比传统方式更加容易维护（想换哪张图直接换掉，会自动管理样式和sprite图）
    2. 在客户端减少http的请求
    3. 优雅的优化了代码量


## 调用

```

/**
 * @param config {object} 配置参数：
 * 
 * @param spritepath {string} 样式文件中background:url(sprite图的路径) no-repeat;
 * @param rowcount {number} 第一行最大放几张图 （因为需要利用第一行的总宽度来创建sprite图的场景尺寸）
 * @param listenpath {string} 监听目录
 * @param outfilepath {string} 输出文件到达的目录 （sprite图片和css文件会被输出到这里）
 * @param margin {number} 外边界距离平分到四边 每边=10/2
 * @param quality {number} 图片压缩值 值越小图片质量越小
 * @param name {string} 可以任意添加生成文件的后缀名
 * 
**/

const AutoSprite = require("chris-images-sprite");

new AutoSprite({
    rowcount: 5,
    margin: 10,
    quality: 90,
    spritepath: "./",
    listenpath: `./common/assets`,
    outfilepath: `./common/less/sprites`
});

```

##PS：
> "listenpath" !== "outfilepath"
> 请不要把输出文件的路径输入到监听目录中，因为这样会造成循环监听。


## if you like it，thank you。


### License
MIT