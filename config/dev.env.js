'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    AjaxUrl: '"https://223.100.7.112:25013/fund-business/"'
})