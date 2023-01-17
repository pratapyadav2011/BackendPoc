const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = [
  merge(commonConfig("development"), {
    entry: {
      server: ["./app.js"],
    },
    // devtool: "inline-source-map",
  }),
];
