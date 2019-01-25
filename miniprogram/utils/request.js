const API_URL = 'http://application.test:5000'

const get = (urlShard) => {
    let request = new Promise((resolve, reject) => {
        wx.request({
            method: 'GET',
            url: API_URL + urlShard,
            success: res => {
                resolve(res.data)
            },
            fail: err => {
                reject(err.errMsg)
            }
        })
    })

    return request
}

const post = (urlShard, data) => {
    let request = new Promise((resolve, reject) => {
        wx.request({
            method: 'POST',
            url: API_URL + urlShard,
            data: data,
            success: res => {
                resolve(res.data)
            },
            fail: err => {
                reject(err.errMsg)
            }
        })
    })
    
    return request
}

module.exports = {
    get: get,
    post: post
}