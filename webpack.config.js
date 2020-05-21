const MODE = "development";
const enabledSourceMap = MODE === "development";
const path = require('path');
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
const  internalIp = require('internal-ip')
let
  localhost = internalIp.v4.sync(),
  localhostPort = 8080;


module.exports = {

  devServer: {
    // contentBase: "dist",
    host: localhost,
    port: localhostPort,
    disableHostCheck: true,
    open: true,
    contentBase: path.resolve(__dirname, "./public"),
    watchContentBase: true,
    inline: true,
    hot: true,

    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /(?:node_modules|\.css$)/,
    },

    historyApiFallback: true,
    compress: true,
  },
  mode: MODE,
  entry:
  {
    script:[
    './src/js/index.js',
    './src/scss/style.scss'
  ]
  },
  output:{
    path: path.resolve(__dirname, './public/'),
    filename:"js/main.js"
  },
  module: {
    rules: [
      
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: enabledSourceMap,
              importLoaders:2
            }
          },
          // PostCSSのための設定
          {
            loader: "postcss-loader",
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: true,
              plugins: [
                // Autoprefixerを有効化
                // ベンダープレフィックスを自動付与する
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
    filename: "scss/style.css"
    })
  ],
};