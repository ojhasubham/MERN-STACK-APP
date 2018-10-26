# Webpack React
Tutorial: How to set up React, webpack 4, and Babel 7 (2018)
React is mostly used for Single Page Applications.

Yet it’s possible to integrate the library into any website with webpack and Babel.

![image](https://github.com/asifvora/webpack-react/blob/master/webpack4-react-babel.png)

## Getting Started

For help getting started with React, view online
[documentation](https://reactjs.org/).

#### 1. [Setup React](https://reactjs.org/docs/try-react.html)

#### 2. Clone the repo

```sh
$ https://github.com/asifvora/webpack-react.git
$ cd webpack-react/
```

#### 3. Install dependency

```sh
$ npm install
```

#### 4. Run the app

```sh
$ npm start
```
#### 5. Production build

```sh
$ npm run build
```

## webpack.config.js

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({ template: "./public/index.html", filename: "./index.html" });
const cssPlugin = new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[name].css' });
const cleanPlugin = new CleanWebpackPlugin(['dist']);
const generateSWPlugin = new WorkboxPlugin.GenerateSW({ clientsClaim: true, skipWaiting: true });
const uglifyPlugin = new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true });

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/, // /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader',
                    // 'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    optimization: {
        minimizer: [uglifyPlugin, new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [cleanPlugin, htmlPlugin, cssPlugin, generateSWPlugin],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    }
};
```