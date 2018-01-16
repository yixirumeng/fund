import axios from 'axios'

const ajaxUrl = 'http://223.100.7.112:25010/fund-business/fund/'

export function getData(url, method, data = null) {
    axios({
        url: `${ajaxUrl}${url}`,
        method,
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}