# xioo-docs

## 概述

将[am-editor](https://github.com/red-axe/am-editor)和[drawio](https://github.com/jgraph/drawio)结合起来，来弥补am-editor没有流程图绘制功能的不足。

体验地址：

[xioo-docs](https://doc.xiooshow.com/) 

服务器资源有限，首次加载可能会比较慢请大家耐心等待。

此项目重在展示[am-editor](https://github.com/red-axe/am-editor)和[drawio](https://github.com/jgraph/drawio)结合使用示例，所以，am-editor的上传的功能没有实现，如果有需要大家可以直接查看am-editor文档。

![docs](https://github.com/zhaodeezhu/xioo-docs/blob/master/images/docs.gif?raw=true)

## 启动

### 安装包

```sh
npm i
```

### 本地启动项目

```shell
npm run front
```

## 部署

### Node端打包

```shell
npm run server:build
```

### 前端打包

```shell
npm run view:build
```

### 启动

```shell
npm run load
```

生产启动使用到了pm2如果没有，请自行安装