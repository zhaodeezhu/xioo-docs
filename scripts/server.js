const config = require('cover-webpack-package/lib/webpack.config.csr.dev');

const WebpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

const nodemon = require('nodemon');

const path = require('path');

const net = require('net');

const MemoryFileSystem = require('memory-fs');

let client = null;

const clientArr = [];

let server = net.Server((client) => {
  clientArr[0] = client
  client.on('end', () => {
    if(clientArr.length > 0) {
      clientArr.shift();
    }
  })
});

server.listen(2003, () => {console.log('server bound');});

let devServer = null;



const proxySend = () => {
  let timeout = null;
  // const execSend = () => {
  //   console.log(client)
  //   if(client) {
  //     console.log('我是存在的-----------------------》')
  //     client.write('hello\r\n');
  //     client.pipe(client);
  //     clearTimeout(timeout);
  //     return;
  //   }
  //   timeout = setTimeout(() => execSend(), 200);
  // } 
  // execSend();
  return () => {
    timeout = setInterval(() => {
      let client = clientArr[0];
      if(client) {
        client.write('hello\r\n');
        client.pipe(client);
        clearInterval(timeout);
      }
    }, 200);
  }
}


const projectRoot = process.cwd();
async function start() {
  nodemon({
    script: path.join(projectRoot, './app/server/master.ts'),
    "watch": [path.resolve(projectRoot, './app'), '../nodemon.json'],
    "restartable": "rs", 
    "ext": "ts tsx json",
    "verbose": true,
    "exec": "ts-node --files",
    "execMap": {
      "": "node",
      "js": "node --harmony"
    },
    "env": {
      "NODE_ENV": "development"
    },
    "ignore": [
      "package.json",
      "nodemon.json",
      "public/*",
      "node_modules/**/node_modules",
      ".git",
      "typings"
    ]
  }).on('start', () => {
    let compiler = webpack(config.webpackConfig);
    if(devServer) {
      return;
    }

    devServer = new WebpackDevServer(compiler, {
      hot: false,
      // publicPath: '/',
      // progressColors: true,
      // contentBase: __dirname,
      hotOnly: true,
      // inline: true,
      // port: 4006,
      open: true,
      openPage: ['page/user'],
      stats: 'errors-only',
      // stats: {
      //   chunks: false,  // 使构建过程更静默无输出
      //   colors: true
      // },
      proxy: {
        '/': {
          target: 'http://127.0.0.1:2001',
          secure: false,
          changeOrigin: true
        }
      },
    });

    devServer.listen(2002, '127.0.0.1', () => {
      console.log('Starting server on http://localhost:2002');
    });  
  }).on('restart', (files) => {
    console.log('重启')
    console.log('App restarted due to: ', files);
    // devServer.sockWrite(devServer.sockets, 'progress-update')
  
  }).on('quit', function () {
    console.log('App has quit');
    process.exit();
  });


  let webpackDevCompiler = webpack(config.webpackConfig);
  webpackDevCompiler.outputFileSystem = new MemoryFileSystem();
  webpackDevCompiler.watch({}, (err, stats) => {
    if (err) {
      throw err
    }
    stats = stats.toJson();
    proxySend()();
  })
}



start()