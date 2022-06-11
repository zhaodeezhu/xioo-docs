# xioo-docs

[![drawio node服务](https://img.shields.io/badge/xioo-draw--node-orange)](https://github.com/zhaodeezhu/drawio-node) [![am-editor](https://img.shields.io/badge/-am--aditor-blue)](https://github.com/red-axe/am-editor) [![xioo](https://img.shields.io/badge/-xioo-green)]() [![体验地址](https://img.shields.io/badge/%E4%BD%93%E9%AA%8C-xioo--doc-yellowgreen)](https://doc.xiooshow.com/)

## feat

- 已完成逆向流程，就是新建图以后的编辑，前提是需要先选中卡片再点击卡片上的编辑图标
- 新建绘图已经去除开始的时候选择本地源的弹窗，直接进入到模板选择页面
- 自定义了drawio的图工具栏
- 区分了readonly模式和edit模式不同的操作方式
- 可将绘制的图下载为png图片

## 概述

将[am-editor](https://github.com/red-axe/am-editor)和[drawio](https://github.com/jgraph/drawio)结合起来，来弥补am-editor没有流程图绘制功能的不足。

体验地址：

[xioo-docs](https://doc.xiooshow.com/)

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