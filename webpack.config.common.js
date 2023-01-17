const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        options: {
          esModule: true,
        },
        type: 'javascript/auto',
      },
    ],
  },

  target: 'node',
  mode: env,
  node: {
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
    // global: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        './node_modules/swagger-ui-dist/swagger-ui.css',

        './node_modules/swagger-ui-dist/swagger-ui-bundle.js',

        './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',

        './node_modules/swagger-ui-dist/favicon-16x16.png',

        './node_modules/swagger-ui-dist/favicon-32x32.png',
      ],
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  // externals: [nodeExternals()],
  externals: [
    'snappy',
    'pg-native',
    'nock',
    'aws-sdk',
    'mock-aws-s3',
    // '@mongodb-js/zstd',
    'kerberos',
    'bson-ext',
  ],
});
