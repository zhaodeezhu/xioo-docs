const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const projectRoot = process.cwd();
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpack= require('webpack');
module.exports.webpackConfig = {
  entry: {
    main: ['./app/pages/index.tsx']
  },
  mode: 'development',
  devtool: 'source-map', // eval-cheap-module-source-map
  output: {
    path: path.resolve(projectRoot, './app/public'),
    filename: 'js/[name].js',
    publicPath: '/',
    clean: true,
    library: `qiankun-[name]`,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      // {
      //   test: /bootstrap\.tsx$/,
      //   loader: "bundle-loader",
      //   options: {
      //     lazy: true,
      //   },
      // },
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript()],
          }),
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            // modules: true
          }
        }]
      },
      // {
      //   test: /\.css$/,
      //   use: [miniCssExtractPlugin.loader, 'css-loader', {
      //     loader: 'postcss-loader',
      //     options: {
      //       plugins: () => [require('autoprefixer')],
      //       extract: false
      //     }
      //   }]
      // },
      // {
      //   test: /\.less$/,
      //   use: [miniCssExtractPlugin.loader, 'css-loader', {
      //     loader: "postcss-loader",
      //     options: {
      //       plugins: () => [require('autoprefixer')],
      //       extract: false
      //     }
      //   }, 'less-loader']
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader')
          },
          {
            loader: require.resolve('less-loader'), // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          },
          {
            loader: require.resolve('sass-resources-loader'),
            options: {
              resources: path.resolve(projectRoot, './app/pages/var.less')
            }
          }
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // }
    ]
  },
  plugins: [
    // new miniCssExtractPlugin({
    //   filename: "css/[name].css",////都提到build目录下的css目录中
    //   chunkFilename: "[id].css"
    // }),
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: './app/pages/index.html',
      chunks: ['main']
    }),
    // new ModuleFederationPlugin({
    //   filename: "qiankun.js",
    //   name: "qiankun",
    //   remotes: {
    //     // teamA: "http://localhost:8080/teamA",
    //     teamA: "teamA@http://localhost:5000/teamA.js",
    //   },
    //   shared: ['react', 'react-dom']
    //   // exposes: {
    //   // 	"test1": "./src/TestComponent" // 这个键名是拿到teamA.js后用o函数取的位置，因为远程调用是import(teamA/XXX)，切了路径所以是个路径
    //   // },
    // }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
      exclude: [/node_modules/],
    }),
    // new MonacoWebpackPlugin({
    //   languages: ['css', 'html', 'javascript', 'json', 'less', 'markdown', 'mysql', 'pgsql', 'scss', 'sql', 'typescript']
    // })
  ],
  stats: 'errors-only',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': path.join(projectRoot, './app/pages')
    },
  },
  devServer: {
    // hot: true,
    // historyApiFallback: true,
    // progressColors: true,
    // contentBase: './src/public',
    // hotOnly: true,
    port: 4006,
    open: true,
    proxy: {
      '\/?': {
        target: 'http://127.0.0.1:4007',
        secure: false,
        changeOrigin: true
      }
    }
  }
}