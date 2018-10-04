const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		app: path.resolve(__dirname, 'src/ts/live/app.tsx')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: false,
			__KOVAN__: false
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }),
		new HtmlWebpackPlugin({
			title: 'DUO | Beethoven',
			template: path.resolve(__dirname, 'src/index.ejs'),
			favicon: path.join(__dirname, 'src/images/favicon.ico'),
			filename: 'index.html'
		})
	],
	optimization: {
		minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})],
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.tsx?$/,
				include: path.join(__dirname, 'src'),
				use: 'tslint-loader'
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{ loader: 'less-loader', options: { javascriptEnabled: true } }
				]
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 20480
						}
					}
				]
			},
			{
				test: /\.(xlsm|csv|ico|eot|otf|webp|ttf|ttc|woff|woff2|pdf)(\?.*)?$/,
				exclude: /node_modules/,
				use: 'file-loader?name=[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	}
};
