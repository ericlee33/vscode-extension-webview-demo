'use strict';

const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const merge = require('webpack-merge').default;
const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'express-handlebars': 'handlebars/dist/handlebars.js',
    },
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};

/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const configForWebview = merge(commonConfig, {
  mode: 'development',
  entry: {
    sidebar: path.resolve(__dirname, './src/Webview/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 1024,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/index.html',
          to: 'index.html',
          toType: 'file',
        },
      ],
    }),
  ],
});

/** @type WebpackConfig */
const extensionConfig = merge(commonConfig, {
  ...commonConfig,
  target: 'node',
  mode: 'none',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'nosources-source-map',
});

module.exports = [extensionConfig, configForWebview];
