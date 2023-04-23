const config = require('cover-webpack-package/lib/webpack.config.csr.dev');

const WebpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

const path = require('path');

const projectRoot = process.cwd();

function start() {
  const webpackConfig = config.webpackConfig;
  let compiler = webpack(webpackConfig);

  compiler.run();
}

start()