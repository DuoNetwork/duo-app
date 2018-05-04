const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

const timeStamp = new Date().getTime()

module.exports = {
    entry: {
        bundle: './js/index.tsx'
    },
    output: {
        filename: `assets/${timeStamp}/js/[name].js`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    watch: false,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx']
    }
    ,
    devServer: {
        host: '0.0.0.0',
        port: 3200,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        historyApiFallback: {
            rewrites: [
                {from: /^\/$/, to: '/dist/index.html'},
                {from: /./, to: '/dist/index.html'}
            ]
        },
        inline: true,
        watchOptions: {
            watch: true
        },
        disableHostCheck: true,
        compress: true
    },
    plugins: [
        new HTMLPlugin({
            title: 'D3-React-Test/TypeScript',
            template: path.resolve(__dirname, 'src/index.ejs')
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: path.resolve(__dirname, 'node_modules'),
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    stats: 'none'
}
