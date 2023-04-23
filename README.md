# xioo-docs

[![drawio node服务](https://img.shields.io/badge/xioo-draw--node-orange)](https://github.com/zhaodeezhu/drawio-node) [![am-editor](https://img.shields.io/badge/-am--aditor-blue)](https://github.com/red-axe/am-editor) [![xioo](https://img.shields.io/badge/-xioo-green)]() [![体验地址](https://img.shields.io/badge/%E4%BD%93%E9%AA%8C-xioo--doc-yellowgreen)](http://211.159.187.214:2323/)

## feat

- 已完成逆向流程，就是新建图以后的编辑，前提是需要先选中卡片再点击卡片上的编辑图标
- 新建绘图已经去除开始的时候选择本地源的弹窗，直接进入到模板选择页面
- 自定义了drawio的图工具栏
- 区分了readonly模式和edit模式不同的操作方式
- 可将绘制的图下载为png图片
- **重大更新**：已经将图渲染部分单独使用webpack的方式发npm包了，也就是替换了全局引入viewer-static.min.js文件的部分

## 概述

将[am-editor](https://github.com/red-axe/am-editor)和[drawio](https://github.com/jgraph/drawio)结合起来，来弥补am-editor没有流程图绘制功能的不足。

体验地址：

[xioo-docs](http://211.159.187.214:2323/)

服务器资源有限，首次加载可能会比较慢请大家耐心等待。

此项目重在展示[am-editor](https://github.com/red-axe/am-editor)和[drawio](https://github.com/jgraph/drawio)结合使用示例，所以，am-editor的上传等功能没有实现，如果有需要大家可以直接查看am-editor文档。

![docs](https://github.com/zhaodeezhu/xioo-docs/blob/master/images/xioodocs.gif?raw=true)

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

# 渲染端

**4月16日重大更新**：已经将渲染端的部分使用webpack单独打包发布npm包了，以后再也不用全局引入搞很多全局变量污染全局了。

## 安装

```
npm i --save draw-viewer
```

## 使用

```typescript
import GraphViewer from 'draw-viewer';
let viewerInstance;
GraphViewer.createViewerForElement(div, (viewer) => {
  	// 图实例
    viewerInstance = viewer;
}, true);
```

在此包下已经提供.d.ts声明文件，直接查看即可使用。

如果您已经使用了npm包的方式，那么下面的说明可以忽略。

# 其他说明

## 声明文件

因为要引入`viewer-static.min.js`变量以后会增加一个window上的全局变量，以便于用来操控绘制好的图，所以写了一份申明文件`@xioo/xioo-docx-types`，目前还不全面，后面会慢慢补充。当然马上这个文件也将会推出`npm`包，如果还不着急的可以等一等。

### 安装

```shell
npm i -D @xioo/xioo-docx-types
```

### 配置

在tsconfig.json中配置

```json
{
  "typeRoots": ["@xioo/xioo-docx-types"]
}
```

