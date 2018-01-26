import axios from 'axios'
// import jsonp from 'jsonp'

const ajaxUrl = 'http://223.100.7.112:25010/fund-business/'

const ajaxUrl1 = 'http://192.168.4.112:8080/'

export function getData(url, method, data = null) {
    return axios({
        url: `${ajaxUrl1}${url}`,
        method,
        params: data
    }).then((res) => {
        if (res.data.code === 0) {
            return Promise.resolve(res.data.content)
        }
    })
}

export function getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}