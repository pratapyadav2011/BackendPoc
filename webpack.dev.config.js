const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  merge(commonConfig("development"), {
    entry: {
      server: ["./app.js"],
    },
    plugins: [
      // Copies files from target to destination folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./firebase.json",
            to: "./firebase.json",
          },
        ],
      }),
    ],
    // devtool: "inline-source-map",
    externals: ["mongodb-client-encryption", "aws4"],
  }),
];
