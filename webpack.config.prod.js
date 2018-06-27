const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "production",
	entry: {
		app: path.resolve(__dirname, "src/ts/live/app.tsx"),
		status: path.resolve(__dirname, "src/ts/live/status.tsx"),
		user: path.resolve(__dirname, "src/ts/live/user.tsx"),
		admin: path.resolve(__dirname, "src/ts/live/admin.tsx"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].[chunkhash].js",
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production"),
			__DEV__: false,
			__KOVAN__: false
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }),
		new HtmlWebpackPlugin({
			excludeChunks: ['status', 'user', 'admin'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			excludeChunks: ['app', 'user', 'admin'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'status.html'
		}),
		new HtmlWebpackPlugin({
			excludeChunks: ['app', 'status', 'admin'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'user.html'
		}),
		new HtmlWebpackPlugin({
			excludeChunks: ['app', 'status', 'user'],
			title: "DUO",
			template: path.resolve(__dirname, "src/index.ejs"),
			favicon: path.join(__dirname, "src/images/favicon.ico"),
			filename: 'admin.html'
		})
	],
	optimization: {
		minimizer: [new UglifyJsPlugin({}), new OptimizeCssAssetsPlugin({})],
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
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
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
				test: /\.(xlsm|csv|ico|eot|otf|webp|ttf|woff|woff2|pdf)(\?.*)?$/,
				exclude: /node_modules/,
				use: "file-loader?name=[name].[ext]",
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
};
