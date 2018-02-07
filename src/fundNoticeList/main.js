// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/common/styles/index.scss'
import 'lib-flexible'
import fastclick from 'fastclick'

fastclick.attach(document.body)
Vue.config.productionTip = false

require('es6-promise').polyfill()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})