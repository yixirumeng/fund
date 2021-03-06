'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},

        // Various Dev Server settings
        host: '192.168.4.127', // can be overwritten by process.env.HOST
        port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        detail: path.resolve(__dirname, '../dist/detail.html'),
        rate: path.resolve(__dirname, '../dist/rate.html'),
        bonus: path.resolve(__dirname, '../dist/bonus.html'),
        support: path.resolve(__dirname, '../dist/support.html'),
        newsContent: path.resolve(__dirname, '../dist/newsContent.html'),
        newsList: path.resolve(__dirname, '../dist/newsList.html'),
        infoOpen: path.resolve(__dirname, '../dist/infoOpen.html'),
        investorRights: path.resolve(__dirname, '../dist/investorRights.html'),
        investmentAccess: path.resolve(__dirname, '../dist/investmentAccess.html'),
        onlineTrade: path.resolve(__dirname, '../dist/onlineTrade.html'),
        riskExplain: path.resolve(__dirname, '../dist/riskExplain.html'),
        riskTest: path.resolve(__dirname, '../dist/riskTest.html'),
        riskTestResult: path.resolve(__dirname, '../dist/riskTestResult.html'),
        fundNetList: path.resolve(__dirname, '../dist/fundNetList.html'),
        fundNoticeList: path.resolve(__dirname, '../dist/fundNoticeList.html'),
        starFund: path.resolve(__dirname, '../dist/starFund.html'),
        registerExplain: path.resolve(__dirname, '../dist/registerExplain.html'),
        beginner: path.resolve(__dirname, '../dist/beginner.html'),
        about: path.resolve(__dirname, '../dist/about.html'),
        tradeTips: path.resolve(__dirname, '../dist/tradeTips.html'),
        bankDebit: path.resolve(__dirname, '../dist/bankDebit.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}