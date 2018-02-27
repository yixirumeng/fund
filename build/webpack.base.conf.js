'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}



module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        detail: './src/detail/main.js',
        rate: './src/rate/main.js',
        bonus: './src/bonus/main.js',
        support: './src/support/main.js',
        newsContent: './src/newsContent/main.js',
        newsList: './src/newsList/main.js',
        infoOpen: './src/infoOpen/main.js',
        investorRights: './src/investorRights/main.js',
        investmentAccess: './src/investmentAccess/main.js',
        onlineTrade: './src/onlineTrade/main.js',
        riskExplain: './src/riskExplain/main.js',
        riskTest: './src/riskTest/main.js',
        riskTestResult: './src/riskTestResult/main.js',
        fundNetList: './src/fundNetList/main.js',
        fundNoticeList: './src/fundNoticeList/main.js',
        starFund: './src/starFund/main.js',
        registerExplain: './src/registerExplain/main.js',
        beginner: './src/beginner/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'styles': resolve('src/common/styles'),
            'images': resolve('src/common/images')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}