const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		demo: path.resolve(__dirname, "src/ts/demo/app.tsx"),
		app: path.resolve(__dirname, "src/ts/live/app.tsx"),
		status: path.resolve(__dirname, "src/ts/live/status.tsx"),
		user: path.resolve(__dirname, "src/ts/live/user.tsx"),
		admin: path.resolve(__dirname, "src/ts/live/admin.tsx"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
	devServer: {
		https: true,
		contentBase: "./dist",
		hot: true,
		historyApiFallback: true,
		host: "0.0.0.0",
		disableHostCheck: true,
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
		new webpack.SourceMapDevToolPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development"),
			__DEV__: true,
			__KOVAN__: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			excludeChunks: ['app', 'status', 'user', 'admin'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'demo.html'
		}),
		new HtmlWebpackPlugin({
			excludeChunks: ['demo', 'status', 'user', 'admin'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			excludeChunks: ['demo', 'app', 'user', 'admin'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'status.html'
		}),
		new HtmlWebpackPlugin({
			excludeChunks: ['demo', 'app', 'status', 'admin'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'user.html'
		}),
		new HtmlWebpackPlugin({
			excludeChunks: ['demo', 'app', 'status', 'user'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'admin.html'
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.tsx?$/,
				include: path.join(__dirname, "src"),
				use: "tslint-loader",
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					{ loader: "less-loader", options: { javascriptEnabled: true } },
				],
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 20480,
						},
					},
				],
			},
			{
				test: /\.(xlsm|csv|ico|eot|otf|webp|ttf|ttc|woff|woff2|pdf)(\?.*)?$/,
				exclude: /node_modules/,
				use: "file-loader?name=[name].[ext]",
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
};
