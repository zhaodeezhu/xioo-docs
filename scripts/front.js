const config = require('./webpack.config');

const WebpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

function start() {
  const webpackConfig = config.webpackConfig;
  let compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3002',
        secure: false,
        changeOrigin: true,
        // historyApiFallback: true
      },
    },
  });

  server.listen(3001, '0.0.0.0', () => {
    console.log('Starting server on http://localhost:2009');
  });
}

start();