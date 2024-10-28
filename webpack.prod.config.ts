import path from "path";
import webpack from "webpack";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  // Set the mode to development or production
  mode: "production",
  entry: {
    entry: path.resolve(__dirname, "src/app/appEntry.tsx"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
    assetModuleFilename: "[name][ext]", // это чтобы картинки сохраняли исходное название в dist
  },
  devtool: "source-map",

  // Spin up a server for quick development
  devServer: {
    compress: true,
    //historyApiFallback: true, TODO: test it
    hot: true,
    port: 8080,
    devMiddleware: {
      writeToDisk: true, // если мало оперативки
    },
    // proxy: [
    //   {
    //     context: ["/api"],
    //     target: process.env.REACT_APP_API_URL,
    //     changeOrigin: true,
    //   },
    //],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProgressPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      /* @svgr/webpack для импорта svg в React пример:
       * import Star from './star.svg' */
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      {
        test: /\.(png|svg|jpe?g|gif|wav|mp3|mp4)$/,
        type: "asset/resource",
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
};
export default config;
