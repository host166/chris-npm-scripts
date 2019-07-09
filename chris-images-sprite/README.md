```

/**
 * @param config {object} 配置参数：
 * 
 * @param spritepath {string} 样式文件北京图片链接sprite图的路径
 * @param rowcount {number} 第一行最大放几张图 （因为需要利用第一行的总宽度来创建sprite图的场景尺寸）
 * @param listenpath {string} 监听目录
 * @param outfilepath {string} 输出文件到达的目录 （sprite图片和css文件会被输出到这里）
 * @param margin {number} 外边界距离平分到四边 每边=10/2
 * @param quality {number} 图片压缩值 值越小图片质量越小
 * 
**/

new AutoSprite({
    rowcount: 5,
    margin: 10,
    quality: 90,
    spritepath: "./",
    listenpath: `./common/assets`,
    outfilepath: `./common/less/sprites`
});

```