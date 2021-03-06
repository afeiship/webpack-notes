# webpack4_css_entry
> Css entry for webpack4.


## package:
```json
"html-webpack-exclude-assets-plugin": "0.0.7",
"html-webpack-plugin": "^3.2.0"
```

## webpack config:
```js
import path, { resolve } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';

const extractAntd = new ExtractTextPlugin('antd/[name]-[hash].css');
const extractCss = new ExtractTextPlugin('styles/[name]-[hash].css');

export default (env) => {

  return {
    mode: 'production',
    entry: {
      'app': './src/index.js',
      'antd': 'antd/dist/antd.less'
    },
    output: {
      filename: '[name]-[hash:6].bundle.js',
      path: resolve(__dirname, '../dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: extractCss.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.less$/,
          use: extractAntd.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              'less-loader?javascriptEnabled=true'
            ]
          })
        },
      ]
    },
    plugins: [
      extractAntd,
      extractCss,
      new HtmlWebpackPlugin({
        template: resolve(__dirname, `../src/index.ejs`),
        excludeAssets: [/antd-.*\.js/]
      }),
      new HtmlWebpackExcludeAssetsPlugin()
    ]
  };

};
```


## antd-not babel-import:
```json
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "transform-decorators-legacy"
  ]
}
```
```conf
444K	antd
4.0K	antd-565cb6.bundle.js
1.3M	app-565cb6.bundle.js
4.0K	index.html
```


## antd-has babel-import:
```json
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "transform-decorators-legacy",
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": true
      }
    ]
  ]
}
```

### size:
```conf
520K	antd
4.0K	antd-aa6ad1.bundle.js
132K	app-aa6ad1.bundle.js
4.0K	index.html
```
