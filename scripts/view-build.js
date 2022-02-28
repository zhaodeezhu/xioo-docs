// 引入配置文件
// const config = require('cover-webpack-package/lib/webpack.config.xioo.prod');
const config = require('./webpack.config.prod');
// 构建工具
const webpack = require('webpack');

(async function () {
  const webpackConfig = config;
  let compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(stats.toString());
  });
})();
