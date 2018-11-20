const webpack = require("webpack");
const config = require("../config");
const path = require("path");
const os = require("os");
function getIPAdress() {
	var interfaces = os.networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (
				alias.family === "IPv4" &&
				alias.address !== "127.0.0.1" &&
				!alias.internal
			) {
				return alias.address;
			}
		}
	}
}

var webpackDevConfig = {
	mode: "development",
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		historyApiFallback: false,
		host: getIPAdress(),
		port: 8002,
		open: true,
		inline: true,
		hot: true
	},
	output: {
		path: config.outputRoot,
		filename: "assets/js/[name].js",
		chunkFilename: "assets/js/[name].js",
		sourceMapFilename: "[file].map"
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = webpackDevConfig;
