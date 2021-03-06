'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: 'index.html',
            inject: true,
            chunks: ['detail']
        }),
        new HtmlWebpackPlugin({
            filename: 'rate.html',
            template: 'index.html',
            inject: true,
            chunks: ['rate']
        }),
        new HtmlWebpackPlugin({
            filename: 'bonus.html',
            template: 'index.html',
            inject: true,
            chunks: ['bonus']
        }),
        new HtmlWebpackPlugin({
            filename: 'support.html',
            template: 'index.html',
            inject: true,
            chunks: ['support']
        }),
        new HtmlWebpackPlugin({
            filename: 'newsContent.html',
            template: 'index1.html',
            inject: true,
            chunks: ['newsContent']
        }),
        new HtmlWebpackPlugin({
            filename: 'newsList.html',
            template: 'index1.html',
            inject: true,
            chunks: ['newsList']
        }),
        new HtmlWebpackPlugin({
            filename: 'infoOpen.html',
            template: 'index.html',
            inject: true,
            chunks: ['infoOpen']
        }),
        new HtmlWebpackPlugin({
            filename: 'investorRights.html',
            template: 'index1.html',
            inject: true,
            chunks: ['investorRights']
        }),
        new HtmlWebpackPlugin({
            filename: 'investmentAccess.html',
            template: 'index1.html',
            inject: true,
            chunks: ['investmentAccess']
        }),
        new HtmlWebpackPlugin({
            filename: 'onlineTrade.html',
            template: 'index1.html',
            inject: true,
            chunks: ['onlineTrade']
        }),
        new HtmlWebpackPlugin({
            filename: 'riskExplain.html',
            template: 'index1.html',
            inject: true,
            chunks: ['riskExplain']
        }),
        new HtmlWebpackPlugin({
            filename: 'riskTest.html',
            template: 'index1.html',
            inject: true,
            chunks: ['riskTest']
        }),
        new HtmlWebpackPlugin({
            filename: 'riskTestResult.html',
            template: 'index1.html',
            inject: true,
            chunks: ['riskTestResult']
        }),
        new HtmlWebpackPlugin({
            filename: 'fundNetList.html',
            template: 'index1.html',
            inject: true,
            chunks: ['fundNetList']
        }),
        new HtmlWebpackPlugin({
            filename: 'fundNoticeList.html',
            template: 'index1.html',
            inject: true,
            chunks: ['fundNoticeList']
        }),
        new HtmlWebpackPlugin({
            filename: 'starFund.html',
            template: 'index1.html',
            inject: true,
            chunks: ['starFund']
        }),
        new HtmlWebpackPlugin({
            filename: 'registerExplain.html',
            template: 'index.html',
            inject: true,
            chunks: ['registerExplain']
        }),
        new HtmlWebpackPlugin({
            filename: 'beginner.html',
            template: 'index1.html',
            inject: true,
            chunks: ['beginner']
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: 'index1.html',
            inject: true,
            chunks: ['about']
        }),
        new HtmlWebpackPlugin({
            filename: 'tradeTips.html',
            template: 'index1.html',
            inject: true,
            chunks: ['tradeTips']
        }),
        new HtmlWebpackPlugin({
            filename: 'bankDebit.html',
            template: 'index1.html',
            inject: true,
            chunks: ['bankDebit']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})