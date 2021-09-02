const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require('mini-svg-data-uri');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  plugins: [new MiniCssExtractPlugin({
    filename: "styles.css"
  }), new HtmlWebpackPlugin({
    template: 'src/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }

}

