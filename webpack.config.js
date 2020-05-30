const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  watch: true,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    title: "React-Typescript-App",
    inject: true,
    template: 'src/index.html',
  })],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devtool : 'inline-source-map',
  module: {
    rules: [
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.tsx?$/, loader: "babel-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './dist/'),
    compress: true,
    port: 8080
  }
};