const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const postCSSPlugins = [
  require ('postcss-simple-vars'),
  require ('postcss-nested'),
  require ('autoprefixer')
]

module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", {loader: "postcss-loader", options: {plugins: postCSSPlugins}}]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    watch:true
};