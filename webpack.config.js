const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    watchFiles: ['src/*.html', 'src/*.js'],
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'O4B Tech Task',
      template: './src/index.html',
    }),
  ],
};
