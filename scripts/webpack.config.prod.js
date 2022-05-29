const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const projectRoot = process.cwd();
module.exports = {
  entry: {
    main: ['./app/pages/index.tsx']
  },
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(projectRoot, './package/public'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/',
    clean: true,
    library: `qiankun-[name]`,
    libraryTarget: 'umd',
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  module: {
    rules: [
      // {
      //   test: /bootstrap\.tsx$/,
      //   use: [
      //     {
      //       loader: "bundle-loader",
      //       options: {
      //         lazy: true,
      //       },
      //     }
      //   ]
      // },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              // workers: 3
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
              happyPackMode: true
            },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            // minimize: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')],
            extract: false
          }
        }]
      },
      {
        test: /\.less$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // minimize: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require('autoprefixer')],
              extract: false
            }
          },
          {
            loader: 'less-loader',
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
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '/image',
              publicPath: '/image'
            }
          }
        ]
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'EUS',
      scriptLoading: 'defer',
      inject: true,
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true,// 压缩内联css
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyURLs: true,
      },
      filename: 'index.html',
      template: './app/pages/index.html',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProgressPlugin(),
    // new WebpackBundleAnalyzer(),
    new miniCssExtractPlugin({
      filename: "css/[name][contenthash].css",////都提到build目录下的css目录中
      chunkFilename: "css/[name][contenthash].css"
    })
  ],
  optimization: {
    minimize: true,
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    emitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        exclude: /node_modules/,
        // cache: true,
        extractComments: true,
        terserOptions: {
          compress: {
          }
        }
      }),
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': path.join(projectRoot, './app/pages')
    },
  },
}