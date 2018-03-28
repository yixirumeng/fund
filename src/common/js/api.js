import axios from 'axios'
import loading from '../images/loading.gif'

export function getData(url, method, data = null, token = '') {
    let ajaxUrl
    if (process.env.NODE_ENV === 'development') {
        ajaxUrl = 'https://223.100.7.112:25013/fund-business/'
    } else {
        if (process.env.type === 'pdt') {
            ajaxUrl = 'https://www.jinjiwo.com.cn/fund-business/'
        } else {
            ajaxUrl = 'https://223.100.7.112:25013/fund-business/'
        }
    }
    return axios({
        url: `${ajaxUrl}${url}`,
        method,
        params: data,
        headers: {
            'AccessToken': token
        }
    }).then((res) => {
        if (res.data.code === 0) {
            return Promise.resolve(res.data.content)
        } else if (res.data.code === 1003) {
            return Promise.resolve(res.data)
        }
    }).catch((error) => {
        if (error) {
            console.log(error)
        }
    })
}

function showLoading() {
    let bodyNode = document.querySelector('body')
    let imgNode = document.createElement('img')
    imgNode.setAttribute('src', loading)
    imgNode.className = "loading"
    bodyNode.appendChild(imgNode)
}

function hideLoading() {
    let bodyNode = document.querySelector('body')
    let loading = document.querySelector('.loading')
    bodyNode.removeChild(loading)
}

/**
 * 安卓、IOS嵌入H5公共方法
 * type{
 *     case 0: 关闭当前页面
 *     case 1: 跳转同一服务器URL {'type':'1','body':'url','Remarks':'title','Reserve':'预留'}
 *     case 11: 跳转基金详情 {'type':'11','body':'innerCode:fundCode','Remarks':'基金名','Reserve':'货币类型，0为非货币型，1为货币型'}
 *     case 12: 跳转基金信息 {'type':'12','body':'innerCode','Remarks':'基金信息','Reserve':'预留'}
 *     case 13: 跳转基金公司 {'type':'13','body':'innerCode','Remarks':'基金公司','Reserve':'预留'}
 *     case 14: 跳转基金经理 {'type':'14','body':'personalCode','Remarks':'基金经理','Reserve':'预留'}
 *     case 15: 跳转我的页面（未登录跳转注册页面） {'type':'15','body':'','Remarks':'跳转我的或注册页面','Reserve':'预留'}
 *     case 21: 跳转到其他服务器文件类URL {'type':'21','body':'完整的url','Remarks':'基金名','Reserve':'预留'}
 *     case 31: token失效 {'type':'31','body':'token失效返回的message的值','Remarks':'','Reserve':''}
 *     ...
 * body: {'type':'1','body':'','Remarks':'备注','Reserve':'预留'}
 */
export function callAppType(type, body, remarks, reserve = '') {
    let paramIOS = { 'type': type, 'body': body, 'remarks': remarks, 'reserve': reserve }
    let paramAndroid = JSON.stringify(paramIOS)
    console.log(paramAndroid)
    try {
        callAndroid.postMessageAndroid(paramAndroid)
    } catch (error) {
        window.webkit.messageHandlers.callApp.postMessage(paramIOS)
    }
}

// 定义H5页面存放路径
export const depositPath = ''

// 获取url参数方法
export function getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // return unescape(r[2]);
        return r[2]
    }
    return null;
}

// 更改跳转的新url方法
export function getNewUrl(newPath) {
    let currentUrl = window.location.origin + window.location.pathname
    let urlArr = currentUrl.split('/')
    urlArr.pop(urlArr.length - 1)
    urlArr.push(newPath)
    let newUrl = urlArr.join('/')
    return newUrl
}

// export function getData(url, method, data = null) {
//     return (
//         $.ajax({
//             url: `${ajaxUrl3}${url}`,
//             method,
//             data,
//             dataType: 'json',
//             success: function(result) {
//                 if (result.code === 0) {
//                     return Promise.resolve(result.content)
//                 }
//             }
//         })
//     )
// }