import axios from 'axios'

export function getData(url, method, data = null) {
    return axios({
        url: `${process.env.AjaxUrl}${url}`,
        method,
        params: data
    }).then((res) => {
        if (res.data.code === 0) {
            return Promise.resolve(res.data.content)
        }
    }).catch((error) => {
        if (error) {
            console.log(error)
        }
    })
}

/**
 * 安卓、IOS嵌入H5公共方法
 * type{
 *     case 0: 关闭当前页面
 *     case 1: 跳转同一服务器URL {'type':'11','body':'url','Remarks':'title','Reserve':'预留'}
 *     case 11: 跳转基金详情 {'type':'11','body':'innercode','Remarks':'基金名','Reserve':'预留'}
 *     case 12: 跳转基金信息 {'type':'12','body':'','Remarks':'基金信息','Reserve':'预留'}
 *     case 13: 跳转基金公司 {'type':'13','body':'','Remarks':'基金公司','Reserve':'预留'}
 *     case 21: 跳转到其他服务器文件类URL {'type':'21','body':'完整的url','Remarks':'基金名','Reserve':'预留'}
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