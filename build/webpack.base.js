const webpack = require("webpack");
const path = require("path");
const tsImportPluginFactory = require("ts-import-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.join(__dirname, "../src");
var entries = {};
entries.polyfill = ["babel-polyfill", "whatwg-fetch"];
//entries.crypt = [path.resolve(rootPath, "assets/js/lib/base64.js")];
entries.app = [path.resolve(rootPath, "index.tsx")];
var webpackConfig = {
	entry: entries,
	resolve: {
		extensions: [".js", ".json", ".jsx", ".tsx", ".ts", ".less", ".css"],
		alias: {
			"@img": path.resolve(rootPath, "./assets/images"),
			"@js": path.resolve(rootPath, "./assets/js"),
			"@css": path.resolve(rootPath, "./assets/css"),
			"@c": path.resolve(rootPath, "./components"),
			"@m": path.resolve(rootPath, "./@mixin")
		}
	},
	externals: {
		React: "react",
		ReactDOM: "react-dom",
		Redux: "redux",
		ReactRouter: "react-router"
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: "underscore-template-loader"
				}
			},
			// {
			// 	test: /\.ts|tsx$/,
			// 	use: [
			// 		{
			// 			loader: "babel-loader"
			// 		},
			// 		{
			// 			loader: "ts-loader"
			// 		}
			// 	],
			// 	include: rootPath
			// },
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "babel-loader"
					},
					{
						loader: "ts-loader"
						// options: {
						// 	getCustomTransformers: () => ({
						// 		before: [
						// 			tsImportPluginFactory({
						// 				libraryName: "antd",
						// 				libraryDirectory: "es",
						// 				style: "css"
						// 			})
						// 		]
						// 	})
						// }
					}
				],
				include: rootPath
			},
			{
				//antd样式处理
				test: /\.css|less$/,
				include: /node_modules/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					},
					{
						loader: "postcss-loader"
					}
				]
			},

			{
				test: /\.css|less$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "less-loader"]
				})
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/img/[name].[hash:9].[ext]"
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/font/[name].[hash:9].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(rootPath, "../public/index.html"),
			minify: {
				collapseWhitespace: true //折叠空白区域 也就是压缩代码
			},
			// favicon: path.join(__dirname, "../public/favicon.ico"),
			hash: false
		}),
		new ExtractTextPlugin("assets/css/[name]_[chunkhash:9].css")
	]
};
module.exports = webpackConfig;
