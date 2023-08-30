const webpack = require('webpack');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: 'development',
  // Путь для собранных файлов
  output: {
    filename: 'main.[contenthash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  // Конфигурация для Loader CSS
  module: {
    rules: [
      // Правило для обработки css|scss файлов
      { 
        test: /\.(css|scss)$/, 
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ], 
      }, 
    ]
  },
  plugins: [
    // Плагин для предоставленния отчетов о ходе выполнения и компиляции
    new webpack.ProgressPlugin(),
    // Плагин который будет удалять старые скомпилированные файлы в каталоге dist
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
   
    
  ],
  // Конфигурация DevServer
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: 9000,
  },
};