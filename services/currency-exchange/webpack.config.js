const path = require("path");

const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  target: "node16",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  resolve: {
    extensions: [".js", ".ts", ".json"],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      graphql$: path.resolve(__dirname, "../../node_modules/graphql/index.js"),
    },
  },
  devtool: "inline-source-map",
  externalsType: "module",
  output: {
    libraryTarget: "module",
    filename: "index.mjs",
    path: path.resolve(__dirname, "build/src"),
    clean: true,
  },
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  externals: {
    ...nodeExternals({
      modulesDir: path.resolve(__dirname, "./"),
    }),
    argon2: "argon2",
  },
  optimization: {
    minimize: false,
  },
};
